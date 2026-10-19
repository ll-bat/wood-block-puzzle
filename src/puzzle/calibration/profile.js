import { DIFFICULTY_MODEL_VERSION } from '../difficulty';
import { validatePlayerOutcomes } from './outcomes';

export const CALIBRATION_PROFILE_FORMAT_VERSION = 1;
export const CALIBRATION_PROFILE_MODEL = 'casual-thresholds-v1';

const DEFAULT_PROFILE_OPTIONS = Object.freeze({
    minimumTotalSamples: 30,
    minimumSamplesPerTier: 5,
    targetCompletionRateBasisPoints: Object.freeze({
        easy: 8000,
        medium: 5500,
        hard: 3000,
    }),
});

const PROFILE_FIELDS = Object.freeze([
    'formatVersion',
    'profileModel',
    'sourceModel',
    'profileId',
    'dataFingerprint',
    'sampleCount',
    'minimumTotalSamples',
    'minimumSamplesPerTier',
    'targetCompletionRateBasisPoints',
    'boundaries',
    'observedCompletionRateBasisPoints',
    'samplesByCalibratedTier',
    'loss',
]);
const TIER_FIELDS = Object.freeze(['easy', 'medium', 'hard']);
const BOUNDARY_FIELDS = Object.freeze(['easyMax', 'mediumMax']);

function requireExactFields(value, expectedFields, name) {
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
        throw new TypeError(`${name} must be an object`);
    }
    const actualFields = Object.keys(value).sort();
    const expected = [...expectedFields].sort();
    if (actualFields.length !== expected.length
        || actualFields.some((field, index) => field !== expected[index])) {
        throw new RangeError(`${name} fields do not match the supported format`);
    }
    return value;
}

function positiveInteger(value, name) {
    if (!Number.isSafeInteger(value) || value <= 0) {
        throw new RangeError(`${name} must be a positive safe integer`);
    }
    return value;
}

function validateRate(value, name) {
    if (!Number.isSafeInteger(value) || value < 0 || value > 10000) {
        throw new RangeError(`${name} must be an integer from 0 through 10000`);
    }
    return value;
}

function normalizeOptions(options = {}) {
    const merged = { ...DEFAULT_PROFILE_OPTIONS, ...options };
    const targets = {
        ...DEFAULT_PROFILE_OPTIONS.targetCompletionRateBasisPoints,
        ...(options.targetCompletionRateBasisPoints || {}),
    };
    const normalized = {
        minimumTotalSamples: positiveInteger(
            merged.minimumTotalSamples,
            'minimumTotalSamples',
        ),
        minimumSamplesPerTier: positiveInteger(
            merged.minimumSamplesPerTier,
            'minimumSamplesPerTier',
        ),
        targetCompletionRateBasisPoints: Object.freeze({
            easy: validateRate(targets.easy, 'target easy rate'),
            medium: validateRate(targets.medium, 'target medium rate'),
            hard: validateRate(targets.hard, 'target hard rate'),
        }),
    };
    if (!(normalized.targetCompletionRateBasisPoints.easy
        > normalized.targetCompletionRateBasisPoints.medium
        && normalized.targetCompletionRateBasisPoints.medium
            > normalized.targetCompletionRateBasisPoints.hard)) {
        throw new RangeError('Target completion rates must strictly decrease from easy to hard');
    }
    return Object.freeze(normalized);
}

function fingerprint(outcomes) {
    const normalized = outcomes.map(outcome => [
        outcome.puzzleId,
        outcome.predictedScore,
        outcome.completed ? 1 : 0,
        outcome.acceptedMoveCount,
        outcome.invalidAttemptCount,
        outcome.hintsUsed,
        outcome.durationSeconds,
    ]).sort((left, right) => {
        const leftText = JSON.stringify(left);
        const rightText = JSON.stringify(right);
        if (leftText < rightText) return -1;
        if (leftText > rightText) return 1;
        return 0;
    });
    const text = JSON.stringify(normalized);
    let hash = 0x811c9dc5;
    for (let index = 0; index < text.length; index++) {
        hash ^= text.charCodeAt(index);
        hash = Math.imul(hash, 0x01000193) >>> 0;
    }
    return hash.toString(16).padStart(8, '0');
}

function groupForScore(score, easyMax, mediumMax) {
    if (score <= easyMax) return 'easy';
    if (score <= mediumMax) return 'medium';
    return 'hard';
}

