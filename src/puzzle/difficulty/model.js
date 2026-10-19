import { extractDifficultyFeatures } from './features';

export const DIFFICULTY_MODEL_VERSION = 'casual-v1';
export const DIFFICULTY_TIERS = Object.freeze(['easy', 'medium', 'hard']);
export const DIFFICULTY_TARGETS = Object.freeze(['any', ...DIFFICULTY_TIERS]);

function scoreFeatures(metrics) {
    let score = 0;
    const reasons = [];
    const add = (points, reason) => {
        score += points;
        reasons.push(reason);
    };

    const ratio = metrics.winningFirstMoveRatioBasisPoints;
    if (ratio <= 1000) add(4, 'VERY_FEW_WINNING_FIRST_MOVES');
    else if (ratio <= 2500) add(3, 'FEW_WINNING_FIRST_MOVES');
    else if (ratio <= 5000) add(2, 'MINORITY_WINNING_FIRST_MOVES');
    else if (ratio < 10000) add(1, 'SOME_LOSING_FIRST_MOVES');

    if (metrics.distinctShapeOrderCount > 1) {
        if (metrics.viableShapeOrderCount === 1) add(2, 'SINGLE_VIABLE_ORDER');
        else if (metrics.viableShapeOrderCount < metrics.distinctShapeOrderCount) {
            add(1, 'RESTRICTED_SHAPE_ORDER');
        }
    }
    if (metrics.minimumClearedLineCount > 0) add(2, 'CLEAR_REQUIRED');
    if (metrics.initiallyBlockedShapeCount > 0) add(2, 'SHAPE_INITIALLY_BLOCKED');
    if (metrics.delayedLosingFirstMoveCount > 0) add(1, 'DELAYED_FAILURES');
    if (metrics.misleadingHeuristicBestMoveCount > 0) add(2, 'MISLEADING_BEST_MOVE');
    if (metrics.legalFirstMoveCount <= 3 && score > 0) {
        score--;
        reasons.push('LOW_CHOICE_OBVIOUSNESS_REDUCTION');
    }
    return { score, reasons: Object.freeze(reasons) };
}

export function tierForCasualScore(score) {
    if (!Number.isSafeInteger(score) || score < 0) {
        throw new RangeError('Difficulty score must be a non-negative safe integer');
    }
    if (score <= 3) return 'easy';
    if (score <= 7) return 'medium';
    return 'hard';
}

export function evaluateDifficulty(puzzle) {
    const metrics = extractDifficultyFeatures(puzzle);
    const scored = scoreFeatures(metrics);
    return Object.freeze({
        modelVersion: DIFFICULTY_MODEL_VERSION,
        score: scored.score,
        tier: tierForCasualScore(scored.score),
        reasons: scored.reasons,
        metrics,
    });
}

export function validateDifficultyTarget(target) {
    if (!DIFFICULTY_TARGETS.includes(target)) {
        throw new RangeError(`difficultyTarget must be one of: ${DIFFICULTY_TARGETS.join(', ')}`);
    }
    return target;
}

export function matchesDifficultyTarget(difficulty, target) {
    validateDifficultyTarget(target);
    return target === 'any' || difficulty.tier === target;
}
