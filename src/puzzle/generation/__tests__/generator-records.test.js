import { describe, expect, it } from 'vitest';
import { findOneSolution } from '../../solver';
import { bitCount } from '../../deduplication';
import {
    GenerationExhaustedError,
    SimulationExhaustedError,
    boardFromHex,
    boardToHex,
    deserializeCollectionEnvelope,
    deserializePuzzleRecord,
    generatePuzzleCollection,
    simulateGameplayBoard,
} from '../index';

const CONFIG = {
    count: 2,
    seed: 2026,
    simulationBatches: 3,
    maxBatchAttempts: 40,
    maxCandidateAttempts: 50,
};

function captureExhaustion(config, dependencies) {
    try {
        generatePuzzleCollection(config, dependencies);
    } catch (error) {
        expect(error).toBeInstanceOf(GenerationExhaustedError);
        return error;
    }
    throw new Error('Expected generation to exhaust');
}

describe('baseline collection generation', () => {
    it('returns the requested solver-replayable deterministic collection', () => {
        const first = generatePuzzleCollection(CONFIG);
        const second = generatePuzzleCollection(CONFIG);
        expect(first).toEqual(second);
        expect(JSON.stringify(first)).toBe(JSON.stringify(second));
        expect(first.puzzles).toHaveLength(2);
        expect(first.statistics.acceptedCount).toBe(2);
        expect(first.statistics.candidateAttempts).toBe(
            first.statistics.acceptedCount
            + first.statistics.unsolvableRejections
            + first.statistics.simulationFailures
            + first.statistics.qualityRejections
            + first.statistics.difficultyRejections
            + first.statistics.exactDuplicateRejections
            + first.statistics.nearDuplicateRejections
            + first.statistics.mechanismRejections,
        );
        first.puzzles.forEach(record => {
            const restored = deserializePuzzleRecord(record);
            expect(restored.witness).toHaveLength(3);
            expect(findOneSolution(restored.puzzle).solvable).toBe(true);
        });
    });

    it('includes board-and-tray identity in ids to avoid cross-pack collisions', () => {
        const first = generatePuzzleCollection({ ...CONFIG, count: 1 });
        const changed = generatePuzzleCollection({
            ...CONFIG,
            count: 1,
            simulationBatches: CONFIG.simulationBatches + 1,
        });
        if (first.puzzles[0].board !== changed.puzzles[0].board
            || first.puzzles[0].shapes.join(',') !== changed.puzzles[0].shapes.join(',')) {
            expect(first.puzzles[0].id).not.toBe(changed.puzzles[0].id);
        }
        expect(first.puzzles[0].id).toMatch(/^puz-[0-9a-f]{8}-[0-9a-f]{8}-[0-9]{6}$/);
    });

    it('counts forced unsolvable and simulation-failure candidates', () => {
        let solveCalls = 0;
        let simulationCalls = 0;
        const collection = generatePuzzleCollection({ ...CONFIG, count: 1 }, {
            sampleTray: () => Object.freeze(['SINGLE', 'SINGLE', 'SINGLE']),
            simulateBoard: config => {
                simulationCalls++;
                if (simulationCalls === 1) throw new SimulationExhaustedError(0, 0n);
                return simulateGameplayBoard(config);
            },
            solve: puzzle => {
                solveCalls++;
                if (solveCalls === 1) return { solvable: false, witness: null };
                return findOneSolution(puzzle);
            },
        });
        expect(collection.statistics).toMatchObject({
            acceptedCount: 1,
            candidateAttempts: 3,
            unsolvableRejections: 1,
            simulationFailures: 1,
        });
        expect(collection.puzzles[0].id).toMatch(/-000003$/);
    });

    it('throws final statistics when the candidate bound is exhausted', () => {
        expect.assertions(2);
        try {
            generatePuzzleCollection({ ...CONFIG, count: 1, maxCandidateAttempts: 3 }, {
                solve: () => ({ solvable: false, witness: null }),
            });
        } catch (error) {
            expect(error).toBeInstanceOf(GenerationExhaustedError);
            expect(error.statistics).toEqual({
                requestedCount: 1,
                acceptedCount: 0,
                candidateAttempts: 3,
                unsolvableRejections: 3,
                simulationFailures: 0,
                qualityRejections: 0,
                difficultyRejections: 0,
                exactDuplicateRejections: 0,
                nearDuplicateRejections: 0,
                mechanismRejections: 0,
                trayEvaluations: 3,
                solvableTrayEvaluations: 0,
            });
        }
    });

    it('categorizes quality and difficulty filtering before diversity', () => {
        const base = { ...CONFIG, count: 1, maxCandidateAttempts: 1 };
        const singles = () => Object.freeze(['SINGLE', 'SINGLE', 'SINGLE']);
        const qualityError = captureExhaustion(
            { ...base, minOccupiedCells: 63 },
            { sampleTray: singles },
        );
        expect(qualityError.statistics.qualityRejections).toBe(1);
        const difficultyError = captureExhaustion(
            { ...base, difficultyTarget: 'hard' },
            {
                sampleTray: singles,
                evaluateDifficulty: () => ({
                    modelVersion: 'casual-v1', score: 0, tier: 'easy', reasons: [],
                    metrics: { legalFirstMoveCount: 1 },
                }),
            },
        );
        expect(difficultyError.statistics.difficultyRejections).toBe(1);
    });

    it('validates filter targets and inclusive bound ordering', () => {
        expect(() => generatePuzzleCollection({ ...CONFIG, difficultyTarget: 'expert' }))
            .toThrow(/must be one of/);
        expect(() => generatePuzzleCollection({
            ...CONFIG, minOccupiedCells: 20, maxOccupiedCells: 19,
        })).toThrow(/cannot exceed/);
        expect(() => generatePuzzleCollection({
            ...CONFIG, minLegalFirstMoves: 5, maxLegalFirstMoves: 4,
        })).toThrow(/cannot exceed/);
    });

    it('accepts candidates exactly on inclusive quality boundaries', () => {
        const base = generatePuzzleCollection({ ...CONFIG, count: 1 });
        const record = base.puzzles[0];
        const occupiedCells = bitCount(boardFromHex(record.board));
        const legalMoves = record.difficulty.metrics.legalFirstMoveCount;
        const bounded = generatePuzzleCollection({
            ...CONFIG,
            count: 1,
            minOccupiedCells: occupiedCells,
            maxOccupiedCells: occupiedCells,
            minLegalFirstMoves: legalMoves,
            maxLegalFirstMoves: legalMoves,
        });
        expect(bounded.puzzles[0].id).toBe(record.id);
        expect(bounded.statistics.qualityRejections).toBe(0);
    });

    it('categorizes exact and near duplicate outcomes', () => {
        const classifySequence = types => ({
            classify: () => types.shift() || null,
            add: () => {},
        });
        const base = { ...CONFIG, count: 1, maxCandidateAttempts: 1 };
        for (const [type, field] of [
            ['exact', 'exactDuplicateRejections'],
            ['near', 'nearDuplicateRejections'],
        ]) {
            const error = captureExhaustion(base, {
                    sampleTray: () => Object.freeze(['SINGLE', 'SINGLE', 'SINGLE']),
                    diversityTracker: classifySequence([type]),
                });
            expect(error.statistics[field]).toBe(1);
        }
    });
});

