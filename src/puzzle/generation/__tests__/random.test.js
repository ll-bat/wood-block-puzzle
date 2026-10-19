import { describe, expect, it } from 'vitest';
import { CORE_25_SHAPES } from '../../core';
import {
    createSeededRandom,
    randomInt,
    sampleTray,
    shuffle,
    validateSeed,
} from '../index';

describe('deterministic random helpers', () => {
    it('repeats the same values for the same unsigned seed', () => {
        const first = createSeededRandom(0xffffffff);
        const second = createSeededRandom(0xffffffff);
        expect(Array.from({ length: 20 }, first)).toEqual(Array.from({ length: 20 }, second));
    });

    it('returns values and bounded integers only in their promised ranges', () => {
        const random = createSeededRandom(42);
        for (let index = 0; index < 100; index++) {
            const value = random();
            expect(value).toBeGreaterThanOrEqual(0);
            expect(value).toBeLessThan(1);
            expect(randomInt(random, 7)).toBeGreaterThanOrEqual(0);
            expect(randomInt(random, 7)).toBeLessThan(7);
        }
    });

    it.each([-1, 0x100000000, 1.5, NaN, '1'])(
        'rejects invalid seed %s',
        seed => expect(() => validateSeed(seed)).toThrow(/unsigned 32-bit/),
    );

    it('shuffles deterministically without changing the input', () => {
        const source = [1, 2, 3, 4, 5, 6];
        const result = shuffle(createSeededRandom(9), source);
        expect(result).toEqual(shuffle(createSeededRandom(9), source));
        expect(result).not.toEqual(source);
        expect(source).toEqual([1, 2, 3, 4, 5, 6]);
    });
});

describe('tray sampling', () => {
    it('draws exactly three known shapes', () => {
        const known = new Set(CORE_25_SHAPES.map(shape => shape.id));
        const tray = sampleTray(createSeededRandom(13));
        expect(tray).toHaveLength(3);
        expect(tray.every(shapeId => known.has(shapeId))).toBe(true);
    });

    it('preserves duplicate independent draws', () => {
        expect(sampleTray(() => 0)).toEqual(['SINGLE', 'SINGLE', 'SINGLE']);
    });
});
