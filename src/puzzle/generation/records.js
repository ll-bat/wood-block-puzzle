import {
    CORE_CATALOG_ID,
    EMPTY_BOARD,
    applyPlacement,
    assertStableInitialBoard,
    getPlacement,
    getShape,
    validateBoard,
} from '../core';
import { validateGenerationConfig } from './config';
import { validateSeed } from './random';
import { DIFFICULTY_MODEL_VERSION, evaluateDifficulty } from '../difficulty';

export const RECORD_FORMAT_VERSION = 1;
export const COLLECTION_FORMAT_VERSION = 1;
export const RULES_VERSION = 'wood-block-8x8/v1';

const HEX_PATTERN = /^[0-9a-f]{16}$/;

export function boardToHex(board) {
    validateBoard(board);
    return board.toString(16).padStart(16, '0');
}

export function boardFromHex(value) {
    if (typeof value !== 'string' || !HEX_PATTERN.test(value)) {
        throw new RangeError('Board and mask values must be exactly 16 lowercase hexadecimal characters');
    }
    const board = BigInt(`0x${value}`);
    validateBoard(board);
    return board;
}

function requireObject(value, name) {
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
        throw new TypeError(`${name} must be an object`);
    }
    return value;
}

function requireInteger(value, name, minimum = 0) {
    if (!Number.isSafeInteger(value) || value < minimum) {
        throw new RangeError(`${name} must be an integer of at least ${minimum}`);
    }
    return value;
}

function requireIntegerArray(value, name) {
    if (!Array.isArray(value) || value.some(item => !Number.isInteger(item))) {
        throw new TypeError(`${name} must be an integer array`);
    }
    return Object.freeze([...value]);
}

function equalArrays(left, right) {
    return left.length === right.length && left.every((value, index) => value === right[index]);
}

function serializeStep(step) {
    return Object.freeze({
        shapeIndex: step.shapeIndex,
        shapeId: step.shapeId,
        row: step.row,
        column: step.column,
        boardBefore: boardToHex(step.boardBefore),
        placedBoard: boardToHex(step.placedBoard),
        boardAfter: boardToHex(step.boardAfter),
        clearedRows: Object.freeze([...step.clearedRows]),
        clearedColumns: Object.freeze([...step.clearedColumns]),
        clearedMask: boardToHex(step.clearedMask),
    });
}

function serializeSimulationStep(step) {
    return Object.freeze({ ...serializeStep(step), batchIndex: step.batchIndex });
}

function serializeDifficulty(difficulty) {
    if (!difficulty || typeof difficulty !== 'object') {
        throw new TypeError('Generated puzzle difficulty is required');
    }
    return Object.freeze({
        modelVersion: difficulty.modelVersion,
        score: difficulty.score,
        tier: difficulty.tier,
        reasons: Object.freeze([...difficulty.reasons]),
        metrics: Object.freeze({ ...difficulty.metrics }),
    });
}

function equalJson(left, right) {
    if (left === right) return true;
    if (Array.isArray(left) || Array.isArray(right)) {
        return Array.isArray(left)
            && Array.isArray(right)
            && left.length === right.length
            && left.every((value, index) => equalJson(value, right[index]));
    }
    if (left && right && typeof left === 'object' && typeof right === 'object') {
        const leftKeys = Object.keys(left).sort();
        const rightKeys = Object.keys(right).sort();
        return equalJson(leftKeys, rightKeys)
            && leftKeys.every(key => equalJson(left[key], right[key]));
    }
    return false;
}

export function createPuzzleRecord({ id, puzzle, witness, provenance, difficulty }) {
    if (typeof id !== 'string' || id.length === 0) throw new TypeError('Puzzle id is required');
    requireObject(puzzle, 'puzzle');
    assertStableInitialBoard(puzzle.board);
    if (!Array.isArray(puzzle.shapes) || puzzle.shapes.length !== 3) {
        throw new RangeError('Puzzle must contain exactly three shapes');
    }
    puzzle.shapes.forEach(getShape);
    if (!Array.isArray(witness) || witness.length !== 3) {
        throw new RangeError('Puzzle witness must contain exactly three steps');
    }
    requireObject(provenance, 'provenance');

    const record = Object.freeze({
        formatVersion: RECORD_FORMAT_VERSION,
        rulesVersion: RULES_VERSION,
        catalogVersion: CORE_CATALOG_ID,
        id,
        board: boardToHex(puzzle.board),
        shapes: Object.freeze([...puzzle.shapes]),
        provenance: Object.freeze({
            method: 'gameplay-derived',
            seed: provenance.seed,
            candidateAttempt: provenance.candidateAttempt,
            simulationBatches: provenance.simulationBatches,
            simulationHistory: Object.freeze(
                (provenance.simulationHistory || []).map(serializeSimulationStep),
            ),
            traySearchWidth: provenance.traySearchWidth,
            selectedTrayDraw: provenance.selectedTrayDraw,
        }),
        solution: Object.freeze(witness.map(serializeStep)),
        difficulty: serializeDifficulty(difficulty),
    });

    // Apply the same strict validation used for records loaded from disk.
    deserializePuzzleRecord(record);
    return record;
}

