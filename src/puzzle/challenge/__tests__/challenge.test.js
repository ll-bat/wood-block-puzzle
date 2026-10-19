import fs from 'fs';
import { describe, expect, it } from 'vitest';
import {
    CORE_25_SHAPES,
    boardFromCells,
    getPlacements,
    isLegalPlacement,
} from '../../core';
import { classifyFirstMoves, findOneSolution } from '../../solver';
import { generatePuzzleCollection } from '../../generation';
import {
    ChallengeLoadError,
    ChallengeSession,
    challengeBoardLayout,
    challengeConfigurationFromLocation,
    challengeShapeView,
    loadChallenge,
    progressForCollection,
    saveChallengeProgress,
    selectChallenge,
} from '../index';

const STARTER_PATH = new URL('../../../../public/challenges/starter.json', import.meta.url);

function starterRecord() {
    return JSON.parse(fs.readFileSync(STARTER_PATH, 'utf8'));
}

function mixedFirstMovePuzzle() {
    return {
        board: boardFromCells([
            [0, 0], [0, 2], [0, 5], [0, 7], [1, 3], [1, 4],
            [2, 1], [2, 2], [2, 3], [2, 5], [3, 0], [3, 1], [3, 4],
            [4, 0], [4, 1], [4, 5], [4, 6], [4, 7],
            [5, 0], [5, 2], [5, 3], [5, 4], [6, 2], [6, 3], [6, 5],
            [7, 1], [7, 3], [7, 7],
        ]),
        shapes: ['T_STEM_UP', 'RECTANGLE_3_ROWS_2_COLUMNS', 'LINE_5_VERTICAL'],
    };
}

function syntheticChallenge(puzzle) {
    return {
        id: 'synthetic',
        puzzle: Object.freeze({ board: puzzle.board, shapes: Object.freeze([...puzzle.shapes]) }),
        witness: findOneSolution(puzzle).witness || Object.freeze([]),
    };
}

