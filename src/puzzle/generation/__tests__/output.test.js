import { describe, expect, it } from 'vitest';
import { collectionFileName, collectionFingerprint } from '../output';

function collection(overrides = {}) {
    return {
        formatVersion: 1,
        config: { difficultyTarget: 'hard', seed: 42 },
        statistics: { acceptedCount: 100 },
        puzzles: [{ id: 'one' }],
        ...overrides,
    };
}

describe('default generated collection filenames', () => {
    it('is deterministic and identifies useful generation metadata', () => {
        const value = collection();
        expect(collectionFileName(value)).toBe(collectionFileName(value));
        expect(collectionFileName(value)).toMatch(
            /^puzzles-hard-seed-42-count-100-[0-9a-f]{8}\.json$/,
        );
        expect(collectionFileName(JSON.parse(JSON.stringify(value))))
            .toBe(collectionFileName(value));
    });

    it('changes when collection content changes', () => {
        expect(collectionFingerprint(collection()))
            .not.toBe(collectionFingerprint(collection({ puzzles: [{ id: 'two' }] })));
    });

    it('rejects missing naming metadata', () => {
        expect(() => collectionFileName({})).toThrow(/metadata/);
    });
});
