import { describe, expect, it } from 'vitest';
import { applyOceanDepth, oceanDepthColors } from '../oceanDepth';

describe('Ocean depth shading', () => {
    it('gets darker down the board, including within each cube', () => {
        const channels = color => color.match(/[\d.]+/g).slice(0, 3).map(Number);
        for (let row = 0; row < 8; row++) {
            const { top, bottom } = oceanDepthColors(row);
            channels(top).forEach((value, i) => expect(value).toBeGreaterThan(channels(bottom)[i]));
            if (row < 7) expect(bottom).toBe(oceanDepthColors(row + 1).top);
        }
    });

    it('clamps out-of-board ghosts and provides a middle-depth default', () => {
        expect(oceanDepthColors(-3).top).toBe(oceanDepthColors(0).top);
        expect(oceanDepthColors(20).bottom).toBe(oceanDepthColors(7).bottom);
        expect(oceanDepthColors(undefined)).toEqual(oceanDepthColors(3.5));
    });

    it('applies identical colors to a cell, ghost, and clear overlay at the same row', () => {
        const elements = Array.from({ length: 3 }, () => {
            const values = {};
            return { values, style: { setProperty: (key, value) => { values[key] = value; } } };
        });
        elements.forEach(element => applyOceanDepth(element, 6));
        expect(elements[0].values).toEqual(elements[1].values);
        expect(elements[1].values).toEqual(elements[2].values);
        expect(elements[0].values['--ocean-bottom']).toBe(oceanDepthColors(6).bottom);
    });
});