describe('versioned JSON-safe records', () => {
    it('converts only exact fixed-width lowercase hexadecimal values', () => {
        expect(boardToHex(0x1234n)).toBe('0000000000001234');
        expect(boardFromHex('0000000000001234')).toBe(0x1234n);
        expect(() => boardFromHex('1234')).toThrow(/16 lowercase/);
        expect(() => boardFromHex('000000000000ABCD')).toThrow(/16 lowercase/);
    });

    it('round-trips through standard JSON and validates its envelope', () => {
        const collection = generatePuzzleCollection({ ...CONFIG, count: 1 });
        const parsed = JSON.parse(JSON.stringify(collection));
        const restored = deserializeCollectionEnvelope(parsed);
        expect(restored.puzzles).toHaveLength(1);
        expect(restored.puzzles[0].puzzle.board).toBe(BigInt(`0x${parsed.puzzles[0].board}`));
        expect(parsed).not.toHaveProperty('duration');
    });

    it('rejects unsupported versions and witness tampering', () => {
        const record = JSON.parse(JSON.stringify(
            generatePuzzleCollection({ ...CONFIG, count: 1 }).puzzles[0],
        ));
        expect(() => deserializePuzzleRecord({ ...record, formatVersion: 99 }))
            .toThrow(/Unsupported puzzle record format/);
        record.solution[0].boardAfter = '0000000000000000';
        expect(() => deserializePuzzleRecord(record)).toThrow(/does not match/);
    });

    it('rejects tampered gameplay provenance and inconsistent envelopes', () => {
        const collection = JSON.parse(JSON.stringify(
            generatePuzzleCollection({ ...CONFIG, count: 1 }),
        ));
        collection.puzzles[0].provenance.simulationHistory[0].row = 7;
        expect(() => deserializePuzzleRecord(collection.puzzles[0])).toThrow();

        const clean = JSON.parse(JSON.stringify(generatePuzzleCollection({ ...CONFIG, count: 1 })));
        clean.statistics.acceptedCount = 2;
        expect(() => deserializeCollectionEnvelope(clean)).toThrow(/inconsistent/);
    });

    it('validates difficulty metadata and still reads legacy format-1 records', () => {
        const record = JSON.parse(JSON.stringify(
            generatePuzzleCollection({ ...CONFIG, count: 1 }).puzzles[0],
        ));
        record.difficulty.score++;
        expect(() => deserializePuzzleRecord(record)).toThrow(/Difficulty metadata/);

        const legacy = JSON.parse(JSON.stringify(
            generatePuzzleCollection({ ...CONFIG, count: 1 }).puzzles[0],
        ));
        delete legacy.difficulty;
        expect(deserializePuzzleRecord(legacy).difficulty).toBe(null);
    });
});