describe('validated challenge loading', () => {
    it('loads and validates the bundled standalone starter record', () => {
        const loaded = selectChallenge(starterRecord());
        expect(loaded.id).toBe('starter-001');
        expect(loaded.puzzle.shapes).toEqual([
            'SQUARE_2', 'LINE_3_VERTICAL', 'T_STEM_DOWN',
        ]);
        expect(loaded.witness).toHaveLength(3);
        expect(loaded.collection).toHaveLength(1);
        expect(loaded.collection[0].id).toBe('starter-001');
        expect(Object.isFrozen(loaded.collection)).toBe(true);
        expect(Object.isFrozen(loaded.collection[0])).toBe(true);
    });

    it('selects collection entries deterministically by index and id', () => {
        const collection = generatePuzzleCollection({
            count: 2,
            seed: 818,
            simulationBatches: 2,
            maxCandidateAttempts: 30,
        });
        expect(selectChallenge(collection, { index: 1 }).id).toBe(collection.puzzles[1].id);
        const loaded = selectChallenge(collection, { id: collection.puzzles[0].id });
        expect(loaded.index).toBe(0);
        expect(loaded.collection.map(challenge => challenge.id))
            .toEqual(collection.puzzles.map(puzzle => puzzle.id));
        expect(loaded.collection.every(Object.isFrozen)).toBe(true);
        expect(() => selectChallenge(collection, { id: 'missing' })).toThrow(ChallengeLoadError);
        expect(() => selectChallenge(collection, { index: 9 })).toThrow(/out of range/);
    });

    it('flattens catalog sources in order with immutable source provenance', () => {
        const first = generatePuzzleCollection({
            count: 1,
            seed: 71,
            simulationBatches: 2,
            maxCandidateAttempts: 30,
        });
        const second = generatePuzzleCollection({
            count: 2,
            seed: 72,
            simulationBatches: 2,
            maxCandidateAttempts: 30,
        });
        const loaded = selectChallenge({
            catalogFormatVersion: 1,
            sources: [
                { path: '/public/puzzles/a.json', document: first },
                { path: '/public/puzzles/b.json', document: second },
            ],
        });
        expect(loaded.collection).toHaveLength(3);
        expect(loaded.collection.map(challenge => challenge.sourcePath)).toEqual([
            '/public/puzzles/a.json',
            '/public/puzzles/b.json',
            '/public/puzzles/b.json',
        ]);
        expect(loaded.collection.map(challenge => challenge.recordIndex)).toEqual([0, 0, 1]);
        expect(loaded.collection.map(challenge => challenge.index)).toEqual([0, 1, 2]);
        expect(Object.isFrozen(loaded.collection)).toBe(true);
    });

    it('loads persisted progress and defaults missing entries to easy and unsolved', () => {
        const collection = generatePuzzleCollection({
            count: 2,
            seed: 74,
            simulationBatches: 2,
            maxCandidateAttempts: 30,
        });
        const firstId = collection.puzzles[0].id;
        const loaded = selectChallenge({
            catalogFormatVersion: 1,
            sources: [{ path: '/public/puzzles/a.json', document: collection }],
            progress: {
                formatVersion: 1,
                puzzles: { [firstId]: { solved: true, manualDifficulty: 'hard' } },
            },
        });
        expect(loaded.progress[firstId]).toEqual({ solved: true, manualDifficulty: 'hard' });
        expect(loaded.progress[collection.puzzles[1].id])
            .toEqual({ solved: false, manualDifficulty: 'easy' });
        expect(Object.isFrozen(loaded.progress)).toBe(true);
        expect(() => progressForCollection({
            progress: { formatVersion: 1, puzzles: { [firstId]: { solved: 'yes' } } },
        }, loaded.collection)).toThrow(/boolean/);
    });

    it('saves a partial progress update through the review endpoint', async () => {
        let request;
        const saved = await saveChallengeProgress('puzzle-1', { manualDifficulty: 'medium' }, {
            fetchImplementation: async (url, options) => {
                request = { url, options };
                return {
                    ok: true,
                    json: async () => ({
                        puzzleId: 'puzzle-1', solved: false, manualDifficulty: 'medium',
                    }),
                };
            },
        });
        expect(request.url).toBe('/api/puzzle-progress');
        expect(request.options.method).toBe('PATCH');
        expect(JSON.parse(request.options.body)).toEqual({
            puzzleId: 'puzzle-1', manualDifficulty: 'medium',
        });
        expect(saved).toEqual({ solved: false, manualDifficulty: 'medium' });
    });

    it('treats standalone records as catalog entries', () => {
        const record = starterRecord();
        const loaded = selectChallenge({
            catalogFormatVersion: 1,
            sources: [{ path: '/public/puzzles/starter.json', document: record }],
        });
        expect(loaded.id).toBe(record.id);
        expect(loaded.collection).toHaveLength(1);
        expect(loaded.sourcePath).toBe('/public/puzzles/starter.json');
        expect(loaded.recordIndex).toBe(0);
    });

    it('rejects empty, duplicate-id, and invalid catalog sources', () => {
        const collection = generatePuzzleCollection({
            count: 1,
            seed: 73,
            simulationBatches: 2,
            maxCandidateAttempts: 30,
        });
        expect(() => selectChallenge({ catalogFormatVersion: 1, sources: [] }))
            .toThrow(/no puzzles/);
        expect(() => selectChallenge({
            catalogFormatVersion: 1,
            sources: [
                { path: '/public/puzzles/a.json', document: collection },
                { path: '/public/puzzles/b.json', document: collection },
            ],
        })).toThrow(/duplicate id/);
        expect(() => selectChallenge({
            catalogFormatVersion: 1,
            sources: [{ path: '/public/puzzles/bad.json', document: { formatVersion: 99 } }],
        })).toThrow(/bad\.json/);
    });

    it('rejects malformed records and reports fetch failures', async () => {
        const corrupted = starterRecord();
        corrupted.board = 'bad';
        expect(() => selectChallenge(corrupted)).toThrow(/Invalid challenge data/);
        await expect(loadChallenge('/missing.json', {
            fetchImplementation: async () => ({ ok: false, status: 404 }),
        })).rejects.toThrow(/404/);
        await expect(loadChallenge('/broken.json', {
            fetchImplementation: async () => ({ ok: true, json: async () => { throw new Error('bad'); } }),
        })).rejects.toThrow(/not valid JSON/);
    });

    it('loads URL JSON through an injected fetch implementation', async () => {
        const record = starterRecord();
        const loaded = await loadChallenge('/starter.json', {
            fetchImplementation: async url => ({
                ok: url === '/starter.json',
                status: 200,
                json: async () => record,
            }),
        });
        expect(loaded.id).toBe(record.id);
    });
});

describe('browser challenge configuration', () => {
    const location = search => ({ origin: 'http://localhost:3000', search });

    it('reads a same-origin collection and initial zero-based index', () => {
        expect(challengeConfigurationFromLocation(location(
            '?challenge=%2Freview-puzzles.json&challengeIndex=12',
        ))).toEqual({
            source: '/review-puzzles.json',
            selector: { index: 12 },
        });
    });

    it('supports exact ids and ignores invalid indexes or cross-origin sources', () => {
        expect(challengeConfigurationFromLocation(location(
            '?challenge=https%3A%2F%2Fexample.com%2Fpuzzles.json&challengeIndex=-1',
        ))).toEqual({ source: null, selector: {} });
        expect(challengeConfigurationFromLocation(location('?challengeId=puzzle-42')))
            .toEqual({ source: null, selector: { id: 'puzzle-42' } });
    });

    it('gives explicit window globals precedence over URL parameters', () => {
        const selector = { index: 3 };
        expect(challengeConfigurationFromLocation(
            location('?challenge=%2Fignored.json&challengeIndex=9'),
            { source: '/configured.json', selector },
        )).toEqual({ source: '/configured.json', selector });
    });
});

