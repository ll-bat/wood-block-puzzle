import {
    EMPTY_BOARD,
    applyPlacement,
    getPlacements,
    isLegalPlacement,
    isStableBoard,
} from '../core';
import { randomInt, sampleTray, shuffle } from './random';

function positiveInteger(value, name) {
    if (!Number.isSafeInteger(value) || value <= 0) {
        throw new RangeError(`${name} must be a positive safe integer`);
    }
    return value;
}

function transitionStep(shapeIndex, shapeId, transition) {
    return Object.freeze({
        shapeIndex,
        shapeId,
        row: transition.placement.row,
        column: transition.placement.column,
        boardBefore: transition.boardBefore,
        placedBoard: transition.placedBoard,
        boardAfter: transition.boardAfter,
        clearedRows: transition.clearedRows,
        clearedColumns: transition.clearedColumns,
        clearedMask: transition.clearedMask,
    });
}

/** Attempt one complete tray without mutating or partially committing its input. */
export function trySimulateBatch(board, random, traySampler = sampleTray) {
    const shapes = traySampler(random);
    if (!Array.isArray(shapes) || shapes.length !== 3) {
        throw new RangeError('A simulation tray must contain exactly three shapes');
    }

    const order = shuffle(random, shapes.map((shapeId, shapeIndex) => ({ shapeId, shapeIndex })));
    const history = [];
    let tentativeBoard = board;

    for (const instance of order) {
        const legalPlacements = getPlacements(instance.shapeId)
            .filter(placement => isLegalPlacement(tentativeBoard, placement));
        if (legalPlacements.length === 0) return null;
        const placement = legalPlacements[randomInt(random, legalPlacements.length)];
        const transition = applyPlacement(tentativeBoard, placement);
        history.push(transitionStep(instance.shapeIndex, instance.shapeId, transition));
        tentativeBoard = transition.boardAfter;
    }

    return Object.freeze({
        board: tentativeBoard,
        shapes: Object.freeze([...shapes]),
        history: Object.freeze(history),
    });
}

export class SimulationExhaustedError extends Error {
    constructor(batchIndex, board) {
        super(`Could not complete simulation batch ${batchIndex + 1}`);
        this.name = 'SimulationExhaustedError';
        this.batchIndex = batchIndex;
        this.board = board;
    }
}

export function simulateGameplayBoard(config, dependencies = {}) {
    if (!config || typeof config !== 'object') throw new TypeError('Simulation config is required');
    const batches = positiveInteger(config.batches, 'batches');
    const maxBatchAttempts = positiveInteger(config.maxBatchAttempts, 'maxBatchAttempts');
    if (typeof config.random !== 'function') throw new TypeError('random must be a function');
    const attemptBatch = dependencies.attemptBatch || trySimulateBatch;
    const history = [];
    let board = EMPTY_BOARD;

    for (let batchIndex = 0; batchIndex < batches; batchIndex++) {
        let completed = null;
        for (let attempt = 0; attempt < maxBatchAttempts && !completed; attempt++) {
            completed = attemptBatch(board, config.random);
        }
        if (!completed) throw new SimulationExhaustedError(batchIndex, board);
        board = completed.board;
        history.push(...completed.history.map(step => Object.freeze({ ...step, batchIndex })));
    }

    if (!isStableBoard(board)) throw new Error('Simulation produced an unstable board');
    return Object.freeze({ board, history: Object.freeze(history), batches });
}
