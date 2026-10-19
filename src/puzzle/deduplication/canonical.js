import { validateBoard } from '../core';
import { SQUARE_SYMMETRIES, transformPuzzle } from './symmetry';

function sortedTray(shapes) {
    return [...shapes].sort();
}

function representation(puzzle) {
    validateBoard(puzzle.board);
    const boardHex = puzzle.board.toString(16).padStart(16, '0');
    return `${boardHex}|${sortedTray(puzzle.shapes).join(',')}`;
}

export function puzzleSymmetryVariants(puzzle) {
    return Object.freeze(SQUARE_SYMMETRIES.map(symmetry => {
        const transformed = transformPuzzle(puzzle, symmetry);
        return Object.freeze({
            symmetry,
            board: transformed.board,
            shapes: transformed.shapes,
            key: representation(transformed),
        });
    }));
}

export function canonicalPuzzleKey(puzzle) {
    return puzzleSymmetryVariants(puzzle)
        .map(variant => variant.key)
        .sort()[0];
}

export function canonicalTrayOrbitKey(puzzle) {
    return puzzleSymmetryVariants(puzzle)
        .map(variant => sortedTray(variant.shapes).join(','))
        .sort()[0];
}

export function bitCount(board) {
    let remaining = board;
    let count = 0;
    while (remaining !== 0n) {
        remaining &= remaining - 1n;
        count++;
    }
    return count;
}

export function symmetryAwarePuzzleDistance(left, right) {
    const leftTray = sortedTray(left.shapes).join(',');
    let minimum = Infinity;
    puzzleSymmetryVariants(right).forEach(variant => {
        if (sortedTray(variant.shapes).join(',') !== leftTray) return;
        minimum = Math.min(minimum, bitCount(left.board ^ variant.board));
    });
    return minimum;
}

export class PuzzleDiversityTracker {
    constructor(nearDuplicateDistance = 0) {
        if (!Number.isSafeInteger(nearDuplicateDistance) || nearDuplicateDistance < 0) {
            throw new RangeError('nearDuplicateDistance must be a non-negative safe integer');
        }
        this.nearDuplicateDistance = nearDuplicateDistance;
        this.canonicalKeys = new Set();
        this.puzzlesByTrayOrbit = new Map();
    }

    classify(puzzle) {
        const canonicalKey = canonicalPuzzleKey(puzzle);
        if (this.canonicalKeys.has(canonicalKey)) return 'exact';
        if (this.nearDuplicateDistance > 0) {
            const bucket = this.puzzlesByTrayOrbit.get(canonicalTrayOrbitKey(puzzle)) || [];
            if (bucket.some(previous => (
                symmetryAwarePuzzleDistance(puzzle, previous) <= this.nearDuplicateDistance
            ))) return 'near';
        }
        return null;
    }

    nearestDistance(puzzle) {
        const bucket = this.puzzlesByTrayOrbit.get(canonicalTrayOrbitKey(puzzle)) || [];
        if (bucket.length === 0) return Infinity;
        return bucket.reduce((minimum, previous) => Math.min(
            minimum,
            symmetryAwarePuzzleDistance(puzzle, previous),
        ), Infinity);
    }

    add(puzzle) {
        const key = canonicalPuzzleKey(puzzle);
        this.canonicalKeys.add(key);
        const trayKey = canonicalTrayOrbitKey(puzzle);
        const bucket = this.puzzlesByTrayOrbit.get(trayKey) || [];
        bucket.push(Object.freeze({ board: puzzle.board, shapes: Object.freeze([...puzzle.shapes]) }));
        this.puzzlesByTrayOrbit.set(trayKey, bucket);
    }
}
