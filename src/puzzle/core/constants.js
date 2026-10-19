export const BOARD_SIZE = 8;
export const CELL_COUNT = BOARD_SIZE * BOARD_SIZE;
export const EMPTY_BOARD = 0n;
export const FULL_BOARD_MASK = (1n << BigInt(CELL_COUNT)) - 1n;

