import {
    DIFFICULTY_MODEL_VERSION,
    DIFFICULTY_TIERS,
    tierForCasualScore,
} from '../difficulty';

export const OUTCOME_FORMAT_VERSION = 1;

const ALLOWED_FIELDS = new Set([
    'formatVersion',
    'puzzleId',
    'modelVersion',
    'predictedScore',
    'predictedTier',
    'completed',
    'acceptedMoveCount',
    'invalidAttemptCount',
    'hintsUsed',
    'durationSeconds',
]);

function nonNegativeInteger(value, name) {
    if (!Number.isSafeInteger(value) || value < 0) {
        throw new RangeError(`${name} must be a non-negative safe integer`);
    }
    return value;
}

export function validatePlayerOutcome(value) {
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
        throw new TypeError('Player outcome must be an object');
    }
    const unknown = Object.keys(value).filter(key => !ALLOWED_FIELDS.has(key));
    if (unknown.length > 0) {
        throw new RangeError(`Player outcome contains unsupported fields: ${unknown.join(', ')}`);
    }
    if (value.formatVersion !== OUTCOME_FORMAT_VERSION) {
        throw new RangeError(`Unsupported outcome format: ${value.formatVersion}`);
    }
    if (typeof value.puzzleId !== 'string' || value.puzzleId.length === 0) {
        throw new TypeError('puzzleId must be a non-empty string');
    }
    if (value.modelVersion !== DIFFICULTY_MODEL_VERSION) {
        throw new RangeError(`Unsupported outcome difficulty model: ${value.modelVersion}`);
    }
    const predictedScore = nonNegativeInteger(value.predictedScore, 'predictedScore');
    if (!DIFFICULTY_TIERS.includes(value.predictedTier)
        || value.predictedTier !== tierForCasualScore(predictedScore)) {
        throw new RangeError('predictedTier does not match the declared model score');
    }
    if (typeof value.completed !== 'boolean') throw new TypeError('completed must be boolean');
    const acceptedMoveCount = nonNegativeInteger(value.acceptedMoveCount, 'acceptedMoveCount');
    if (acceptedMoveCount > 3 || value.completed !== (acceptedMoveCount === 3)) {
        throw new RangeError('acceptedMoveCount is inconsistent with completion');
    }
    const invalidAttemptCount = nonNegativeInteger(
        value.invalidAttemptCount,
        'invalidAttemptCount',
    );
    const hintsUsed = nonNegativeInteger(value.hintsUsed, 'hintsUsed');
    let durationSeconds = null;
    if (value.durationSeconds !== undefined && value.durationSeconds !== null) {
        if (typeof value.durationSeconds !== 'number'
            || !Number.isFinite(value.durationSeconds)
            || value.durationSeconds < 0) {
            throw new RangeError('durationSeconds must be a non-negative finite number');
        }
        durationSeconds = value.durationSeconds;
    }
    return Object.freeze({
        formatVersion: OUTCOME_FORMAT_VERSION,
        puzzleId: value.puzzleId,
        modelVersion: value.modelVersion,
        predictedScore,
        predictedTier: value.predictedTier,
        completed: value.completed,
        acceptedMoveCount,
        invalidAttemptCount,
        hintsUsed,
        durationSeconds,
    });
}

export function createPlayerOutcome({
    puzzleId,
    difficulty,
    completed,
    acceptedMoveCount,
    invalidAttemptCount = 0,
    hintsUsed = 0,
    durationSeconds = null,
}) {
    if (!difficulty || typeof difficulty !== 'object') {
        throw new TypeError('difficulty is required to create a player outcome');
    }
    return validatePlayerOutcome({
        formatVersion: OUTCOME_FORMAT_VERSION,
        puzzleId,
        modelVersion: difficulty.modelVersion,
        predictedScore: difficulty.score,
        predictedTier: difficulty.tier,
        completed,
        acceptedMoveCount,
        invalidAttemptCount,
        hintsUsed,
        durationSeconds,
    });
}

export function validatePlayerOutcomes(values) {
    if (!Array.isArray(values)) throw new TypeError('Player outcomes must be an array');
    return Object.freeze(values.map(validatePlayerOutcome));
}
