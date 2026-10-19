import { describe, expect, it } from 'vitest';
import {
    applyPlacement,
    assertStableInitialBoard,
    bitAt,
    boardFromCells,
    boardToCells,
    createEmptyBoard,
    getPlacement,
    isCellOccupied,
    isLegalPlacement,
    isStableBoard,
} from '../index';

function rowExcept(row, omittedColumns) {
    return Array.from({ length: 8 }, (_, column) => [row, column])
        .filter(([, column]) => !omittedColumns.includes(column));
}

function columnExcept(column, omittedRows) {
    return Array.from({ length: 8 }, (_, row) => [row, column])
        .filter(([row]) => !omittedRows.includes(row));
}

describe('initial board stability', () => {
    it('accepts a board with an empty cell in every row and column', () => {
        const board = boardFromCells([[0, 0], [1, 1], [2, 2]]);
        expect(isStableBoard(board)).toBe(true);
        expect(assertStableInitialBoard(board)).toBe(true);
    });

    it('rejects a completed row', () => {
        const board = boardFromCells(rowExcept(3, []));
        expect(isStableBoard(board)).toBe(false);
        expect(() => assertStableInitialBoard(board)).toThrow(/completed row or column/);
    });

    it('rejects a completed column', () => {
        const board = boardFromCells(columnExcept(6, []));
        expect(isStableBoard(board)).toBe(false);
        expect(() => assertStableInitialBoard(board)).toThrow(/completed row or column/);
    });
});

describe('placement legality', () => {
    it('accepts a non-overlapping placement without changing the source board', () => {
        const board = boardFromCells([[7, 7]]);
        const before = board;
        expect(isLegalPlacement(board, getPlacement('SQUARE_2', 0, 0))).toBe(true);
        expect(board).toBe(before);
    });

    it('rejects overlap without changing the source board', () => {
        const board = boardFromCells([[0, 0]]);
        const before = board;
        const placement = getPlacement('SQUARE_2', 0, 0);
        expect(isLegalPlacement(board, placement)).toBe(false);
        expect(() => applyPlacement(board, placement)).toThrow(/Illegal overlapping placement/);
        expect(board).toBe(before);
    });

    it('defensively rejects an invalid placement mask', () => {
        expect(() => isLegalPlacement(0n, {
            shapeId: 'INVALID', row: 0, column: 0, mask: 1n << 64n,
        })).toThrow(/lowest 64/);
    });

    it('defensively rejects a forged in-bounds placement', () => {
        expect(() => isLegalPlacement(0n, {
            shapeId: 'SQUARE_2', row: 0, column: 0, mask: 1n,
        })).toThrow(/does not match/);
    });
});

describe('placement transitions and simultaneous clearing', () => {
    it('places a shape without clearing an incomplete line', () => {
        const board = boardFromCells([[7, 7]]);
        const transition = applyPlacement(board, getPlacement('LINE_2_HORIZONTAL', 0, 0));
        expect(transition.clearedRows).toEqual([]);
        expect(transition.clearedColumns).toEqual([]);
        expect(boardToCells(transition.boardAfter)).toEqual([[0, 0], [0, 1], [7, 7]]);
    });

    it('clears exactly one completed row', () => {
        const board = boardFromCells(rowExcept(2, [6, 7]).concat([[4, 0]]));
        const transition = applyPlacement(board, getPlacement('LINE_2_HORIZONTAL', 2, 6));
        expect(transition.clearedRows).toEqual([2]);
        expect(transition.clearedColumns).toEqual([]);
        expect(boardToCells(transition.boardAfter)).toEqual([[4, 0]]);
    });

    it('clears exactly one completed column', () => {
        const board = boardFromCells(columnExcept(5, [6, 7]).concat([[0, 0]]));
        const transition = applyPlacement(board, getPlacement('LINE_2_VERTICAL', 6, 5));
        expect(transition.clearedRows).toEqual([]);
        expect(transition.clearedColumns).toEqual([5]);
        expect(boardToCells(transition.boardAfter)).toEqual([[0, 0]]);
    });

    it('clears multiple completed rows in one transition', () => {
        const occupied = rowExcept(1, [7]).concat(rowExcept(2, [7]), [[6, 0]]);
        const transition = applyPlacement(
            boardFromCells(occupied),
            getPlacement('LINE_2_VERTICAL', 1, 7),
        );
        expect(transition.clearedRows).toEqual([1, 2]);
        expect(transition.clearedColumns).toEqual([]);
        expect(boardToCells(transition.boardAfter)).toEqual([[6, 0]]);
    });

    it('detects a crossing row and column before clearing their union', () => {
        const occupied = rowExcept(3, [3]).concat(columnExcept(3, [3]), [[0, 0]]);
        const source = boardFromCells(occupied);
        const transition = applyPlacement(source, getPlacement('SINGLE', 3, 3));

        expect(transition.clearedRows).toEqual([3]);
        expect(transition.clearedColumns).toEqual([3]);
        expect(transition.clearedMask & bitAt(3, 3)).toBe(bitAt(3, 3));
        expect(boardToCells(transition.boardAfter)).toEqual([[0, 0]]);
    });

    it('preserves incomplete lines outside a completed crossing line', () => {
        const occupied = rowExcept(4, [4]).concat(columnExcept(4, [4]), [[2, 2], [2, 5]]);
        const transition = applyPlacement(
            boardFromCells(occupied),
            getPlacement('SINGLE', 4, 4),
        );
        expect(isCellOccupied(transition.boardAfter, 2, 2)).toBe(true);
        expect(isCellOccupied(transition.boardAfter, 2, 5)).toBe(true);
    });

    it('is deterministic, immutable, and reports the placed intermediate board', () => {
        const board = createEmptyBoard();
        const placement = getPlacement('T_STEM_DOWN', 2, 2);
        const first = applyPlacement(board, placement);
        const second = applyPlacement(board, placement);

        expect(first).toEqual(second);
        expect(first.boardBefore).toBe(board);
        expect(first.placedBoard).toBe(first.boardAfter);
        expect(Object.isFrozen(first)).toBe(true);
        expect(Object.isFrozen(first.clearedRows)).toBe(true);
        expect(Object.isFrozen(first.clearedColumns)).toBe(true);
        expect(board).toBe(0n);
    });
});

