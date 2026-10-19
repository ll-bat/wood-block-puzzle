import {
    BOARD_SIZE,
    CORE_25_SHAPES,
    bitAt,
    isCellOccupied,
    validateBoard,
} from '../core';

export const SQUARE_SYMMETRIES = Object.freeze([
    'IDENTITY',
    'ROTATE_90',
    'ROTATE_180',
    'ROTATE_270',
    'REFLECT',
    'REFLECT_ROTATE_90',
    'REFLECT_ROTATE_180',
    'REFLECT_ROTATE_270',
]);

export function transformCoordinate(row, column, symmetry, size = BOARD_SIZE) {
    const last = size - 1;
    switch (symmetry) {
    case 'IDENTITY': return [row, column];
    case 'ROTATE_90': return [column, last - row];
    case 'ROTATE_180': return [last - row, last - column];
    case 'ROTATE_270': return [last - column, row];
    case 'REFLECT': return [row, last - column];
    case 'REFLECT_ROTATE_90': return [last - column, last - row];
    case 'REFLECT_ROTATE_180': return [last - row, column];
    case 'REFLECT_ROTATE_270': return [column, row];
    default: throw new RangeError(`Unknown square symmetry: ${symmetry}`);
    }
}

export function transformBoard(board, symmetry) {
    validateBoard(board);
    let transformed = 0n;
    for (let row = 0; row < BOARD_SIZE; row++) {
        for (let column = 0; column < BOARD_SIZE; column++) {
            if (!isCellOccupied(board, row, column)) continue;
            const [nextRow, nextColumn] = transformCoordinate(row, column, symmetry);
            transformed |= bitAt(nextRow, nextColumn);
        }
    }
    return transformed;
}

function normalizeCells(cells) {
    const minimumRow = Math.min(...cells.map(([row]) => row));
    const minimumColumn = Math.min(...cells.map(([, column]) => column));
    return cells
        .map(([row, column]) => [row - minimumRow, column - minimumColumn])
        .sort(([leftRow, leftColumn], [rightRow, rightColumn]) => (
            leftRow - rightRow || leftColumn - rightColumn
        ));
}

function cellsKey(cells) {
    return normalizeCells(cells).map(cell => cell.join(',')).join(';');
}

const shapeByCells = new Map(CORE_25_SHAPES.map(shape => [cellsKey(shape.cells), shape.id]));

export function transformShapeId(shapeId, symmetry) {
    const shape = CORE_25_SHAPES.find(candidate => candidate.id === shapeId);
    if (!shape) throw new RangeError(`Unknown shape: ${shapeId}`);
    const transformedCells = shape.cells.map(([row, column]) => (
        transformCoordinate(row, column, symmetry)
    ));
    const transformedId = shapeByCells.get(cellsKey(transformedCells));
    if (!transformedId) throw new Error(`Catalog is not closed under ${symmetry}: ${shapeId}`);
    return transformedId;
}

export function transformPuzzle(puzzle, symmetry) {
    if (!puzzle || !Array.isArray(puzzle.shapes) || puzzle.shapes.length !== 3) {
        throw new TypeError('Puzzle must contain exactly three shapes');
    }
    return Object.freeze({
        board: transformBoard(puzzle.board, symmetry),
        shapes: Object.freeze(puzzle.shapes.map(shapeId => transformShapeId(shapeId, symmetry))),
    });
}
