import { CORE_25_SHAPES } from '../core';

export const MAX_UINT32 = 0xffffffff;

export function validateSeed(seed) {
    if (!Number.isInteger(seed) || seed < 0 || seed > MAX_UINT32) {
        throw new RangeError('seed must be an unsigned 32-bit integer');
    }
    return seed;
}

/** Mulberry32: a compact deterministic non-cryptographic random source. */
export function createSeededRandom(seed) {
    let state = validateSeed(seed) >>> 0;
    return function nextRandom() {
        state = (state + 0x6d2b79f5) >>> 0;
        let value = state;
        value = Math.imul(value ^ (value >>> 15), value | 1);
        value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
        return ((value ^ (value >>> 14)) >>> 0) / 0x100000000;
    };
}

export function randomInt(random, maxExclusive) {
    if (typeof random !== 'function') throw new TypeError('random must be a function');
    if (!Number.isSafeInteger(maxExclusive) || maxExclusive <= 0) {
        throw new RangeError('maxExclusive must be a positive safe integer');
    }
    const value = random();
    if (typeof value !== 'number' || value < 0 || value >= 1) {
        throw new RangeError('random must return a number in [0, 1)');
    }
    return Math.floor(value * maxExclusive);
}

export function shuffle(random, values) {
    if (!Array.isArray(values)) throw new TypeError('values must be an array');
    const result = [...values];
    for (let index = result.length - 1; index > 0; index--) {
        const selected = randomInt(random, index + 1);
        [result[index], result[selected]] = [result[selected], result[index]];
    }
    return result;
}

export function sampleTray(random) {
    return Object.freeze(Array.from({ length: 3 }, () => (
        CORE_25_SHAPES[randomInt(random, CORE_25_SHAPES.length)].id
    )));
}
