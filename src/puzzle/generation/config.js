import { validateSeed } from './random';
import { validateDifficultyTarget, validateRequiredMechanisms } from '../difficulty';

export const DEFAULT_GENERATION_CONFIG = Object.freeze({
    count: 10,
    seed: 1,
    simulationBatches: 6,
    maxBatchAttempts: 50,
    maxCandidateAttempts: 1000,
    difficultyTarget: 'any',
    nearDuplicateDistance: 0,
    minOccupiedCells: 0,
    maxOccupiedCells: 63,
    minLegalFirstMoves: 1,
    maxLegalFirstMoves: 1000,
    traySearchWidth: 1,
    requiredMechanisms: Object.freeze([]),
});

function positiveInteger(value, name) {
    if (!Number.isSafeInteger(value) || value <= 0) {
        throw new RangeError(`${name} must be a positive safe integer`);
    }
    return value;
}

function nonNegativeInteger(value, name, maximum = Number.MAX_SAFE_INTEGER) {
    if (!Number.isSafeInteger(value) || value < 0 || value > maximum) {
        throw new RangeError(`${name} must be an integer from 0 through ${maximum}`);
    }
    return value;
}

export function validateGenerationConfig(config = {}) {
    if (!config || typeof config !== 'object' || Array.isArray(config)) {
        throw new TypeError('Generation config must be an object');
    }
    const merged = { ...DEFAULT_GENERATION_CONFIG, ...config };
    const validated = {
        count: positiveInteger(merged.count, 'count'),
        seed: validateSeed(merged.seed),
        simulationBatches: positiveInteger(merged.simulationBatches, 'simulationBatches'),
        maxBatchAttempts: positiveInteger(merged.maxBatchAttempts, 'maxBatchAttempts'),
        maxCandidateAttempts: positiveInteger(merged.maxCandidateAttempts, 'maxCandidateAttempts'),
        difficultyTarget: validateDifficultyTarget(merged.difficultyTarget),
        nearDuplicateDistance: nonNegativeInteger(
            merged.nearDuplicateDistance,
            'nearDuplicateDistance',
            64,
        ),
        minOccupiedCells: nonNegativeInteger(merged.minOccupiedCells, 'minOccupiedCells', 63),
        maxOccupiedCells: nonNegativeInteger(merged.maxOccupiedCells, 'maxOccupiedCells', 63),
        minLegalFirstMoves: nonNegativeInteger(merged.minLegalFirstMoves, 'minLegalFirstMoves'),
        maxLegalFirstMoves: nonNegativeInteger(merged.maxLegalFirstMoves, 'maxLegalFirstMoves'),
        traySearchWidth: positiveInteger(merged.traySearchWidth, 'traySearchWidth'),
        requiredMechanisms: validateRequiredMechanisms(merged.requiredMechanisms),
    };
    if (validated.minOccupiedCells > validated.maxOccupiedCells) {
        throw new RangeError('minOccupiedCells cannot exceed maxOccupiedCells');
    }
    if (validated.minLegalFirstMoves > validated.maxLegalFirstMoves) {
        throw new RangeError('minLegalFirstMoves cannot exceed maxLegalFirstMoves');
    }
    return Object.freeze(validated);
}
