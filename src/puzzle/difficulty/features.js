import { getPlacements, isLegalPlacement } from '../core';
import { analyzePuzzle, validatePuzzleInput } from '../solver';
import { enumerateLegalMoves, stateKey } from '../solver/search';

function remainingAfter(instances, shapeIndex) {
    return Object.freeze(instances.filter(instance => instance.shapeIndex !== shapeIndex));
}

function minimumClearedLines(board, instances, memo = new Map()) {
    if (instances.length === 0) return 0;
    const key = stateKey(board, instances);
    if (memo.has(key)) return memo.get(key);
    let minimum = Infinity;
    for (const move of enumerateLegalMoves(board, instances)) {
        const suffix = minimumClearedLines(
            move.transition.boardAfter,
            move.remainingInstances,
            memo,
        );
        if (suffix !== Infinity) {
            minimum = Math.min(
                minimum,
                move.transition.clearedRows.length
                    + move.transition.clearedColumns.length
                    + suffix,
            );
        }
    }
    memo.set(key, minimum);
    return minimum;
}

function distinctOrderCount(shapeIds) {
    const counts = new Map();
    shapeIds.forEach(shapeId => counts.set(shapeId, (counts.get(shapeId) || 0) + 1));
    let result = 6;
    counts.forEach(count => {
        if (count === 2) result /= 2;
        if (count === 3) result /= 6;
    });
    return result;
}

function heuristicMetrics(firstMoves, instances) {
    const ranked = firstMoves.map(move => {
        const remaining = remainingAfter(instances, move.shapeIndex);
        const remainingLegalMoveCount = enumerateLegalMoves(move.boardAfter, remaining).length;
        const clearedLineCount = move.clearedRows.length + move.clearedColumns.length;
        return {
            move,
            value: clearedLineCount * 1000 + remainingLegalMoveCount,
        };
    });
    const bestValue = Math.max(...ranked.map(item => item.value));
    const best = ranked.filter(item => item.value === bestValue);
    return {
        heuristicBestMoveCount: best.length,
        misleadingHeuristicBestMoveCount: best.filter(item => !item.move.winning).length,
    };
}

export function extractDifficultyFeatures(puzzle) {
    const normalized = validatePuzzleInput(puzzle);
    const analysis = analyzePuzzle(normalized, { solutionLimit: 10000 });
    if (!analysis.solvable) throw new RangeError('Cannot evaluate difficulty of an unsolvable puzzle');

    const losingMoves = analysis.firstMoves.filter(move => !move.winning);
    let delayedLosingFirstMoveCount = 0;
    let immediateDeadEndFirstMoveCount = 0;
    losingMoves.forEach(move => {
        const remaining = remainingAfter(normalized.instances, move.shapeIndex);
        if (enumerateLegalMoves(move.boardAfter, remaining).length > 0) {
            delayedLosingFirstMoveCount++;
        } else {
            immediateDeadEndFirstMoveCount++;
        }
    });

    const legalFirstMoveCount = analysis.legalFirstMoveCount;
    const winningFirstMoveCount = analysis.winningFirstMoveCount;
    const clearingMinimum = minimumClearedLines(normalized.board, normalized.instances);
    const heuristic = heuristicMetrics(analysis.firstMoves, normalized.instances);

    return Object.freeze({
        legalFirstMoveCount,
        winningFirstMoveCount,
        losingFirstMoveCount: legalFirstMoveCount - winningFirstMoveCount,
        immediateDeadEndFirstMoveCount,
        delayedLosingFirstMoveCount,
        winningFirstMoveRatioBasisPoints: Math.floor(
            winningFirstMoveCount * 10000 / legalFirstMoveCount,
        ),
        distinctShapeOrderCount: distinctOrderCount(normalized.shapes),
        viableShapeOrderCount: analysis.viableShapeOrders.length,
        initiallyBlockedShapeCount: normalized.instances.filter(instance => (
            !getPlacements(instance.shapeId)
                .some(placement => isLegalPlacement(normalized.board, placement))
        )).length,
        minimumClearedLineCount: clearingMinimum,
        ...heuristic,
    });
}
