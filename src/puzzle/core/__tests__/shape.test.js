import { describe, expect, it } from 'vitest';
import {
    CORE_25_SHAPES,
    CORE_CATALOG_ID,
    createShape,
    getShape,
    validateCoreCatalog,
    validateShapeDefinition,
} from '../index';

describe('shape validation', () => {
    it('accepts a normalized edge-connected corner', () => {
        expect(validateShapeDefinition({
            id: 'TEST_CORNER',
            cells: [[0, 0], [0, 1], [1, 0]],
        })).toBe(true);
    });

    it.each([
        ['duplicate cells', [[0, 0], [0, 0]]],
        ['non-normalized cells', [[1, 1], [1, 2]]],
        ['out-of-bounds cells', [[0, 0], [0, 8]]],
        ['diagonal-only cells', [[0, 0], [1, 1]]],
    ])('rejects %s', (_description, cells) => {
        expect(() => createShape('INVALID', cells)).toThrow(/Invalid shape definition/);
    });

    it('freezes shape values and their coordinates', () => {
        const shape = createShape('DOMINO', [[0, 0], [0, 1]]);
        expect(Object.isFrozen(shape)).toBe(true);
        expect(Object.isFrozen(shape.cells)).toBe(true);
        expect(Object.isFrozen(shape.cells[0])).toBe(true);
    });
});

describe(`${CORE_CATALOG_ID} catalog`, () => {
    it('contains exactly 25 unique, valid shapes', () => {
        expect(validateCoreCatalog()).toBe(true);
        expect(CORE_25_SHAPES).toHaveLength(25);
        expect(new Set(CORE_25_SHAPES.map(shape => shape.id)).size).toBe(25);
        CORE_25_SHAPES.forEach(shape => expect(validateShapeDefinition(shape)).toBe(true));
    });

    it('contains the exact agreed identifiers', () => {
        expect(CORE_25_SHAPES.map(shape => shape.id)).toEqual([
            'SINGLE',
            'LINE_2_HORIZONTAL', 'LINE_2_VERTICAL',
            'LINE_3_HORIZONTAL', 'LINE_3_VERTICAL',
            'LINE_4_HORIZONTAL', 'LINE_4_VERTICAL',
            'LINE_5_HORIZONTAL', 'LINE_5_VERTICAL',
            'SQUARE_2', 'SQUARE_3',
            'RECTANGLE_2_ROWS_3_COLUMNS', 'RECTANGLE_3_ROWS_2_COLUMNS',
            'SMALL_CORNER_TOP_LEFT', 'SMALL_CORNER_TOP_RIGHT',
            'SMALL_CORNER_BOTTOM_LEFT', 'SMALL_CORNER_BOTTOM_RIGHT',
            'LARGE_CORNER_TOP_LEFT', 'LARGE_CORNER_TOP_RIGHT',
            'LARGE_CORNER_BOTTOM_LEFT', 'LARGE_CORNER_BOTTOM_RIGHT',
            'T_STEM_UP', 'T_STEM_RIGHT', 'T_STEM_DOWN', 'T_STEM_LEFT',
        ]);
    });

    it('defines the four fixed T orientations explicitly', () => {
        expect(getShape('T_STEM_UP').cells).toEqual([[0, 1], [1, 0], [1, 1], [1, 2]]);
        expect(getShape('T_STEM_RIGHT').cells).toEqual([[0, 0], [1, 0], [1, 1], [2, 0]]);
        expect(getShape('T_STEM_DOWN').cells).toEqual([[0, 0], [0, 1], [0, 2], [1, 1]]);
        expect(getShape('T_STEM_LEFT').cells).toEqual([[0, 1], [1, 0], [1, 1], [2, 1]]);
    });

    it('rejects unknown identifiers', () => {
        expect(() => getShape('NOT_A_SHAPE')).toThrow(/Unknown shape/);
    });
});

