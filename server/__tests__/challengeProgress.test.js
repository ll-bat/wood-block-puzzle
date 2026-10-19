import fs from 'fs';
import os from 'os';
import path from 'path';
import { afterEach, describe, expect, it } from 'vitest';
import challengeProgress from '../challengeProgress';

const {
    readProgress,
    synchronizeProgress,
    updateProgress,
} = challengeProgress;

const temporaryDirectories = [];

function fixture() {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'wood-block-progress-'));
    temporaryDirectories.push(directory);
    return {
        filePath: path.join(directory, 'data', 'challenge-progress.json'),
        catalog: {
            catalogFormatVersion: 1,
            sources: [{
                path: '/public/puzzles/example.json',
                document: { puzzles: [{ id: 'one' }, { id: 'two' }] },
            }],
        },
    };
}

afterEach(() => {
    temporaryDirectories.splice(0).forEach(directory => {
        fs.rmSync(directory, { recursive: true, force: true });
    });
});

describe('challenge progress persistence', () => {
    it('creates easy unsolved defaults for every discovered puzzle', () => {
        const { catalog, filePath } = fixture();
        const progress = synchronizeProgress(catalog, filePath);
        expect(progress.puzzles).toEqual({
            one: { solved: false, manualDifficulty: 'easy' },
            two: { solved: false, manualDifficulty: 'easy' },
        });
        expect(readProgress(filePath)).toEqual(progress);
        expect(fs.existsSync(`${filePath}.tmp`)).toBe(false);
    });

    it('updates only supplied fields and preserves existing review state', () => {
        const { catalog, filePath } = fixture();
        updateProgress(catalog, filePath, { puzzleId: 'one', solved: true });
        expect(updateProgress(catalog, filePath, {
            puzzleId: 'one', manualDifficulty: 'hard',
        })).toEqual({ solved: true, manualDifficulty: 'hard' });
        expect(readProgress(filePath).puzzles.two)
            .toEqual({ solved: false, manualDifficulty: 'easy' });
    });

    it('rejects unknown puzzles and invalid update values without changing storage', () => {
        const { catalog, filePath } = fixture();
        synchronizeProgress(catalog, filePath);
        const before = fs.readFileSync(filePath, 'utf8');
        expect(() => updateProgress(catalog, filePath, {
            puzzleId: 'missing', solved: true,
        })).toThrow(/Unknown puzzle/);
        expect(() => updateProgress(catalog, filePath, {
            puzzleId: 'one', manualDifficulty: 'expert',
        })).toThrow(/easy, medium, or hard/);
        expect(fs.readFileSync(filePath, 'utf8')).toBe(before);
    });
});
