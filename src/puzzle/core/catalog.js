import { createShape, validateShapeDefinition } from './shape';

export const CORE_CATALOG_ID = 'core-25/v1';

const definitions = [
    ['SINGLE', [[0, 0]]],

    ['LINE_2_HORIZONTAL', [[0, 0], [0, 1]]],
    ['LINE_2_VERTICAL', [[0, 0], [1, 0]]],
    ['LINE_3_HORIZONTAL', [[0, 0], [0, 1], [0, 2]]],
    ['LINE_3_VERTICAL', [[0, 0], [1, 0], [2, 0]]],
    ['LINE_4_HORIZONTAL', [[0, 0], [0, 1], [0, 2], [0, 3]]],
    ['LINE_4_VERTICAL', [[0, 0], [1, 0], [2, 0], [3, 0]]],
    ['LINE_5_HORIZONTAL', [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4]]],
    ['LINE_5_VERTICAL', [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0]]],

    ['SQUARE_2', [[0, 0], [0, 1], [1, 0], [1, 1]]],
    ['SQUARE_3', [
        [0, 0], [0, 1], [0, 2],
        [1, 0], [1, 1], [1, 2],
        [2, 0], [2, 1], [2, 2],
    ]],
    ['RECTANGLE_2_ROWS_3_COLUMNS', [
        [0, 0], [0, 1], [0, 2],
        [1, 0], [1, 1], [1, 2],
    ]],
    ['RECTANGLE_3_ROWS_2_COLUMNS', [
        [0, 0], [0, 1],
        [1, 0], [1, 1],
        [2, 0], [2, 1],
    ]],

    ['SMALL_CORNER_TOP_LEFT', [[0, 0], [0, 1], [1, 0]]],
    ['SMALL_CORNER_TOP_RIGHT', [[0, 0], [0, 1], [1, 1]]],
    ['SMALL_CORNER_BOTTOM_LEFT', [[0, 0], [1, 0], [1, 1]]],
    ['SMALL_CORNER_BOTTOM_RIGHT', [[0, 1], [1, 0], [1, 1]]],

    ['LARGE_CORNER_TOP_LEFT', [[0, 0], [0, 1], [0, 2], [1, 0], [2, 0]]],
    ['LARGE_CORNER_TOP_RIGHT', [[0, 0], [0, 1], [0, 2], [1, 2], [2, 2]]],
    ['LARGE_CORNER_BOTTOM_LEFT', [[0, 0], [1, 0], [2, 0], [2, 1], [2, 2]]],
    ['LARGE_CORNER_BOTTOM_RIGHT', [[0, 2], [1, 2], [2, 0], [2, 1], [2, 2]]],

    ['T_STEM_UP', [[0, 1], [1, 0], [1, 1], [1, 2]]],
    ['T_STEM_RIGHT', [[0, 0], [1, 0], [1, 1], [2, 0]]],
    ['T_STEM_DOWN', [[0, 0], [0, 1], [0, 2], [1, 1]]],
    ['T_STEM_LEFT', [[0, 1], [1, 0], [1, 1], [2, 1]]],
];

const shapes = definitions.map(([id, cells]) => createShape(id, cells));
const shapesById = new Map(shapes.map(shape => [shape.id, shape]));

if (shapesById.size !== shapes.length) {
    throw new Error(`Catalog ${CORE_CATALOG_ID} contains duplicate shape identifiers`);
}

export const CORE_25_SHAPES = Object.freeze(shapes);

/** Resolve one immutable shape from the core catalog. */
export function getShape(shapeId) {
    const shape = shapesById.get(shapeId);
    if (!shape) {
        throw new RangeError(`Unknown shape in ${CORE_CATALOG_ID}: ${shapeId}`);
    }
    return shape;
}

/** Validate all entries and identifiers in the core catalog. */
export function validateCoreCatalog() {
    if (CORE_25_SHAPES.length !== 25 || shapesById.size !== 25) {
        throw new Error(`${CORE_CATALOG_ID} must contain exactly 25 unique shapes`);
    }
    CORE_25_SHAPES.forEach(validateShapeDefinition);
    return true;
}

validateCoreCatalog();

