import { describe, expect, it } from 'vitest';
import {
    EMPTY_BOARD,
    applyPlacement,
    getPlacement,
    isStableBoard,
} from '../../core';
import {
    SimulationExhaustedError,
    createSeededRandom,
    simulateGameplayBoard,
    trySimulateBatch,
} from '../index';

function replay(history) {
    return history.reduce((board, step) => {
        expect(step.boardBefore).toBe(board);
        const actual = applyPlacement(board, getPlacement(step.shapeId, step.row, step.column));
        expect(actual).toMatchObject({
            placedBoard: step.placedBoard,
            boardAfter: step.boardAfter,
            clearedRows: step.clearedRows,
            clearedColumns: step.clearedColumns,
            clearedMask: step.clearedMask,
        });
        return actual.boardAfter;
    }, EMPTY_BOARD);
}

describe('gameplay-derived board simulation', () => {
    it('commits complete three-shape batches with replayable transitions', () => {
        const result = simulateGameplayBoard({
            random: createSeededRandom(123),
            batches: 8,
            maxBatchAttempts: 100,
        });
        expect(result.history).toHaveLength(24);
        expect(replay(result.history)).toBe(result.board);
        expect(isStableBoard(result.board)).toBe(true);
        for (let batch = 0; batch < 8; batch++) {
            expect(result.history.slice(batch * 3, batch * 3 + 3)
                .map(step => step.batchIndex)).toEqual([batch, batch, batch]);
        }
    });

    it('is deterministic for an equal seed and configuration', () => {
        const run = () => simulateGameplayBoard({
            random: createSeededRandom(55),
            batches: 5,
            maxBatchAttempts: 50,
        });
        expect(run()).toEqual(run());
    });

    it('does not mutate a source board when a tentative batch cannot complete', () => {
        const source = EMPTY_BOARD;
        const result = trySimulateBatch(source, createSeededRandom(1), () => [
            'SQUARE_3', 'SQUARE_3', 'SQUARE_3',
        ]);
        expect(source).toBe(EMPTY_BOARD);
        if (result) expect(result.history).toHaveLength(3);
    });

    it('reports bounded batch exhaustion and exposes the last committed board', () => {
        expect(() => simulateGameplayBoard({
            random: createSeededRandom(1),
            batches: 2,
            maxBatchAttempts: 3,
        }, { attemptBatch: () => null })).toThrow(SimulationExhaustedError);
        try {
            simulateGameplayBoard({
                random: createSeededRandom(1),
                batches: 1,
                maxBatchAttempts: 1,
            }, { attemptBatch: () => null });
        } catch (error) {
            expect(error.board).toBe(EMPTY_BOARD);
            expect(error.batchIndex).toBe(0);
        }
    });
});
