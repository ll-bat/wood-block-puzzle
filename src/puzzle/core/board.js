import { BOARD_SIZE, CELL_COUNT, EMPTY_BOARD, FULL_BOARD_MASK } from './constants';

export function assertCoordinate(row, column) {
    if (!Number.isInteger(row) || !Number.isInteger(column)
        || row < 0 || row >= BOARD_SIZE || column < 0 || column >= BOARD_SIZE) {
        throw new RangeError(`Board coordinate must be within 0..7: (${row}, ${column})`);
    }
}

export function validateBoard(board) {
    if (typeof board !== 'bigint') {
        throw new TypeError('Board must be a BigInt');
    }
    if (board < EMPTY_BOARD || board > FULL_BOARD_MASK) {
        throw new RangeError('Board must contain only the lowest 64 occupancy bits');
    }
    return true;
}

export function createEmptyBoard() {
    return EMPTY_BOARD;
}

export function bitAt(row, column) {
    assertCoordinate(row, column);
    return 1n << BigInt(row * BOARD_SIZE + column);
}

export function isCellOccupied(board, row, column) {
    validateBoard(board);
    return (board & bitAt(row, column)) !== 0n;
}

export function boardFromCells(cells) {
    if (!Array.isArray(cells)) {
        throw new TypeError('Board cells must be an array');
    }

    let board = EMPTY_BOARD;
    const seen = new Set();
    for (const cell of cells) {
        if (!Array.isArray(cell) || cell.length !== 2) {
            throw new TypeError('Each board cell must be a [row, column] pair');
        }
        const [row, column] = cell;
        assertCoordinate(row, column);
        const key = `${row},${column}`;
        if (seen.has(key)) {
            throw new TypeError(`Duplicate board cell: ${key}`);
        }
        seen.add(key);
        board |= bitAt(row, column);
    }
    return board;
}

export function boardToCells(board) {
    validateBoard(board);
    const cells = [];
    for (let row = 0; row < BOARD_SIZE; row++) {
        for (let column = 0; column < BOARD_SIZE; column++) {
            if (isCellOccupied(board, row, column)) {
                cells.push(Object.freeze([row, column]));
            }
        }
    }
    return Object.freeze(cells);
}

export function boardFromMatrix(matrix) {
    if (!Array.isArray(matrix) || matrix.length !== BOARD_SIZE
        || matrix.some(row => !Array.isArray(row) || row.length !== BOARD_SIZE)) {
        throw new TypeError('Board matrix must be exactly 8x8');
    }

    const cells = [];
    matrix.forEach((row, rowIndex) => {
        row.forEach((cell, columnIndex) => {
            if (cell !== 0 && cell !== 1 && cell !== false && cell !== true) {
                throw new TypeError('Board matrix cells must be boolean or 0/1');
            }
            if (cell === 1 || cell === true) cells.push([rowIndex, columnIndex]);
        });
    });
    return boardFromCells(cells);
}

export function boardToMatrix(board) {
    validateBoard(board);
    return Object.freeze(Array.from({ length: BOARD_SIZE }, (_, row) => Object.freeze(
        Array.from({ length: BOARD_SIZE }, (_, column) => isCellOccupied(board, row, column) ? 1 : 0),
    )));
}

export const ROW_MASKS = Object.freeze(Array.from({ length: BOARD_SIZE }, (_, row) => {
    let mask = 0n;
    for (let column = 0; column < BOARD_SIZE; column++) mask |= bitAt(row, column);
    return mask;
}));

export const COLUMN_MASKS = Object.freeze(Array.from({ length: BOARD_SIZE }, (_, column) => {
    let mask = 0n;
    for (let row = 0; row < BOARD_SIZE; row++) mask |= bitAt(row, column);
    return mask;
}));

export { BOARD_SIZE, CELL_COUNT, EMPTY_BOARD, FULL_BOARD_MASK } from './constants';

