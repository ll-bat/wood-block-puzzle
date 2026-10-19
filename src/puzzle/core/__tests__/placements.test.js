import { describe, expect, it } from 'vitest';
import {
    boardToCells,
    getPlacement,
    getPlacements,
} from '../index';

describe('fixed-orientation placement enumeration', () => {
    it('enumerates all 64 single-cell placements exactly once', () => {
        const placements = getPlacements('SINGLE');
        expect(placements).toHaveLength(64);
        expect(new Set(placements.map(({ mask }) => mask)).size).toBe(64);
    });

    it('enumerates 42 placements for a 2-row by 3-column rectangle', () => {
        expect(getPlacements('RECTANGLE_2_ROWS_3_COLUMNS')).toHaveLength(42);
    });

    it('keeps every translated cell inside the board', () => {
        for (const placement of getPlacements('LARGE_CORNER_BOTTOM_RIGHT')) {
            for (const [row, column] of boardToCells(placement.mask)) {
                expect(row).toBeGreaterThanOrEqual(0);
                expect(row).toBeLessThan(8);
                expect(column).toBeGreaterThanOrEqual(0);
                expect(column).toBeLessThan(8);
            }
        }
    });

    it('preserves horizontal line orientation', () => {
        const placements = getPlacements('LINE_3_HORIZONTAL');
        expect(placements).toHaveLength(48);
        placements.forEach(placement => {
            const cells = boardToCells(placement.mask);
            expect(new Set(cells.map(([row]) => row)).size).toBe(1);
            expect(new Set(cells.map(([, column]) => column)).size).toBe(3);
        });
    });

    it('preserves vertical line orientation', () => {
        const placements = getPlacements('LINE_3_VERTICAL');
        expect(placements).toHaveLength(48);
        placements.forEach(placement => {
            const cells = boardToCells(placement.mask);
            expect(new Set(cells.map(([row]) => row)).size).toBe(3);
            expect(new Set(cells.map(([, column]) => column)).size).toBe(1);
        });
    });

    it('returns immutable records and rejects out-of-bounds anchors', () => {
        const placement = getPlacement('SQUARE_3', 5, 5);
        expect(Object.isFrozen(placement)).toBe(true);
        expect(Object.isFrozen(getPlacements('SQUARE_3'))).toBe(true);
        expect(() => getPlacement('SQUARE_3', 6, 6)).toThrow(/No in-bounds placement/);
    });
});

