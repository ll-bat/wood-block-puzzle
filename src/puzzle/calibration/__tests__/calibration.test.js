import { describe, expect, it } from 'vitest';
import {
    analyzePlayerOutcomes,
    classifyScoreWithProfile,
    createPlayerOutcome,
    fitCalibrationProfile,
    tierForCasualScore,
    validateCalibrationProfile,
    validatePlayerOutcome,
    validatePlayerOutcomes,
} from '../../index';

function outcome(score, completed, index, overrides = {}) {
    return {
        formatVersion: 1,
        puzzleId: `puzzle-${score}-${index}`,
        modelVersion: 'casual-v1',
        predictedScore: score,
        predictedTier: tierForCasualScore(score),
        completed,
        acceptedMoveCount: completed ? 3 : 2,
        invalidAttemptCount: index % 3,
        hintsUsed: index % 2,
        durationSeconds: 20 + index,
        ...overrides,
    };
}

function calibrationDataset() {
    return [
        ...Array.from({ length: 20 }, (_, index) => outcome(1, index < 16, index)),
        ...Array.from({ length: 20 }, (_, index) => outcome(5, index < 11, index)),
        ...Array.from({ length: 20 }, (_, index) => outcome(10, index < 6, index)),
    ];
}

describe('anonymous player outcomes', () => {
    it('validates and snapshots a minimal anonymous observation', () => {
        const source = outcome(5, true, 1);
        const validated = validatePlayerOutcome(source);
        source.puzzleId = 'changed';
        expect(validated.puzzleId).toBe('puzzle-5-1');
        expect(Object.isFrozen(validated)).toBe(true);
    });

    it.each([
        [{ ...outcome(5, true, 1), predictedTier: 'easy' }, /does not match/],
        [{ ...outcome(5, true, 1), modelVersion: 'future' }, /Unsupported/],
        [{ ...outcome(5, true, 1), acceptedMoveCount: 2 }, /inconsistent/],
        [{ ...outcome(5, true, 1), playerId: 'private' }, /unsupported fields/],
        [{ ...outcome(5, true, 1), durationSeconds: -1 }, /non-negative/],
    ])('rejects invalid or identifying outcome data', (value, message) => {
        expect(() => validatePlayerOutcome(value)).toThrow(message);
    });

    it('validates complete arrays without changing their ordering', () => {
        const values = [outcome(0, false, 0), outcome(8, true, 1)];
        expect(validatePlayerOutcomes(values).map(item => item.puzzleId))
            .toEqual(values.map(item => item.puzzleId));
    });

    it('creates prediction-consistent outcomes from puzzle difficulty metadata', () => {
        expect(createPlayerOutcome({
            puzzleId: 'generated-1',
            difficulty: { modelVersion: 'casual-v1', score: 8, tier: 'hard' },
            completed: true,
            acceptedMoveCount: 3,
        })).toMatchObject({
            predictedScore: 8,
            predictedTier: 'hard',
            invalidAttemptCount: 0,
        });
    });
});

describe('deterministic calibration reports', () => {
    it('aggregates every outcome overall, by tier, and by score', () => {
        const values = [
            outcome(1, true, 0),
            outcome(1, false, 1),
            outcome(5, true, 2),
            outcome(10, false, 3, { durationSeconds: null }),
        ];
        const report = analyzePlayerOutcomes(values);
        expect(report.overall).toMatchObject({
            sampleCount: 4,
            completedCount: 2,
            completionRateBasisPoints: 5000,
            durationSampleCount: 3,
        });
        expect(report.byTier.easy.sampleCount).toBe(2);
        expect(report.byTier.medium.sampleCount).toBe(1);
        expect(report.byTier.hard.sampleCount).toBe(1);
        expect(report.byScore.map(group => group.score)).toEqual([1, 5, 10]);
    });

    it('retains empty tier groups and identifies adjacent inversions', () => {
        const report = analyzePlayerOutcomes([
            outcome(1, false, 0),
            outcome(5, true, 1),
        ]);
        expect(report.byTier.hard.completionRateBasisPoints).toBe(null);
        expect(report.orderingViolations).toEqual(['easy>medium']);
        expect(report).toEqual(analyzePlayerOutcomes([
            outcome(1, false, 0),
            outcome(5, true, 1),
        ]));
    });
});

describe('threshold calibration profiles', () => {
    it('fits deterministic boundaries, fingerprint, rates, and loss', () => {
        const values = calibrationDataset();
        const options = {
            minimumTotalSamples: 30,
            minimumSamplesPerTier: 5,
            targetCompletionRateBasisPoints: { easy: 8000, medium: 5500, hard: 3000 },
        };
        const first = fitCalibrationProfile(values, options);
        const reversed = fitCalibrationProfile([...values].reverse(), options);
        expect(first).toEqual(reversed);
        expect(first.boundaries).toEqual({ easyMax: 1, mediumMax: 5 });
        expect(first.observedCompletionRateBasisPoints)
            .toEqual({ easy: 8000, medium: 5500, hard: 3000 });
        expect(first.loss).toBe(0);
        expect(validateCalibrationProfile(first)).toBe(first);
    });

    it('rejects sparse or non-spanning calibration data', () => {
        expect(() => fitCalibrationProfile(calibrationDataset().slice(0, 10)))
            .toThrow(/Insufficient total/);
        expect(() => fitCalibrationProfile(
            Array.from({ length: 30 }, (_, index) => outcome(1, index < 20, index)),
        )).toThrow(/span three/);
    });

    it('classifies exact boundaries and rejects tampered profiles', () => {
        const profile = fitCalibrationProfile(calibrationDataset());
        expect(classifyScoreWithProfile(profile.boundaries.easyMax, profile)).toBe('easy');
        expect(classifyScoreWithProfile(profile.boundaries.easyMax + 1, profile)).toBe('medium');
        expect(classifyScoreWithProfile(profile.boundaries.mediumMax, profile)).toBe('medium');
        expect(classifyScoreWithProfile(profile.boundaries.mediumMax + 1, profile)).toBe('hard');
        expect(() => validateCalibrationProfile({
            ...profile,
            boundaries: { easyMax: 7, mediumMax: 2 },
        })).toThrow(/boundaries/);
        expect(() => classifyScoreWithProfile(-1, profile)).toThrow(/non-negative/);
    });

    it.each([
        [profile => ({ ...profile, extra: true }), /fields/],
        [profile => ({
            ...profile,
            targetCompletionRateBasisPoints: {
                ...profile.targetCompletionRateBasisPoints,
                future: 1,
            },
        }), /fields/],
        [profile => ({ ...profile, minimumTotalSamples: profile.sampleCount + 1 }), /total sample/],
        [profile => ({ ...profile, minimumSamplesPerTier: 21 }), /per-tier sample/],
        [profile => ({ ...profile, loss: profile.loss + 1 }), /loss is inconsistent/],
    ])('rejects internally inconsistent profile artifacts', (tamper, message) => {
        const profile = fitCalibrationProfile(calibrationDataset());
        expect(() => validateCalibrationProfile(tamper(profile))).toThrow(message);
    });
});
