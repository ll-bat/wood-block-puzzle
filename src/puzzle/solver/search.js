import {
    applyPlacement,
    getPlacements,
    isLegalPlacement,
} from '../core';

export function stateKey(board, remainingInstances) {
    const shapeMultiset = remainingInstances
        .map(instance => instance.shapeId)
        .sort()
        .join(',');
    return `${board.toString(16).padStart(16, '0')}|${shapeMultiset}`;
}

function removeInstance(remainingInstances, shapeIndex) {
    return remainingInstances.filter(instance => instance.shapeIndex !== shapeIndex);
}

/**
 * Enumerate every logical legal move in deterministic tray-index and row-major
 * order. Identical remaining shape instances share one logical branch.
 */
export function enumerateLegalMoves(board, remainingInstances) {
    const moves = [];
    const visitedShapeIds = new Set();

    for (const instance of remainingInstances) {
        if (visitedShapeIds.has(instance.shapeId)) continue;
        visitedShapeIds.add(instance.shapeId);

        for (const placement of getPlacements(instance.shapeId)) {
            if (!isLegalPlacement(board, placement)) continue;
            const transition = applyPlacement(board, placement);
            moves.push(Object.freeze({
                instance,
                placement,
                transition,
                remainingInstances: Object.freeze(removeInstance(
                    remainingInstances,
                    instance.shapeIndex,
                )),
            }));
        }
    }

    return Object.freeze(moves);
}

export function canSolve(board, remainingInstances, memo = new Map()) {
    if (remainingInstances.length === 0) return true;

    const key = stateKey(board, remainingInstances);
    if (memo.has(key)) return memo.get(key);

    for (const move of enumerateLegalMoves(board, remainingInstances)) {
        if (canSolve(move.transition.boardAfter, move.remainingInstances, memo)) {
            memo.set(key, true);
            return true;
        }
    }

    memo.set(key, false);
    return false;
}

function witnessStep(move) {
    const { instance, placement, transition } = move;
    return Object.freeze({
        shapeIndex: instance.shapeIndex,
        shapeId: instance.shapeId,
        row: placement.row,
        column: placement.column,
        boardBefore: transition.boardBefore,
        placedBoard: transition.placedBoard,
        boardAfter: transition.boardAfter,
        clearedRows: transition.clearedRows,
        clearedColumns: transition.clearedColumns,
        clearedMask: transition.clearedMask,
    });
}

export function reconstructWitness(board, remainingInstances, memo) {
    if (remainingInstances.length === 0) return Object.freeze([]);

    for (const move of enumerateLegalMoves(board, remainingInstances)) {
        if (!canSolve(move.transition.boardAfter, move.remainingInstances, memo)) continue;
        const suffix = reconstructWitness(
            move.transition.boardAfter,
            move.remainingInstances,
            memo,
        );
        return Object.freeze([witnessStep(move), ...suffix]);
    }

    return null;
}

export function classifyFirstMovesInternal(board, instances, memo) {
    return Object.freeze(enumerateLegalMoves(board, instances).map(move => Object.freeze({
        shapeIndex: move.instance.shapeIndex,
        shapeId: move.instance.shapeId,
        row: move.placement.row,
        column: move.placement.column,
        boardBefore: move.transition.boardBefore,
        placedBoard: move.transition.placedBoard,
        boardAfter: move.transition.boardAfter,
        clearedRows: move.transition.clearedRows,
        clearedColumns: move.transition.clearedColumns,
        clearedMask: move.transition.clearedMask,
        winning: canSolve(move.transition.boardAfter, move.remainingInstances, memo),
    })));
}

function addCounts(left, right, saturationThreshold) {
    const total = left + right;
    if (!Number.isSafeInteger(total)) {
        throw new RangeError('Logical solution count exceeded JavaScript safe integer range');
    }
    return saturationThreshold === Infinity
        ? total
        : Math.min(total, saturationThreshold);
}

export function countSolutionsInternal(
    board,
    remainingInstances,
    memo,
    saturationThreshold = Infinity,
) {
    if (remainingInstances.length === 0) return 1;

    const key = stateKey(board, remainingInstances);
    if (memo.has(key)) return memo.get(key);

    let count = 0;
    for (const move of enumerateLegalMoves(board, remainingInstances)) {
        count = addCounts(
            count,
            countSolutionsInternal(
                move.transition.boardAfter,
                move.remainingInstances,
                memo,
                saturationThreshold,
            ),
            saturationThreshold,
        );
        if (count === saturationThreshold) break;
    }

    memo.set(key, count);
    return count;
}

export function uniqueShapeOrders(shapeIds) {
    const orders = [];
    const used = Array(shapeIds.length).fill(false);

    function visit(current) {
        if (current.length === shapeIds.length) {
            orders.push(Object.freeze([...current]));
            return;
        }

        const visitedAtDepth = new Set();
        for (let index = 0; index < shapeIds.length; index++) {
            if (used[index] || visitedAtDepth.has(shapeIds[index])) continue;
            visitedAtDepth.add(shapeIds[index]);
            used[index] = true;
            current.push(shapeIds[index]);
            visit(current);
            current.pop();
            used[index] = false;
        }
    }

    visit([]);
    return Object.freeze(orders);
}

function canSolveFixedOrder(board, order, depth, memo) {
    if (depth === order.length) return true;

    const key = `${board.toString(16).padStart(16, '0')}|${depth}`;
    if (memo.has(key)) return memo.get(key);

    for (const placement of getPlacements(order[depth])) {
        if (!isLegalPlacement(board, placement)) continue;
        const transition = applyPlacement(board, placement);
        if (canSolveFixedOrder(transition.boardAfter, order, depth + 1, memo)) {
            memo.set(key, true);
            return true;
        }
    }

    memo.set(key, false);
    return false;
}

export function viableShapeOrdersInternal(board, shapeIds) {
    return Object.freeze(uniqueShapeOrders(shapeIds).filter(order => (
        canSolveFixedOrder(board, order, 0, new Map())
    )));
}

