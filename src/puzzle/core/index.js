/**
 * Pure Wood Block Puzzle domain API.
 *
 * This module intentionally has no dependencies on browser globals, rendering,
 * animation, events, or the mutable UI board store.
 */
export {
    BOARD_SIZE,
    CELL_COUNT,
    EMPTY_BOARD,
    FULL_BOARD_MASK,
    ROW_MASKS,
    COLUMN_MASKS,
    assertCoordinate,
    bitAt,
    boardFromCells,
    boardFromMatrix,
    boardToCells,
    boardToMatrix,
    createEmptyBoard,
    isCellOccupied,
    validateBoard,
} from './board';

export { createShape, validateShapeDefinition } from './shape';
export {
    CORE_CATALOG_ID,
    CORE_25_SHAPES,
    getShape,
    validateCoreCatalog,
} from './catalog';
export { getPlacement, getPlacements } from './placements';
export {
    applyPlacement,
    assertStableInitialBoard,
    completedColumns,
    completedRows,
    isLegalPlacement,
    isStableBoard,
} from './rules';

