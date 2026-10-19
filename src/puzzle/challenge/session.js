import {
    applyPlacement,
    getPlacement,
    getPlacements,
    isLegalPlacement,
} from '../core';
import { selectChallenge } from './loader';

function immutableMove(step) {
    return Object.freeze({
        shapeIndex: step.shapeIndex,
        shapeId: step.shapeId,
        row: step.row,
        column: step.column,
        boardBefore: step.boardBefore,
        placedBoard: step.placedBoard,
        boardAfter: step.boardAfter,
        clearedRows: step.clearedRows,
        clearedColumns: step.clearedColumns,
        clearedMask: step.clearedMask,
    });
}

export class ChallengeSession {
    static fromRecord(record) {
        return new ChallengeSession(selectChallenge(record));
    }

    constructor(challenge) {
        if (!challenge || !challenge.puzzle || !Array.isArray(challenge.witness)) {
            throw new TypeError('ChallengeSession requires a validated loaded challenge');
        }
        this.id = challenge.id;
        this.initialBoard = challenge.puzzle.board;
        this.shapes = Object.freeze([...challenge.puzzle.shapes]);
        this.storedWitness = challenge.witness;
        this.reset();
    }

    reset() {
        this.board = this.initialBoard;
        this.remainingShapeIndices = [0, 1, 2];
        this.history = [];
        this.status = 'active';
        return this.getState();
    }

    getState() {
        return Object.freeze({
            id: this.id,
            board: this.board,
            shapes: this.shapes,
            remainingShapeIndices: Object.freeze([...this.remainingShapeIndices]),
            history: Object.freeze([...this.history]),
            status: this.status,
        });
    }

    hasAnyLegalPlacement() {
        return this.remainingShapeIndices.some(shapeIndex => (
            getPlacements(this.shapes[shapeIndex])
                .some(placement => isLegalPlacement(this.board, placement))
        ));
    }

    reject(reason) {
        return Object.freeze({ accepted: false, reason, state: this.getState() });
    }

    place(shapeIndex, row, column) {
        if (this.status !== 'active') return this.reject('SESSION_TERMINAL');
        if (!Number.isInteger(shapeIndex) || shapeIndex < 0 || shapeIndex > 2) {
            return this.reject('INVALID_SHAPE_INDEX');
        }
        if (!this.remainingShapeIndices.includes(shapeIndex)) return this.reject('SHAPE_ALREADY_USED');
        if (!Number.isInteger(row) || !Number.isInteger(column)) return this.reject('INVALID_ANCHOR');

        let placement;
        try {
            placement = getPlacement(this.shapes[shapeIndex], row, column);
        } catch (_error) {
            return this.reject('OUT_OF_BOUNDS');
        }
        if (!isLegalPlacement(this.board, placement)) return this.reject('OVERLAP');

        const transition = applyPlacement(this.board, placement);
        const move = immutableMove({
            shapeIndex,
            shapeId: this.shapes[shapeIndex],
            row,
            column,
            ...transition,
        });
        this.board = transition.boardAfter;
        this.remainingShapeIndices = this.remainingShapeIndices
            .filter(index => index !== shapeIndex);
        this.history = [...this.history, move];
        if (this.remainingShapeIndices.length === 0) this.status = 'won';
        else if (!this.hasAnyLegalPlacement()) this.status = 'lost';

        return Object.freeze({
            accepted: true,
            move,
            transition,
            state: this.getState(),
        });
    }

    replayStoredSolution() {
        const before = this.getState();
        let board = this.initialBoard;
        const used = new Set();
        const frames = this.storedWitness.map(step => {
            if (used.has(step.shapeIndex) || this.shapes[step.shapeIndex] !== step.shapeId) {
                throw new Error('Stored challenge witness has invalid tray identity');
            }
            const transition = applyPlacement(
                board,
                getPlacement(step.shapeId, step.row, step.column),
            );
            if (transition.boardAfter !== step.boardAfter) {
                throw new Error('Stored challenge witness does not match replay');
            }
            used.add(step.shapeIndex);
            board = transition.boardAfter;
            return immutableMove({ ...step, ...transition });
        });
        const after = this.getState();
        if (before.board !== after.board
            || before.status !== after.status
            || before.history.length !== after.history.length
            || before.remainingShapeIndices.join(',') !== after.remainingShapeIndices.join(',')) {
            throw new Error('Solution replay mutated the player session');
        }
        return Object.freeze(frames);
    }
}
