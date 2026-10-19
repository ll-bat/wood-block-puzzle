import { BOARD_SIZE } from './constants';

function fail(message) {
    throw new TypeError(`Invalid shape definition: ${message}`);
}

function cellKey(row, column) {
    return `${row},${column}`;
}

/**
 * Validate a normalized, fixed-orientation shape definition.
 * Returns true on success and throws a descriptive TypeError on failure.
 */
export function validateShapeDefinition(definition) {
    if (!definition || typeof definition !== 'object') {
        fail('expected an object');
    }

    const { id, cells } = definition;
    if (typeof id !== 'string' || id.length === 0) {
        fail('id must be a nonempty string');
    }
    if (!Array.isArray(cells) || cells.length === 0) {
        fail('cells must be a nonempty array');
    }

    const occupied = new Set();
    let minimumRow = Infinity;
    let minimumColumn = Infinity;

    for (const cell of cells) {
        if (!Array.isArray(cell) || cell.length !== 2) {
            fail(`${id} contains a cell that is not a [row, column] pair`);
        }

        const [row, column] = cell;
        if (!Number.isInteger(row) || !Number.isInteger(column)) {
            fail(`${id} cell coordinates must be integers`);
        }
        if (row < 0 || column < 0 || row >= BOARD_SIZE || column >= BOARD_SIZE) {
            fail(`${id} contains an out-of-bounds cell`);
        }

        const key = cellKey(row, column);
        if (occupied.has(key)) {
            fail(`${id} contains duplicate cell ${key}`);
        }
        occupied.add(key);
        minimumRow = Math.min(minimumRow, row);
        minimumColumn = Math.min(minimumColumn, column);
    }

    if (minimumRow !== 0 || minimumColumn !== 0) {
        fail(`${id} must be normalized to row 0 and column 0`);
    }

    const visited = new Set();
    const pending = [cells[0]];
    while (pending.length > 0) {
        const [row, column] = pending.pop();
        const key = cellKey(row, column);
        if (visited.has(key)) continue;
        visited.add(key);

        for (const [rowDelta, columnDelta] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
            const neighbor = [row + rowDelta, column + columnDelta];
            const neighborKey = cellKey(neighbor[0], neighbor[1]);
            if (occupied.has(neighborKey) && !visited.has(neighborKey)) {
                pending.push(neighbor);
            }
        }
    }

    if (visited.size !== cells.length) {
        fail(`${id} must be connected through shared edges`);
    }

    return true;
}

/** Create an immutable, validated shape value. */
export function createShape(id, cells) {
    validateShapeDefinition({ id, cells });

    const immutableCells = Object.freeze(cells.map(([row, column]) => Object.freeze([row, column])));
    const height = Math.max(...immutableCells.map(([row]) => row)) + 1;
    const width = Math.max(...immutableCells.map(([, column]) => column)) + 1;

    return Object.freeze({
        id,
        cells: immutableCells,
        height,
        width,
        cellCount: immutableCells.length,
    });
}

