import { BOARD_SIZE } from './constants';
import { bitAt, validateBoard } from './board';
import { CORE_25_SHAPES, getShape } from './catalog';

function createPlacement(shape, row, column) {
    let mask = 0n;
    for (const [rowOffset, columnOffset] of shape.cells) {
        mask |= bitAt(row + rowOffset, column + columnOffset);
    }
    validateBoard(mask);
    return Object.freeze({ shapeId: shape.id, row, column, mask });
}

function enumerateShapePlacements(shape) {
    const placements = [];
    for (let row = 0; row <= BOARD_SIZE - shape.height; row++) {
        for (let column = 0; column <= BOARD_SIZE - shape.width; column++) {
            placements.push(createPlacement(shape, row, column));
        }
    }
    return Object.freeze(placements);
}

const placementsByShapeId = new Map(
    CORE_25_SHAPES.map(shape => [shape.id, enumerateShapePlacements(shape)]),
);
const placementsByAnchorByShapeId = new Map(
    Array.from(placementsByShapeId, ([shapeId, placements]) => [
        shapeId,
        new Map(placements.map(placement => [`${placement.row},${placement.column}`, placement])),
    ]),
);

/** Return all immutable, in-bounds placements for one fixed-orientation shape. */
export function getPlacements(shapeId) {
    getShape(shapeId);
    return placementsByShapeId.get(shapeId);
}

/** Resolve a placement by its normalized top-left anchor. */
export function getPlacement(shapeId, row, column) {
    getShape(shapeId);
    const placement = placementsByAnchorByShapeId.get(shapeId).get(`${row},${column}`);
    if (!placement) {
        throw new RangeError(`No in-bounds placement for ${shapeId} at (${row}, ${column})`);
    }
    return placement;
}

