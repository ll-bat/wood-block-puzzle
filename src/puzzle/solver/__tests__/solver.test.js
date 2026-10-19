import { describe, expect, it } from 'vitest';
import {
    analyzePuzzle,
    applyPlacement,
    boardFromCells,
    boardToCells,
    classifyFirstMoves,
    countSolutions,
    findOneSolution,
    findViableShapeOrders,
    getPlacement,
    getPlacements,
    isLegalPlacement,
    validatePuzzleInput,
} from '../../index';

function initiallyBlockedLinePuzzle() {
    const occupied = [];
    for (let column = 0; column < 7; column++) occupied.push([0, column]);
    for (let row = 1; row < 8; row++) occupied.push([row, row % 2 === 0 ? 3 : 4]);
    return {
        board: boardFromCells(occupied),
        shapes: ['LINE_5_HORIZONTAL', 'SINGLE', 'SINGLE'],
    };
}

function mixedFirstMovePuzzle() {
    return {
        board: boardFromCells([
            [0, 0], [0, 2], [0, 5], [0, 7],
            [1, 3], [1, 4],
            [2, 1], [2, 2], [2, 3], [2, 5],
            [3, 0], [3, 1], [3, 4],
            [4, 0], [4, 1], [4, 5], [4, 6], [4, 7],
            [5, 0], [5, 2], [5, 3], [5, 4],
            [6, 2], [6, 3], [6, 5],
            [7, 1], [7, 3], [7, 7],
        ]),
        shapes: ['T_STEM_UP', 'RECTANGLE_3_ROWS_2_COLUMNS', 'LINE_5_VERTICAL'],
    };
}

function replayWitness(puzzle, witness) {
    let board = puzzle.board;
    const usedIndices = new Set();
    for (const step of witness) {
        expect(step.boardBefore).toBe(board);
        expect(puzzle.shapes[step.shapeIndex]).toBe(step.shapeId);
        expect(usedIndices.has(step.shapeIndex)).toBe(false);
        usedIndices.add(step.shapeIndex);

        const placement = getPlacement(step.shapeId, step.row, step.column);
        expect(isLegalPlacement(board, placement)).toBe(true);
        const transition = applyPlacement(board, placement);
        expect(step.placedBoard).toBe(transition.placedBoard);
        expect(step.boardAfter).toBe(transition.boardAfter);
        expect(step.clearedRows).toEqual(transition.clearedRows);
        expect(step.clearedColumns).toEqual(transition.clearedColumns);
        board = transition.boardAfter;
    }
    expect(usedIndices.size).toBe(3);
    return board;
}

describe('solver input', () => {
    it('accepts duplicate shapes and snapshots the caller tray', () => {
        const shapes = ['SINGLE', 'SINGLE', 'SQUARE_2'];
        const normalized = validatePuzzleInput({ board: 0n, shapes });
        shapes[0] = 'SQUARE_3';

        expect(normalized.shapes).toEqual(['SINGLE', 'SINGLE', 'SQUARE_2']);
        expect(normalized.instances).toEqual([
            { shapeId: 'SINGLE', shapeIndex: 0 },
            { shapeId: 'SINGLE', shapeIndex: 1 },
            { shapeId: 'SQUARE_2', shapeIndex: 2 },
        ]);
        expect(Object.isFrozen(normalized.shapes)).toBe(true);
        expect(Object.isFrozen(normalized.instances)).toBe(true);
    });

    it.each([
        [{ board: 0n, shapes: ['SINGLE', 'SINGLE'] }, /exactly three/],
        [{ board: 0n, shapes: ['SINGLE', 'SINGLE', 'UNKNOWN'] }, /Unknown shape/],
        [{ board: boardFromCells(Array.from({ length: 8 }, (_, column) => [0, column])), shapes: ['SINGLE', 'SINGLE', 'SINGLE'] }, /completed row or column/],
    ])('rejects invalid puzzle input', (puzzle, message) => {
        expect(() => validatePuzzleInput(puzzle)).toThrow(message);
    });
});

