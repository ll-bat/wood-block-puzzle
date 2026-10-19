import { describe, expect, it } from 'vitest';
import { boardFromCells } from '../../core';
import {
    DIFFICULTY_MODEL_VERSION,
    evaluateDifficulty,
    extractDifficultyFeatures,
    matchesDifficultyTarget,
} from '../index';

function initiallyBlockedLinePuzzle() {
    const occupied = [];
    for (let column = 0; column < 7; column++) occupied.push([0, column]);
    for (let row = 1; row < 8; row++) occupied.push([row, row % 2 === 0 ? 3 : 4]);
    return {
        board: boardFromCells(occupied),
        shapes: ['LINE_5_HORIZONTAL', 'SINGLE', 'SINGLE'],
    };
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

describe('exact difficulty features', () => {
    it('reports internally consistent winning and losing decisions', () => {
        const features = extractDifficultyFeatures(mixedFirstMovePuzzle());
        expect(features.winningFirstMoveCount + features.losingFirstMoveCount)
            .toBe(features.legalFirstMoveCount);
        expect(features.immediateDeadEndFirstMoveCount + features.delayedLosingFirstMoveCount)
            .toBe(features.losingFirstMoveCount);
        expect(features.delayedLosingFirstMoveCount).toBeGreaterThan(0);
        expect(features.immediateDeadEndFirstMoveCount).toBeGreaterThan(0);
        expect(features.winningFirstMoveRatioBasisPoints).toBeGreaterThan(0);
        expect(features.winningFirstMoveRatioBasisPoints).toBeLessThan(10000);
    });

    it('detects an initially blocked piece and a required clear', () => {
        const features = extractDifficultyFeatures(initiallyBlockedLinePuzzle());
        expect(features.initiallyBlockedShapeCount).toBe(1);
        expect(features.minimumClearedLineCount).toBeGreaterThan(0);
        expect(features.viableShapeOrderCount).toBeLessThan(features.distinctShapeOrderCount);
    });

    it('rejects unsolvable puzzles', () => {
        const occupied = [];
        for (let row = 0; row < 8; row++) {
            for (let column = 0; column < 8; column++) {
                if ((row + column) % 2 === 0) occupied.push([row, column]);
            }
        }
        expect(() => extractDifficultyFeatures({
            board: boardFromCells(occupied),
            shapes: ['SQUARE_3', 'SQUARE_3', 'SQUARE_3'],
        })).toThrow(/unsolvable/);
    });
});

describe('casual-v1 model', () => {
    it('is deterministic, explained, and independent of solution-count output', () => {
        const puzzle = mixedFirstMovePuzzle();
        const first = evaluateDifficulty(puzzle);
        expect(first).toEqual(evaluateDifficulty(puzzle));
        expect(first.modelVersion).toBe(DIFFICULTY_MODEL_VERSION);
        expect(['easy', 'medium', 'hard']).toContain(first.tier);
        expect(first.score).toBeGreaterThanOrEqual(0);
        expect(first.metrics).not.toHaveProperty('solutionCount');
        expect(Object.isFrozen(first.reasons)).toBe(true);
    });

    it('matches named tiers exactly while any remains unrestricted', () => {
        const result = evaluateDifficulty({
            board: 0n,
            shapes: ['SINGLE', 'SINGLE', 'SINGLE'],
        });
        expect(matchesDifficultyTarget(result, 'any')).toBe(true);
        expect(result).toMatchObject({ score: 0, tier: 'easy', reasons: [] });
        expect(matchesDifficultyTarget(result, result.tier)).toBe(true);
        expect(matchesDifficultyTarget(result, result.tier === 'easy' ? 'hard' : 'easy')).toBe(false);
        expect(() => matchesDifficultyTarget(result, 'extreme')).toThrow(/must be one of/);
    });
});