export function fitCalibrationProfile(values, options = {}) {
    const outcomes = validatePlayerOutcomes(values);
    const config = normalizeOptions(options);
    if (outcomes.length < config.minimumTotalSamples) {
        throw new RangeError('Insufficient total calibration samples');
    }
    const maximumScore = Math.max(...outcomes.map(outcome => outcome.predictedScore));
    if (maximumScore < 2) throw new RangeError('Calibration outcomes do not span three score groups');
    let best = null;
    for (let easyMax = 0; easyMax <= maximumScore - 2; easyMax++) {
        for (let mediumMax = easyMax + 1; mediumMax <= maximumScore - 1; mediumMax++) {
            const groups = {
                easy: { count: 0, completed: 0 },
                medium: { count: 0, completed: 0 },
                hard: { count: 0, completed: 0 },
            };
            outcomes.forEach(outcome => {
                const group = groups[groupForScore(outcome.predictedScore, easyMax, mediumMax)];
                group.count++;
                if (outcome.completed) group.completed++;
            });
            if (Object.values(groups).some(group => (
                group.count < config.minimumSamplesPerTier
            ))) continue;
            const rates = Object.fromEntries(Object.entries(groups).map(([tier, group]) => [
                tier,
                Math.round(group.completed * 10000 / group.count),
            ]));
            const loss = Object.keys(groups).reduce((total, tier) => {
                const difference = rates[tier]
                    - config.targetCompletionRateBasisPoints[tier];
                return total + difference * difference;
            }, 0);
            if (!best || loss < best.loss) best = { easyMax, mediumMax, groups, rates, loss };
        }
    }
    if (!best) throw new RangeError('Insufficient per-tier calibration samples');
    const dataFingerprint = fingerprint(outcomes);
    return Object.freeze({
        formatVersion: CALIBRATION_PROFILE_FORMAT_VERSION,
        profileModel: CALIBRATION_PROFILE_MODEL,
        sourceModel: DIFFICULTY_MODEL_VERSION,
        profileId: `calibration-${dataFingerprint}`,
        dataFingerprint,
        sampleCount: outcomes.length,
        minimumTotalSamples: config.minimumTotalSamples,
        minimumSamplesPerTier: config.minimumSamplesPerTier,
        targetCompletionRateBasisPoints: config.targetCompletionRateBasisPoints,
        boundaries: Object.freeze({ easyMax: best.easyMax, mediumMax: best.mediumMax }),
        observedCompletionRateBasisPoints: Object.freeze({ ...best.rates }),
        samplesByCalibratedTier: Object.freeze(Object.fromEntries(
            Object.entries(best.groups).map(([tier, group]) => [tier, group.count]),
        )),
        loss: best.loss,
    });
}

export function validateCalibrationProfile(profile) {
    requireExactFields(profile, PROFILE_FIELDS, 'Calibration profile');
    if (profile.formatVersion !== CALIBRATION_PROFILE_FORMAT_VERSION
        || profile.profileModel !== CALIBRATION_PROFILE_MODEL
        || profile.sourceModel !== DIFFICULTY_MODEL_VERSION) {
        throw new RangeError('Unsupported calibration profile');
    }
    const sampleCount = positiveInteger(profile.sampleCount, 'profile sampleCount');
    const minimumTotalSamples = positiveInteger(
        profile.minimumTotalSamples,
        'profile minimumTotalSamples',
    );
    const minimumSamplesPerTier = positiveInteger(
        profile.minimumSamplesPerTier,
        'profile minimumSamplesPerTier',
    );
    if (sampleCount < minimumTotalSamples) {
        throw new RangeError('Calibration profile does not satisfy its total sample minimum');
    }
    if (typeof profile.dataFingerprint !== 'string' || !/^[0-9a-f]{8}$/.test(profile.dataFingerprint)
        || profile.profileId !== `calibration-${profile.dataFingerprint}`) {
        throw new RangeError('Invalid calibration profile fingerprint');
    }
    const boundaries = requireExactFields(
        profile.boundaries,
        BOUNDARY_FIELDS,
        'Calibration profile boundaries',
    );
    if (!Number.isSafeInteger(boundaries.easyMax)
        || !Number.isSafeInteger(profile.boundaries.mediumMax)
        || profile.boundaries.easyMax < 0
        || profile.boundaries.mediumMax <= profile.boundaries.easyMax) {
        throw new RangeError('Invalid calibration profile boundaries');
    }
    const targets = requireExactFields(
        profile.targetCompletionRateBasisPoints,
        TIER_FIELDS,
        'Calibration profile targets',
    );
    validateRate(targets.easy, 'profile target easy rate');
    validateRate(targets.medium, 'profile target medium rate');
    validateRate(targets.hard, 'profile target hard rate');
    if (!(targets.easy > targets.medium && targets.medium > targets.hard)) {
        throw new RangeError('Calibration profile targets must decrease by tier');
    }
    const samplesByTier = requireExactFields(
        profile.samplesByCalibratedTier,
        TIER_FIELDS,
        'Calibration profile tier samples',
    );
    const tierSampleTotal = TIER_FIELDS.reduce((total, tier) => {
        const count = positiveInteger(
            samplesByTier[tier],
            `profile ${tier} samples`,
        );
        if (count < minimumSamplesPerTier) {
            throw new RangeError('Calibration profile does not satisfy its per-tier sample minimum');
        }
        return total + count;
    }, 0);
    if (tierSampleTotal !== profile.sampleCount) {
        throw new RangeError('Calibration profile sample counts are inconsistent');
    }
    const observedRates = requireExactFields(
        profile.observedCompletionRateBasisPoints,
        TIER_FIELDS,
        'Calibration profile observed rates',
    );
    TIER_FIELDS.forEach(tier => validateRate(
        observedRates[tier],
        `profile observed ${tier} rate`,
    ));
    if (!Number.isSafeInteger(profile.loss) || profile.loss < 0) {
        throw new RangeError('Calibration profile loss must be a non-negative safe integer');
    }
    const expectedLoss = TIER_FIELDS.reduce((total, tier) => {
        const difference = observedRates[tier] - targets[tier];
        return total + difference * difference;
    }, 0);
    if (profile.loss !== expectedLoss) {
        throw new RangeError('Calibration profile loss is inconsistent with its rates');
    }
    return profile;
}

export function classifyScoreWithProfile(score, profile) {
    if (!Number.isSafeInteger(score) || score < 0) {
        throw new RangeError('score must be a non-negative safe integer');
    }
    validateCalibrationProfile(profile);
    return groupForScore(score, profile.boundaries.easyMax, profile.boundaries.mediumMax);
}