describe('exact solvability and witnesses', () => {
    it('returns and replays a deterministic complete witness', () => {
        const puzzle = {
            board: 0n,
            shapes: ['SQUARE_2', 'LINE_3_VERTICAL', 'T_STEM_DOWN'],
        };
        const first = findOneSolution(puzzle);
        const second = findOneSolution(puzzle);

        expect(first.solvable).toBe(true);
        expect(first.witness).toHaveLength(3);
        expect(first).toEqual(second);
        replayWitness(puzzle, first.witness);
        expect(Object.isFrozen(first)).toBe(true);
        expect(Object.isFrozen(first.witness)).toBe(true);
        first.witness.forEach(step => expect(Object.isFrozen(step)).toBe(true));
    });

    it('reports a checkerboard-blocked tray as unsolvable', () => {
        const occupied = [];
        for (let row = 0; row < 8; row++) {
            for (let column = 0; column < 8; column++) {
                if ((row + column) % 2 === 0) occupied.push([row, column]);
            }
        }
        const result = findOneSolution({
            board: boardFromCells(occupied),
            shapes: ['SQUARE_3', 'SQUARE_3', 'SQUARE_3'],
        });
        expect(result).toEqual({ solvable: false, witness: null });
    });

    it('places an initially blocked shape after a required clear and ignores tray order', () => {
        const puzzle = initiallyBlockedLinePuzzle();
        expect(getPlacements('LINE_5_HORIZONTAL').some(placement => (
            isLegalPlacement(puzzle.board, placement)
        ))).toBe(false);

        const result = findOneSolution(puzzle);
        expect(result.solvable).toBe(true);
        expect(result.witness.map(step => step.shapeId)).toEqual([
            'SINGLE', 'LINE_5_HORIZONTAL', 'SINGLE',
        ]);
        expect(result.witness[0].clearedRows).toEqual([0]);
        replayWitness(puzzle, result.witness);
    });

    it('uses the lowest remaining tray index for identical shapes', () => {
        const result = findOneSolution({ board: 0n, shapes: ['SINGLE', 'SINGLE', 'SINGLE'] });
        expect(result.witness.map(step => step.shapeIndex)).toEqual([0, 1, 2]);
    });
});

describe('logical analysis', () => {
    it('classifies winning, delayed-losing, and immediate-losing first moves', () => {
        const puzzle = mixedFirstMovePuzzle();
        const firstMoves = classifyFirstMoves(puzzle);
        const hasLegalContinuation = move => {
            const remainingShapes = puzzle.shapes.filter(
                (_shapeId, shapeIndex) => shapeIndex !== move.shapeIndex,
            );
            return remainingShapes.some(shapeId => getPlacements(shapeId).some(placement => (
                isLegalPlacement(move.boardAfter, placement)
            )));
        };

        expect(firstMoves.filter(move => move.winning)).toHaveLength(1);
        expect(firstMoves.some(move => !move.winning && hasLegalContinuation(move))).toBe(true);
        expect(firstMoves.some(move => !move.winning && !hasLegalContinuation(move))).toBe(true);
        expect(firstMoves).toContainEqual(expect.objectContaining({
            shapeId: 'T_STEM_UP', row: 0, column: 0, winning: false,
        }));
        expect(firstMoves).toContainEqual(expect.objectContaining({
            shapeId: 'T_STEM_UP', row: 0, column: 5, winning: false,
        }));
    });

    it('collapses identical tray instances in first moves and solution counts', () => {
        const puzzle = { board: 0n, shapes: ['SINGLE', 'SINGLE', 'SINGLE'] };
        const firstMoves = classifyFirstMoves(puzzle);
        const count = countSolutions(puzzle);
        const orders = findViableShapeOrders(puzzle);

        expect(firstMoves).toHaveLength(64);
        expect(firstMoves.every(move => move.shapeIndex === 0 && move.winning)).toBe(true);
        expect(count).toEqual({ solutionCount: 64 * 63 * 62, solutionCountCapped: false });
        expect(orders).toEqual([['SINGLE', 'SINGLE', 'SINGLE']]);
    });

    it('caps counts only after finding an additional solution', () => {
        const puzzle = { board: 0n, shapes: ['SINGLE', 'SINGLE', 'SINGLE'] };
        expect(countSolutions(puzzle, { solutionLimit: 100 })).toEqual({
            solutionCount: 100,
            solutionCountCapped: true,
        });
        expect(() => countSolutions(puzzle, { solutionLimit: 0 })).toThrow(/positive safe integer/);
    });

    it('reports only viable logical orders for an initially blocked shape', () => {
        const orders = findViableShapeOrders(initiallyBlockedLinePuzzle());
        expect(orders).toContainEqual(['SINGLE', 'LINE_5_HORIZONTAL', 'SINGLE']);
        expect(orders).toContainEqual(['SINGLE', 'SINGLE', 'LINE_5_HORIZONTAL']);
        expect(orders.some(order => order[0] === 'LINE_5_HORIZONTAL')).toBe(false);
    });

    it('composes immutable, internally consistent analysis', () => {
        const puzzle = initiallyBlockedLinePuzzle();
        const first = analyzePuzzle(puzzle, { solutionLimit: 50 });
        const second = analyzePuzzle(puzzle, { solutionLimit: 50 });

        expect(first).toEqual(second);
        expect(first.solvable).toBe(true);
        expect(first.legalFirstMoveCount).toBe(first.firstMoves.length);
        expect(first.winningFirstMoveCount).toBe(
            first.firstMoves.filter(move => move.winning).length,
        );
        expect(Object.isFrozen(first)).toBe(true);
        expect(Object.isFrozen(first.firstMoves)).toBe(true);
        replayWitness(puzzle, first.witness);
    });
});