function assertVersions(record) {
    if (record.formatVersion !== RECORD_FORMAT_VERSION) {
        throw new RangeError(`Unsupported puzzle record format: ${record.formatVersion}`);
    }
    if (record.rulesVersion !== RULES_VERSION) {
        throw new RangeError(`Unsupported rules version: ${record.rulesVersion}`);
    }
    if (record.catalogVersion !== CORE_CATALOG_ID) {
        throw new RangeError(`Unsupported catalog version: ${record.catalogVersion}`);
    }
}

function replayStep(serialized, currentBoard, shapes, usedShapeIndices) {
    requireObject(serialized, 'solution step');
    const shapeIndex = requireInteger(serialized.shapeIndex, 'shapeIndex');
    if (shapeIndex > 2 || usedShapeIndices.has(shapeIndex)) {
        throw new RangeError('Solution must use each tray index exactly once');
    }
    if (serialized.shapeId !== shapes[shapeIndex]) {
        throw new RangeError('Solution shape does not match its tray index');
    }
    const row = requireInteger(serialized.row, 'row');
    const column = requireInteger(serialized.column, 'column');
    const boardBefore = boardFromHex(serialized.boardBefore);
    const placedBoard = boardFromHex(serialized.placedBoard);
    const boardAfter = boardFromHex(serialized.boardAfter);
    const clearedMask = boardFromHex(serialized.clearedMask);
    const clearedRows = requireIntegerArray(serialized.clearedRows, 'clearedRows');
    const clearedColumns = requireIntegerArray(serialized.clearedColumns, 'clearedColumns');
    if (boardBefore !== currentBoard) throw new RangeError('Solution boardBefore does not match replay');

    const transition = applyPlacement(currentBoard, getPlacement(serialized.shapeId, row, column));
    if (transition.placedBoard !== placedBoard
        || transition.boardAfter !== boardAfter
        || transition.clearedMask !== clearedMask
        || !equalArrays(transition.clearedRows, clearedRows)
        || !equalArrays(transition.clearedColumns, clearedColumns)) {
        throw new RangeError('Solution transition does not match rule-engine replay');
    }
    usedShapeIndices.add(shapeIndex);
    return Object.freeze({
        shapeIndex,
        shapeId: serialized.shapeId,
        row,
        column,
        boardBefore,
        placedBoard,
        boardAfter,
        clearedRows,
        clearedColumns,
        clearedMask,
    });
}

function validateProvenance(value) {
    const provenance = requireObject(value, 'provenance');
    if (provenance.method !== 'gameplay-derived') {
        throw new RangeError('Unsupported generation provenance method');
    }
    validateSeed(provenance.seed);
    requireInteger(provenance.candidateAttempt, 'provenance.candidateAttempt', 1);
    const simulationBatches = requireInteger(
        provenance.simulationBatches,
        'provenance.simulationBatches',
        1,
    );
    if (!Array.isArray(provenance.simulationHistory)
        || provenance.simulationHistory.length !== simulationBatches * 3) {
        throw new RangeError('Simulation history must contain three steps per batch');
    }
    const hasSearchWidth = provenance.traySearchWidth !== undefined;
    const hasSelectedDraw = provenance.selectedTrayDraw !== undefined;
    if (hasSearchWidth !== hasSelectedDraw) {
        throw new RangeError('Advanced provenance requires both tray search fields');
    }
    if (hasSearchWidth) {
        requireInteger(provenance.traySearchWidth, 'provenance.traySearchWidth', 1);
        requireInteger(provenance.selectedTrayDraw, 'provenance.selectedTrayDraw');
        if (provenance.selectedTrayDraw >= provenance.traySearchWidth) {
            throw new RangeError('Selected tray draw must be within tray search width');
        }
    }
    return provenance;
}

