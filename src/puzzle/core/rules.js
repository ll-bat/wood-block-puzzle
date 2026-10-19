import {
    COLUMN_MASKS,
    FULL_BOARD_MASK,
    ROW_MASKS,
    validateBoard,
} from './board';
import { getPlacement } from './placements';

function validatePlacement(placement) {
    if (!placement || typeof placement !== 'object') {
        throw new TypeError('Placement must be an object');
    }
    if (typeof placement.shapeId !== 'string' || placement.shapeId.length === 0) {
        throw new TypeError('Placement must identify a shape');
    }
    if (!Number.isInteger(placement.row) || !Number.isInteger(placement.column)) {
        throw new TypeError('Placement anchor must use integer coordinates');
    }
    validateBoard(placement.mask);
    if (placement.mask === 0n) {
        throw new RangeError('Placement mask must occupy at least one cell');
    }

    const expectedPlacement = getPlacement(placement.shapeId, placement.row, placement.column);
    if (placement.mask !== expectedPlacement.mask) {
        throw new RangeError('Placement mask does not match its shape and anchor');
    }
    return true;
}

export function completedRows(board) {
    validateBoard(board);
    return Object.freeze(ROW_MASKS
        .map((mask, index) => ({ mask, index }))
        .filter(({ mask }) => (board & mask) === mask)
        .map(({ index }) => index));
}

export function completedColumns(board) {
    validateBoard(board);
    return Object.freeze(COLUMN_MASKS
        .map((mask, index) => ({ mask, index }))
        .filter(({ mask }) => (board & mask) === mask)
        .map(({ index }) => index));
}

export function isStableBoard(board) {
    return completedRows(board).length === 0 && completedColumns(board).length === 0;
}

export function assertStableInitialBoard(board) {
    if (!isStableBoard(board)) {
        throw new RangeError('Initial puzzle board must not contain a completed row or column');
    }
    return true;
}

export function isLegalPlacement(board, placement) {
    validateBoard(board);
    validatePlacement(placement);
    return (board & placement.mask) === 0n;
}

/** Place one shape and clear all rows and columns completed by that placement. */
export function applyPlacement(board, placement) {
    if (!isLegalPlacement(board, placement)) {
        throw new RangeError(`Illegal overlapping placement: ${placement.shapeId} at (${placement.row}, ${placement.column})`);
    }

    const placedBoard = board | placement.mask;
    const clearedRows = completedRows(placedBoard);
    const clearedColumns = completedColumns(placedBoard);

    let clearedMask = 0n;
    clearedRows.forEach(row => { clearedMask |= ROW_MASKS[row]; });
    clearedColumns.forEach(column => { clearedMask |= COLUMN_MASKS[column]; });

    const boardAfter = placedBoard & (FULL_BOARD_MASK ^ clearedMask);
    return Object.freeze({
        boardBefore: board,
        placement,
        placedBoard,
        boardAfter,
        clearedRows,
        clearedColumns,
        clearedMask,
    });
}

