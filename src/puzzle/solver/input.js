import {
    assertStableInitialBoard,
    getShape,
    validateBoard,
} from '../core';

/** Validate and snapshot a three-shape puzzle for deterministic search. */
export function validatePuzzleInput(puzzle) {
    if (!puzzle || typeof puzzle !== 'object') {
        throw new TypeError('Puzzle must be an object');
    }

    const { board, shapes } = puzzle;
    validateBoard(board);
    assertStableInitialBoard(board);

    if (!Array.isArray(shapes) || shapes.length !== 3) {
        throw new RangeError('Puzzle tray must contain exactly three shape identifiers');
    }

    const shapeSnapshot = shapes.map((shapeId, shapeIndex) => {
        if (typeof shapeId !== 'string') {
            throw new TypeError(`Shape at tray index ${shapeIndex} must be identified by a string`);
        }
        getShape(shapeId);
        return shapeId;
    });

    const immutableShapes = Object.freeze(shapeSnapshot);
    const instances = Object.freeze(immutableShapes.map((shapeId, shapeIndex) => Object.freeze({
        shapeId,
        shapeIndex,
    })));

    return Object.freeze({ board, shapes: immutableShapes, instances });
}