function replaySimulationHistory(provenance, expectedBoard) {
    let currentBoard = EMPTY_BOARD;
    const history = [];
    for (let batchIndex = 0; batchIndex < provenance.simulationBatches; batchIndex++) {
        const batchSteps = provenance.simulationHistory.slice(batchIndex * 3, batchIndex * 3 + 3);
        const batchShapes = Array(3);
        batchSteps.forEach(step => {
            requireObject(step, 'simulation step');
            if (step.batchIndex !== batchIndex) {
                throw new RangeError('Simulation history batch index does not match its position');
            }
            const shapeIndex = requireInteger(step.shapeIndex, 'simulation shapeIndex');
            if (shapeIndex > 2 || batchShapes[shapeIndex] !== undefined) {
                throw new RangeError('Each simulation batch must use each tray index exactly once');
            }
            batchShapes[shapeIndex] = step.shapeId;
        });
        const usedShapeIndices = new Set();
        batchSteps.forEach(step => {
            const replayed = replayStep(step, currentBoard, batchShapes, usedShapeIndices);
            currentBoard = replayed.boardAfter;
            history.push(Object.freeze({ ...replayed, batchIndex }));
        });
    }
    if (currentBoard !== expectedBoard) {
        throw new RangeError('Simulation history does not produce the puzzle board');
    }
    return Object.freeze(history);
}

export function deserializePuzzleRecord(value) {
    const record = requireObject(value, 'puzzle record');
    assertVersions(record);
    if (typeof record.id !== 'string' || record.id.length === 0) throw new TypeError('Puzzle id is required');
    const board = boardFromHex(record.board);
    assertStableInitialBoard(board);
    if (!Array.isArray(record.shapes) || record.shapes.length !== 3) {
        throw new RangeError('Puzzle record must contain exactly three shapes');
    }
    const shapes = Object.freeze(record.shapes.map(shapeId => {
        if (typeof shapeId !== 'string') throw new TypeError('Shape identifiers must be strings');
        getShape(shapeId);
        return shapeId;
    }));
    const provenance = validateProvenance(record.provenance);
    const simulationHistory = replaySimulationHistory(provenance, board);
    if (!Array.isArray(record.solution) || record.solution.length !== 3) {
        throw new RangeError('Puzzle record must contain exactly three solution steps');
    }

    let currentBoard = board;
    const usedShapeIndices = new Set();
    const witness = record.solution.map(step => {
        const replayed = replayStep(step, currentBoard, shapes, usedShapeIndices);
        currentBoard = replayed.boardAfter;
        return replayed;
    });
    if (usedShapeIndices.size !== 3) throw new RangeError('Solution must use all tray indices');

    let difficulty = null;
    if (record.difficulty !== undefined) {
        const storedDifficulty = requireObject(record.difficulty, 'difficulty');
        if (storedDifficulty.modelVersion !== DIFFICULTY_MODEL_VERSION) {
            throw new RangeError(`Unsupported difficulty model: ${storedDifficulty.modelVersion}`);
        }
        const expectedDifficulty = evaluateDifficulty({ board, shapes });
        if (!equalJson(storedDifficulty, expectedDifficulty)) {
            throw new RangeError('Difficulty metadata does not match recomputation');
        }
        difficulty = expectedDifficulty;
    }

    return Object.freeze({
        id: record.id,
        puzzle: Object.freeze({ board, shapes }),
        witness: Object.freeze(witness),
        difficulty,
        provenance: Object.freeze({
            method: provenance.method,
            seed: provenance.seed,
            candidateAttempt: provenance.candidateAttempt,
            simulationBatches: provenance.simulationBatches,
            simulationHistory,
            traySearchWidth: provenance.traySearchWidth ?? null,
            selectedTrayDraw: provenance.selectedTrayDraw ?? null,
        }),
    });
}

export function createCollectionEnvelope({ config, statistics, puzzles }) {
    if (!Array.isArray(puzzles)) throw new TypeError('puzzles must be an array');
    return Object.freeze({
        formatVersion: COLLECTION_FORMAT_VERSION,
        rulesVersion: RULES_VERSION,
        catalogVersion: CORE_CATALOG_ID,
        config: Object.freeze({ ...config }),
        statistics: Object.freeze({ ...statistics }),
        puzzles: Object.freeze([...puzzles]),
    });
}

