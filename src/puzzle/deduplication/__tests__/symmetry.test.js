import { describe, expect, it } from 'vitest';
import {
    CORE_25_SHAPES,
    applyPlacement,
    boardFromCells,
    getPlacements,
} from '../../core';
import {
    PuzzleDiversityTracker,
    SQUARE_SYMMETRIES,
    canonicalPuzzleKey,
    symmetryAwarePuzzleDistance,
    transformBoard,
    transformPuzzle,
    transformShapeId,
} from '../index';

const PUZZLE = {
    board: boardFromCells([[0, 0], [1, 3], [6, 2], [7, 7]]),
    shapes: ['LINE_3_HORIZONTAL', 'SMALL_CORNER_TOP_LEFT', 'SINGLE'],
};

describe('whole-puzzle symmetry', () => {
    it('provides eight catalog-closed transforms for every shape', () => {
        expect(SQUARE_SYMMETRIES).toHaveLength(8);
        CORE_25_SHAPES.forEach(shape => SQUARE_SYMMETRIES.forEach(symmetry => {
            expect(CORE_25_SHAPES.map(candidate => candidate.id))
                .toContain(transformShapeId(shape.id, symmetry));
        }));
        expect(transformShapeId('LINE_3_HORIZONTAL', 'ROTATE_90'))
            .toBe('LINE_3_VERTICAL');
    });

    it('preserves a placement transition under rotation', () => {
        const placement = getPlacements('LINE_3_HORIZONTAL')
            .find(candidate => (candidate.mask & PUZZLE.board) === 0n);
        const transition = applyPlacement(PUZZLE.board, placement);
        const transformedPuzzle = transformPuzzle(PUZZLE, 'ROTATE_90');
        const transformedMask = transformBoard(placement.mask, 'ROTATE_90');
        const transformedPlacement = getPlacements('LINE_3_VERTICAL')
            .find(candidate => candidate.mask === transformedMask);
        const transformedTransition = applyPlacement(transformedPuzzle.board, transformedPlacement);
        expect(transformedTransition.boardAfter)
            .toBe(transformBoard(transition.boardAfter, 'ROTATE_90'));
    });
});

describe('canonical identity and distance', () => {
    it('canonicalizes rotations, reflections, and tray permutations', () => {
        const transformed = transformPuzzle(PUZZLE, 'REFLECT_ROTATE_90');
        const reordered = { board: transformed.board, shapes: [...transformed.shapes].reverse() };
        expect(canonicalPuzzleKey(reordered)).toBe(canonicalPuzzleKey(PUZZLE));
    });

    it('distinguishes non-equivalent trays', () => {
        expect(canonicalPuzzleKey({ ...PUZZLE, shapes: ['SINGLE', 'SINGLE', 'SINGLE'] }))
            .not.toBe(canonicalPuzzleKey(PUZZLE));
        expect(symmetryAwarePuzzleDistance(
            PUZZLE,
            { ...PUZZLE, shapes: ['SINGLE', 'SINGLE', 'SINGLE'] },
        )).toBe(Infinity);
    });

    it('computes aligned Hamming distance and tracks exact versus near duplicates', () => {
        const rotated = transformPuzzle(PUZZLE, 'ROTATE_180');
        expect(symmetryAwarePuzzleDistance(PUZZLE, rotated)).toBe(0);
        const near = { ...PUZZLE, board: PUZZLE.board ^ 1n << 5n };
        expect(symmetryAwarePuzzleDistance(PUZZLE, near)).toBe(1);

        const tracker = new PuzzleDiversityTracker(1);
        expect(tracker.classify(PUZZLE)).toBe(null);
        tracker.add(PUZZLE);
        expect(tracker.classify(rotated)).toBe('exact');
        expect(tracker.classify(near)).toBe('near');
    });
});
