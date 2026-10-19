import { describe, expect, it } from 'vitest';
import {
    PuzzleDiversityTracker,
    boardFromCells,
    deserializeCollectionEnvelope,
    evaluateDifficulty,
    generatePuzzleCollection,
    matchesRequiredMechanisms,
    validateGenerationConfig,
    validateRequiredMechanisms,
} from '../../index';

describe('reasoning mechanism targets', () => {
    it('maps exact metrics to every supported mechanism', () => {
        const difficulty = {
            metrics: {
                minimumClearedLineCount: 1,
                initiallyBlockedShapeCount: 1,
                viableShapeOrderCount: 1,
                distinctShapeOrderCount: 6,
                delayedLosingFirstMoveCount: 2,
                misleadingHeuristicBestMoveCount: 1,
            },
        };
        expect(matchesRequiredMechanisms(difficulty, [
            'clear-required',
            'initially-blocked',
            'order-restricted',
            'delayed-failure',
            'misleading-best-move',
        ])).toBe(true);
        expect(matchesRequiredMechanisms({
            metrics: { ...difficulty.metrics, minimumClearedLineCount: 0 },
        }, ['clear-required'])).toBe(false);
    });

    it('rejects unsupported and duplicate targets and canonicalizes order', () => {
        expect(validateRequiredMechanisms(['misleading-best-move', 'clear-required']))
            .toEqual(['clear-required', 'misleading-best-move']);
        expect(() => validateRequiredMechanisms(['unknown'])).toThrow(/Unsupported/);
        expect(() => validateRequiredMechanisms(['clear-required', 'clear-required']))
            .toThrow(/Duplicate/);
    });
});

describe('multi-tray targeted generation', () => {
    const CONFIG = {
        count: 2,
        seed: 707,
        simulationBatches: 3,
        maxCandidateAttempts: 30,
        traySearchWidth: 4,
    };

    it('evaluates a fixed-width pool and records deterministic selection provenance', () => {
        const first = generatePuzzleCollection(CONFIG);
        const second = generatePuzzleCollection(CONFIG);
        expect(first).toEqual(second);
        expect(first.statistics.trayEvaluations).toBe(
            (first.statistics.candidateAttempts - first.statistics.simulationFailures) * 4,
        );
        expect(first.statistics.solvableTrayEvaluations)
            .toBeLessThanOrEqual(first.statistics.trayEvaluations);
        first.puzzles.forEach(record => {
            expect(record.provenance.traySearchWidth).toBe(4);
            expect(record.provenance.selectedTrayDraw).toBeGreaterThanOrEqual(0);
            expect(record.provenance.selectedTrayDraw).toBeLessThan(4);
        });
    });

    it('keeps width one as the default and validates advanced configuration', () => {
        expect(validateGenerationConfig({}).traySearchWidth).toBe(1);
        expect(() => validateGenerationConfig({ traySearchWidth: 0 })).toThrow(/positive/);
        expect(() => validateGenerationConfig({ requiredMechanisms: ['invalid'] }))
            .toThrow(/Unsupported/);
    });

    it('prefers novelty before score and then the earlier draw', () => {
        const trays = [
            Object.freeze(['SINGLE', 'SINGLE', 'SINGLE']),
            Object.freeze(['LINE_2_HORIZONTAL', 'LINE_2_HORIZONTAL', 'LINE_2_HORIZONTAL']),
        ];
        let trayIndex = 0;
        let selectedPuzzle;
        const diversity = {
            classify: () => null,
            nearestDistance: puzzle => puzzle.shapes[0] === 'SINGLE' ? 1 : 5,
            add: puzzle => { selectedPuzzle = puzzle; },
        };
        generatePuzzleCollection({
            ...CONFIG,
            count: 1,
            simulationBatches: 1,
            traySearchWidth: 2,
        }, {
            sampleTray: () => trays[trayIndex++],
            diversityTracker: diversity,
        });
        expect(selectedPuzzle.shapes[0]).toBe('LINE_2_HORIZONTAL');
    });

    it('uses the earlier draw when novelty and score rank are tied', () => {
        const collection = generatePuzzleCollection({
            ...CONFIG,
            count: 1,
            simulationBatches: 1,
            traySearchWidth: 2,
        }, {
            sampleTray: () => Object.freeze(['SINGLE', 'SINGLE', 'SINGLE']),
            diversityTracker: {
                classify: () => null,
                nearestDistance: () => Infinity,
                add: () => {},
            },
        });
        expect(collection.puzzles[0].provenance.selectedTrayDraw).toBe(0);
    });

    it('rejects tampered advanced provenance and workload statistics', () => {
        const collection = JSON.parse(JSON.stringify(generatePuzzleCollection({
            ...CONFIG, count: 1,
        })));
        collection.puzzles[0].provenance.selectedTrayDraw = 9;
        expect(() => deserializeCollectionEnvelope(collection)).toThrow(/within tray search width/);

        const workload = JSON.parse(JSON.stringify(generatePuzzleCollection({
            ...CONFIG, count: 1,
        })));
        workload.statistics.trayEvaluations--;
        expect(() => deserializeCollectionEnvelope(workload)).toThrow(/workload/);
    });

    it('counts a board-level mechanism rejection after solvable tray analysis', () => {
        expect.assertions(3);
        try {
            generatePuzzleCollection({
                ...CONFIG,
                count: 1,
                maxCandidateAttempts: 2,
                traySearchWidth: 3,
                requiredMechanisms: ['clear-required'],
            }, {
                sampleTray: () => Object.freeze(['SINGLE', 'SINGLE', 'SINGLE']),
                evaluateDifficulty: puzzle => {
                    const actual = evaluateDifficulty(puzzle);
                    return {
                        ...actual,
                        metrics: { ...actual.metrics, minimumClearedLineCount: 0 },
                    };
                },
            });
        } catch (error) {
            expect(error.statistics.mechanismRejections).toBe(2);
            expect(error.statistics.trayEvaluations).toBe(6);
            expect(error.statistics.solvableTrayEvaluations).toBe(6);
        }
    });
});

describe('novelty distance', () => {
    it('is infinite for an empty compatible bucket and exact after adding', () => {
        const puzzle = {
            board: boardFromCells([[0, 0], [2, 3]]),
            shapes: ['SINGLE', 'SQUARE_2', 'LINE_3_HORIZONTAL'],
        };
        const tracker = new PuzzleDiversityTracker();
        expect(tracker.nearestDistance(puzzle)).toBe(Infinity);
        tracker.add(puzzle);
        expect(tracker.nearestDistance(puzzle)).toBe(0);
    });
});