export function deserializeCollectionEnvelope(value) {
    const envelope = requireObject(value, 'collection envelope');
    if (envelope.formatVersion !== COLLECTION_FORMAT_VERSION
        || envelope.rulesVersion !== RULES_VERSION
        || envelope.catalogVersion !== CORE_CATALOG_ID) {
        throw new RangeError('Unsupported collection version');
    }
    const config = validateGenerationConfig(requireObject(envelope.config, 'collection config'));
    const statistics = requireObject(envelope.statistics, 'collection statistics');
    requireInteger(statistics.requestedCount, 'statistics.requestedCount', 1);
    requireInteger(statistics.acceptedCount, 'statistics.acceptedCount');
    requireInteger(statistics.candidateAttempts, 'statistics.candidateAttempts');
    requireInteger(statistics.unsolvableRejections, 'statistics.unsolvableRejections');
    requireInteger(statistics.simulationFailures, 'statistics.simulationFailures');
    const qualityRejections = statistics.qualityRejections ?? 0;
    const difficultyRejections = statistics.difficultyRejections ?? 0;
    const exactDuplicateRejections = statistics.exactDuplicateRejections ?? 0;
    const nearDuplicateRejections = statistics.nearDuplicateRejections ?? 0;
    const mechanismRejections = statistics.mechanismRejections ?? 0;
    const hasAdvancedWorkload = statistics.trayEvaluations !== undefined
        || statistics.solvableTrayEvaluations !== undefined;
    if ((statistics.trayEvaluations !== undefined)
        !== (statistics.solvableTrayEvaluations !== undefined)) {
        throw new RangeError('Collection must provide both tray workload statistics');
    }
    const trayEvaluations = statistics.trayEvaluations
        ?? statistics.candidateAttempts - statistics.simulationFailures;
    const solvableTrayEvaluations = statistics.solvableTrayEvaluations
        ?? trayEvaluations - statistics.unsolvableRejections;
    requireInteger(qualityRejections, 'statistics.qualityRejections');
    requireInteger(difficultyRejections, 'statistics.difficultyRejections');
    requireInteger(exactDuplicateRejections, 'statistics.exactDuplicateRejections');
    requireInteger(nearDuplicateRejections, 'statistics.nearDuplicateRejections');
    requireInteger(mechanismRejections, 'statistics.mechanismRejections');
    requireInteger(trayEvaluations, 'statistics.trayEvaluations');
    requireInteger(solvableTrayEvaluations, 'statistics.solvableTrayEvaluations');
    if (!Array.isArray(envelope.puzzles)) throw new TypeError('Collection puzzles must be an array');
    const puzzles = envelope.puzzles.map(record => {
        if (record.rulesVersion !== envelope.rulesVersion
            || record.catalogVersion !== envelope.catalogVersion) {
            throw new RangeError('Puzzle version does not agree with collection version');
        }
        if (record.provenance.traySearchWidth !== undefined
            && record.provenance.traySearchWidth !== config.traySearchWidth) {
            throw new RangeError('Puzzle tray search provenance disagrees with collection config');
        }
        return deserializePuzzleRecord(record);
    });
    if (statistics.acceptedCount !== envelope.puzzles.length
        || statistics.requestedCount !== config.count
        || statistics.acceptedCount > statistics.requestedCount
        || statistics.candidateAttempts > config.maxCandidateAttempts
        || statistics.candidateAttempts
            !== statistics.acceptedCount
                + statistics.unsolvableRejections
                + statistics.simulationFailures
                + qualityRejections
                + difficultyRejections
                + exactDuplicateRejections
                + nearDuplicateRejections
                + mechanismRejections) {
        throw new RangeError('Collection statistics are inconsistent');
    }
    const expectedTrayEvaluations = (
        statistics.candidateAttempts - statistics.simulationFailures
    ) * config.traySearchWidth;
    if (solvableTrayEvaluations > trayEvaluations
        || (hasAdvancedWorkload && trayEvaluations !== expectedTrayEvaluations)
        || (!hasAdvancedWorkload && trayEvaluations > expectedTrayEvaluations)) {
        throw new RangeError('Collection tray workload statistics are inconsistent');
    }
    return Object.freeze({
        config,
        statistics: Object.freeze({
            ...statistics,
            qualityRejections,
            difficultyRejections,
            exactDuplicateRejections,
            nearDuplicateRejections,
            mechanismRejections,
            trayEvaluations,
            solvableTrayEvaluations,
        }),
        puzzles: Object.freeze(puzzles),
    });
}
