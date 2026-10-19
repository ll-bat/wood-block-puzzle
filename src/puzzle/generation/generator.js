import { findOneSolution } from '../solver';
import {
    evaluateDifficulty,
    matchesDifficultyTarget,
    matchesRequiredMechanisms,
} from '../difficulty';
import { PuzzleDiversityTracker, bitCount } from '../deduplication';
import { validateGenerationConfig } from './config';
import { createSeededRandom, sampleTray } from './random';
import { createCollectionEnvelope, createPuzzleRecord } from './records';
import { SimulationExhaustedError, simulateGameplayBoard } from './simulation';
import { fingerprintText } from './output';

function puzzleId(seed, candidateAttempt, puzzle) {
    const identity = `${puzzle.board.toString(16)}:${puzzle.shapes.join(',')}`;
    return `puz-${seed.toString(16).padStart(8, '0')}-${fingerprintText(identity)}-${String(candidateAttempt).padStart(6, '0')}`;
}

function snapshotStatistics(config, counts) {
    return Object.freeze({
        requestedCount: config.count,
        ...counts,
    });
}

export class GenerationExhaustedError extends Error {
    constructor(statistics) {
        super(`Generated ${statistics.acceptedCount} of ${statistics.requestedCount} puzzles after ${statistics.candidateAttempts} candidates`);
        this.name = 'GenerationExhaustedError';
        this.statistics = statistics;
    }
}

export function generatePuzzleCollection(inputConfig = {}, dependencies = {}) {
    const config = validateGenerationConfig(inputConfig);
    const random = (dependencies.createRandom || createSeededRandom)(config.seed);
    const simulateBoard = dependencies.simulateBoard || simulateGameplayBoard;
    const traySampler = dependencies.sampleTray || sampleTray;
    const solve = dependencies.solve || findOneSolution;
    const evaluate = dependencies.evaluateDifficulty || evaluateDifficulty;
    const diversity = dependencies.diversityTracker
        || new PuzzleDiversityTracker(config.nearDuplicateDistance);
    const records = [];
    let candidateAttempts = 0;
    let unsolvableRejections = 0;
    let simulationFailures = 0;
    let qualityRejections = 0;
    let difficultyRejections = 0;
    let exactDuplicateRejections = 0;
    let nearDuplicateRejections = 0;
    let mechanismRejections = 0;
    let trayEvaluations = 0;
    let solvableTrayEvaluations = 0;

    while (records.length < config.count && candidateAttempts < config.maxCandidateAttempts) {
        candidateAttempts++;
        let simulation;
        try {
            simulation = simulateBoard({
                random,
                batches: config.simulationBatches,
                maxBatchAttempts: config.maxBatchAttempts,
            });
        } catch (error) {
            if (!(error instanceof SimulationExhaustedError)) throw error;
            simulationFailures++;
            continue;
        }

        const pool = [];
        for (let trayDraw = 0; trayDraw < config.traySearchWidth; trayDraw++) {
            const shapes = traySampler(random);
            const puzzle = Object.freeze({ board: simulation.board, shapes });
            const solution = solve(puzzle);
            trayEvaluations++;
            if (!solution.solvable) continue;
            solvableTrayEvaluations++;
            pool.push({
                trayDraw,
                puzzle,
                solution,
                difficulty: evaluate(puzzle),
            });
        }
        if (pool.length === 0) {
            unsolvableRejections++;
            continue;
        }

        const occupiedCells = bitCount(simulation.board);
        const qualityEligible = pool.filter(({ difficulty }) => (
            occupiedCells >= config.minOccupiedCells
            && occupiedCells <= config.maxOccupiedCells
            && difficulty.metrics.legalFirstMoveCount >= config.minLegalFirstMoves
            && difficulty.metrics.legalFirstMoveCount <= config.maxLegalFirstMoves
        ));
        if (qualityEligible.length === 0) {
            qualityRejections++;
            continue;
        }
        const difficultyEligible = qualityEligible.filter(({ difficulty }) => (
            matchesDifficultyTarget(difficulty, config.difficultyTarget)
        ));
        if (difficultyEligible.length === 0) {
            difficultyRejections++;
            continue;
        }
        const mechanismEligible = difficultyEligible.filter(({ difficulty }) => (
            matchesRequiredMechanisms(difficulty, config.requiredMechanisms)
        ));
        if (mechanismEligible.length === 0) {
            mechanismRejections++;
            continue;
        }

        const classified = mechanismEligible.map(candidate => ({
            ...candidate,
            duplicateType: diversity.classify(candidate.puzzle),
        }));
        const nonExact = classified.filter(candidate => candidate.duplicateType !== 'exact');
        if (nonExact.length === 0) {
            exactDuplicateRejections++;
            continue;
        }
        const diversityEligible = nonExact.filter(candidate => candidate.duplicateType !== 'near');
        if (diversityEligible.length === 0) {
            nearDuplicateRejections++;
            continue;
        }

        const preferredScores = { any: 6, easy: 2, medium: 6, hard: 10 };
        const preferredScore = preferredScores[config.difficultyTarget];
        diversityEligible.sort((left, right) => {
            const leftNovelty = typeof diversity.nearestDistance === 'function'
                ? diversity.nearestDistance(left.puzzle) : Infinity;
            const rightNovelty = typeof diversity.nearestDistance === 'function'
                ? diversity.nearestDistance(right.puzzle) : Infinity;
            const comparableLeftNovelty = leftNovelty === Infinity ? 65 : leftNovelty;
            const comparableRightNovelty = rightNovelty === Infinity ? 65 : rightNovelty;
            if (comparableLeftNovelty !== comparableRightNovelty) {
                return comparableRightNovelty - comparableLeftNovelty;
            }
            const leftScoreDistance = Math.abs(left.difficulty.score - preferredScore);
            const rightScoreDistance = Math.abs(right.difficulty.score - preferredScore);
            return leftScoreDistance - rightScoreDistance || left.trayDraw - right.trayDraw;
        });
        const selected = diversityEligible[0];
        diversity.add(selected.puzzle);
        records.push(createPuzzleRecord({
            id: puzzleId(config.seed, candidateAttempts, selected.puzzle),
            puzzle: selected.puzzle,
            witness: selected.solution.witness,
            difficulty: selected.difficulty,
            provenance: {
                seed: config.seed,
                candidateAttempt: candidateAttempts,
                simulationBatches: config.simulationBatches,
                simulationHistory: simulation.history,
                traySearchWidth: config.traySearchWidth,
                selectedTrayDraw: selected.trayDraw,
            },
        }));
    }

    const statistics = snapshotStatistics(config, {
        acceptedCount: records.length,
        candidateAttempts,
        unsolvableRejections,
        simulationFailures,
        qualityRejections,
        difficultyRejections,
        exactDuplicateRejections,
        nearDuplicateRejections,
        mechanismRejections,
        trayEvaluations,
        solvableTrayEvaluations,
    });
    if (records.length < config.count) throw new GenerationExhaustedError(statistics);
    return createCollectionEnvelope({ config, statistics, puzzles: records });
}
