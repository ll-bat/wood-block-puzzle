import { validatePuzzleInput } from './input';
import {
    canSolve,
    classifyFirstMovesInternal,
    countSolutionsInternal,
    reconstructWitness,
    viableShapeOrdersInternal,
} from './search';

function normalizeSolutionLimit(solutionLimit) {
    if (solutionLimit === undefined || solutionLimit === Infinity) return Infinity;
    if (!Number.isSafeInteger(solutionLimit) || solutionLimit <= 0) {
        throw new RangeError('solutionLimit must be a positive safe integer or Infinity');
    }
    if (solutionLimit === Number.MAX_SAFE_INTEGER) {
        throw new RangeError('solutionLimit must leave room to establish one additional solution');
    }
    return solutionLimit;
}

function findOneSolutionNormalized(normalized, memo = new Map()) {
    const solvable = canSolve(normalized.board, normalized.instances, memo);
    return Object.freeze({
        solvable,
        witness: solvable
            ? reconstructWitness(normalized.board, normalized.instances, memo)
            : null,
    });
}

export function findOneSolution(puzzle) {
    return findOneSolutionNormalized(validatePuzzleInput(puzzle));
}

export function classifyFirstMoves(puzzle) {
    const normalized = validatePuzzleInput(puzzle);
    return classifyFirstMovesInternal(normalized.board, normalized.instances, new Map());
}

export function countSolutions(puzzle, options = {}) {
    const normalized = validatePuzzleInput(puzzle);
    const solutionLimit = normalizeSolutionLimit(options.solutionLimit);
    const saturationThreshold = solutionLimit === Infinity ? Infinity : solutionLimit + 1;
    const internalCount = countSolutionsInternal(
        normalized.board,
        normalized.instances,
        new Map(),
        saturationThreshold,
    );
    const solutionCountCapped = solutionLimit !== Infinity && internalCount > solutionLimit;

    return Object.freeze({
        solutionCount: solutionCountCapped ? solutionLimit : internalCount,
        solutionCountCapped,
    });
}

export function findViableShapeOrders(puzzle) {
    const normalized = validatePuzzleInput(puzzle);
    return viableShapeOrdersInternal(normalized.board, normalized.shapes);
}

export function analyzePuzzle(puzzle, options = {}) {
    const normalized = validatePuzzleInput(puzzle);
    const solutionLimit = normalizeSolutionLimit(options.solutionLimit);
    const existenceMemo = new Map();
    const solution = findOneSolutionNormalized(normalized, existenceMemo);
    const firstMoves = classifyFirstMovesInternal(
        normalized.board,
        normalized.instances,
        existenceMemo,
    );
    const saturationThreshold = solutionLimit === Infinity ? Infinity : solutionLimit + 1;
    const internalCount = countSolutionsInternal(
        normalized.board,
        normalized.instances,
        new Map(),
        saturationThreshold,
    );
    const solutionCountCapped = solutionLimit !== Infinity && internalCount > solutionLimit;
    const viableShapeOrders = viableShapeOrdersInternal(normalized.board, normalized.shapes);

    return Object.freeze({
        solvable: solution.solvable,
        witness: solution.witness,
        firstMoves,
        legalFirstMoveCount: firstMoves.length,
        winningFirstMoveCount: firstMoves.filter(move => move.winning).length,
        solutionCount: solutionCountCapped ? solutionLimit : internalCount,
        solutionCountCapped,
        viableShapeOrders,
    });
}

