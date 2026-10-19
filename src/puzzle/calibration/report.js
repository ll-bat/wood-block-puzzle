import { DIFFICULTY_MODEL_VERSION, DIFFICULTY_TIERS } from '../difficulty';
import { validatePlayerOutcomes } from './outcomes';

function emptyAccumulator() {
    return {
        sampleCount: 0,
        completedCount: 0,
        acceptedMoves: 0,
        invalidAttempts: 0,
        hints: 0,
        duration: 0,
        durationSampleCount: 0,
    };
}

function add(accumulator, outcome) {
    accumulator.sampleCount++;
    if (outcome.completed) accumulator.completedCount++;
    accumulator.acceptedMoves += outcome.acceptedMoveCount;
    accumulator.invalidAttempts += outcome.invalidAttemptCount;
    accumulator.hints += outcome.hintsUsed;
    if (outcome.durationSeconds !== null) {
        accumulator.duration += outcome.durationSeconds;
        accumulator.durationSampleCount++;
    }
}

function summarize(accumulator) {
    const count = accumulator.sampleCount;
    return Object.freeze({
        sampleCount: count,
        completedCount: accumulator.completedCount,
        completionRateBasisPoints: count === 0
            ? null : Math.round(accumulator.completedCount * 10000 / count),
        averageAcceptedMovesHundredths: count === 0
            ? null : Math.round(accumulator.acceptedMoves * 100 / count),
        averageInvalidAttemptsHundredths: count === 0
            ? null : Math.round(accumulator.invalidAttempts * 100 / count),
        averageHintsHundredths: count === 0
            ? null : Math.round(accumulator.hints * 100 / count),
        durationSampleCount: accumulator.durationSampleCount,
        averageDurationSecondsHundredths: accumulator.durationSampleCount === 0
            ? null
            : Math.round(accumulator.duration * 100 / accumulator.durationSampleCount),
    });
}

export function analyzePlayerOutcomes(values) {
    const outcomes = validatePlayerOutcomes(values);
    const overall = emptyAccumulator();
    const tierAccumulators = Object.fromEntries(
        DIFFICULTY_TIERS.map(tier => [tier, emptyAccumulator()]),
    );
    const scoreAccumulators = new Map();
    outcomes.forEach(outcome => {
        add(overall, outcome);
        add(tierAccumulators[outcome.predictedTier], outcome);
        if (!scoreAccumulators.has(outcome.predictedScore)) {
            scoreAccumulators.set(outcome.predictedScore, emptyAccumulator());
        }
        add(scoreAccumulators.get(outcome.predictedScore), outcome);
    });
    const byTier = Object.freeze(Object.fromEntries(
        DIFFICULTY_TIERS.map(tier => [tier, summarize(tierAccumulators[tier])]),
    ));
    const byScore = Object.freeze([...scoreAccumulators.entries()]
        .sort(([left], [right]) => left - right)
        .map(([score, accumulator]) => Object.freeze({ score, ...summarize(accumulator) })));
    const orderingViolations = [];
    [['easy', 'medium'], ['medium', 'hard']].forEach(([easier, harder]) => {
        const easierRate = byTier[easier].completionRateBasisPoints;
        const harderRate = byTier[harder].completionRateBasisPoints;
        if (easierRate !== null && harderRate !== null && harderRate > easierRate) {
            orderingViolations.push(`${easier}>${harder}`);
        }
    });
    return Object.freeze({
        formatVersion: 1,
        sourceModel: DIFFICULTY_MODEL_VERSION,
        overall: summarize(overall),
        byTier,
        byScore,
        orderingViolations: Object.freeze(orderingViolations),
    });
}