describe('authoritative challenge session', () => {
    it('plays the stored solution to completion with exact transitions', () => {
        const record = starterRecord();
        const originalJson = JSON.stringify(record);
        const loaded = selectChallenge(record);
        const session = new ChallengeSession(loaded);
        loaded.witness.forEach((step, index) => {
            const result = session.place(step.shapeIndex, step.row, step.column);
            expect(result.accepted).toBe(true);
            expect(result.transition.boardAfter).toBe(step.boardAfter);
            expect(result.state.history).toHaveLength(index + 1);
        });
        expect(session.getState().status).toBe('won');
        expect(session.place(0, 0, 0).reason).toBe('SESSION_TERMINAL');
        expect(JSON.stringify(record)).toBe(originalJson);
    });

    it('rejects overlap, bounds, invalid indices, and used pieces without mutation', () => {
        const session = ChallengeSession.fromRecord(starterRecord());
        const initial = session.getState();
        expect(session.place(0, 0, 0).reason).toBe('OVERLAP');
        expect(session.place(0, 7, 7).reason).toBe('OUT_OF_BOUNDS');
        expect(session.place(9, 0, 0).reason).toBe('INVALID_SHAPE_INDEX');
        expect(session.getState()).toEqual(initial);
        expect(session.place(0, 1, 0).accepted).toBe(true);
        const after = session.getState();
        expect(session.place(0, 4, 4).reason).toBe('SHAPE_ALREADY_USED');
        expect(session.getState()).toEqual(after);
    });

    it('tracks duplicate instances independently and accepts another valid solution', () => {
        const puzzle = { board: 0n, shapes: ['SINGLE', 'SINGLE', 'SINGLE'] };
        const session = new ChallengeSession(syntheticChallenge(puzzle));
        expect(session.place(1, 7, 7).accepted).toBe(true);
        expect(session.getState().remainingShapeIndices).toEqual([0, 2]);
        expect(session.place(0, 4, 4).accepted).toBe(true);
        expect(session.place(2, 2, 2).state.status).toBe('won');
    });

    it('uses simultaneous pure clearing and can detect a stuck loss', () => {
        const clearingPuzzle = {
            board: boardFromCells(Array.from({ length: 7 }, (_, column) => [0, column])),
            shapes: ['SINGLE', 'SQUARE_3', 'SQUARE_3'],
        };
        const clearingSession = new ChallengeSession({
            id: 'clear', puzzle: clearingPuzzle, witness: [],
        });
        const cleared = clearingSession.place(0, 0, 7);
        expect(cleared.transition.clearedRows).toEqual([0]);
        expect(cleared.state.board).toBe(0n);

        const puzzle = mixedFirstMovePuzzle();
        const immediateLoss = classifyFirstMoves(puzzle).find(move => {
            if (move.winning) return false;
            const remaining = puzzle.shapes.filter((_shape, index) => index !== move.shapeIndex);
            return remaining.every(shapeId => getPlacements(shapeId)
                .every(placement => !isLegalPlacement(move.boardAfter, placement)));
        });
        const losingSession = new ChallengeSession(syntheticChallenge(puzzle));
        expect(losingSession.place(
            immediateLoss.shapeIndex,
            immediateLoss.row,
            immediateLoss.column,
        ).state.status).toBe('lost');
    });

    it('resets exactly and builds replay frames without mutating player state', () => {
        const session = ChallengeSession.fromRecord(starterRecord());
        session.place(0, 1, 0);
        const beforeReplay = session.getState();
        const frames = session.replayStoredSolution();
        expect(frames).toHaveLength(3);
        expect(session.getState()).toEqual(beforeReplay);
        const reset = session.reset();
        expect(reset.board).toBe(session.initialBoard);
        expect(reset.remainingShapeIndices).toEqual([0, 1, 2]);
        expect(reset.history).toEqual([]);
        expect(reset.status).toBe('active');
    });
});

describe('browser adapter data', () => {
    it('maps boards to the existing 8x8 layout', () => {
        const layout = challengeBoardLayout(boardFromCells([[0, 0], [7, 7]]));
        expect(layout).toHaveLength(8);
        expect(layout.every(row => row.length === 8)).toBe(true);
        expect(layout[0][0]).toBe(1);
        expect(layout[7][7]).toBe(1);
    });

    it('provides render cells for every catalog shape', () => {
        CORE_25_SHAPES.forEach(shape => {
            expect(challengeShapeView(shape.id)).toEqual({
                id: shape.id,
                width: shape.width,
                height: shape.height,
                cells: shape.cells,
            });
        });
    });
});
