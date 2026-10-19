import { describe, expect, it } from 'vitest';
import {
    EMPTY_BOARD,
    FULL_BOARD_MASK,
    bitAt,
    boardFromCells,
    boardFromMatrix,
    boardToCells,
    boardToMatrix,
    createEmptyBoard,
    isCellOccupied,
    validateBoard,
} from '../index';

describe('BigInt board representation', () => {
    it('creates an empty 64-cell board', () => {
        expect(createEmptyBoard()).toBe(EMPTY_BOARD);
        expect(boardToCells(createEmptyBoard())).toEqual([]);
    });

    it('maps both board corners to the expected bits', () => {
        expect(bitAt(0, 0)).toBe(1n);
        expect(bitAt(7, 7)).toBe(1n << 63n);
        expect(boardFromCells([[0, 0], [7, 7]])).toBe(1n | (1n << 63n));
    });

    it('queries occupied and empty cells', () => {
        const board = boardFromCells([[2, 3]]);
        expect(isCellOccupied(board, 2, 3)).toBe(true);
        expect(isCellOccupied(board, 2, 4)).toBe(false);
    });

    it.each([
        [-1n],
        [FULL_BOARD_MASK + 1n],
        [42],
    ])('rejects invalid board value %s', board => {
        expect(() => validateBoard(board)).toThrow();
    });

    it.each([
        [-1, 0], [0, -1], [8, 0], [0, 8], [0.5, 0],
    ])('rejects invalid coordinate (%s, %s)', (row, column) => {
        expect(() => bitAt(row, column)).toThrow(/coordinate/);
    });

    it('rejects duplicate coordinate input', () => {
        expect(() => boardFromCells([[1, 1], [1, 1]])).toThrow(/Duplicate/);
    });

    it('round-trips an occupancy matrix without retaining mutable input', () => {
        const matrix = Array.from({ length: 8 }, () => Array(8).fill(0));
        matrix[0][7] = 1;
        matrix[4][3] = 1;
        const board = boardFromMatrix(matrix);

        matrix[0][7] = 0;
        expect(boardToMatrix(board)[0][7]).toBe(1);
        expect(boardToMatrix(board)[4][3]).toBe(1);
        expect(Object.isFrozen(boardToMatrix(board))).toBe(true);
        expect(Object.isFrozen(boardToMatrix(board)[0])).toBe(true);
    });

    it('does not change a source board during conversion', () => {
        const board = boardFromCells([[3, 3], [5, 5]]);
        const before = board;
        const cells = boardToCells(board);
        expect(board).toBe(before);
        expect(cells).toEqual([[3, 3], [5, 5]]);
        expect(Object.isFrozen(cells)).toBe(true);
    });
});

