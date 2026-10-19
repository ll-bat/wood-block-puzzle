import { describe, expect, it } from 'vitest';
import {
    BLOCK_THEME_STORAGE_KEY,
    BLOCK_THEMES,
    applyBlockTheme,
    loadBlockTheme,
    normalizeBlockTheme,
} from '../theme';

describe('block visual themes', () => {
    it('normalizes unknown values to amber', () => {
        expect(normalizeBlockTheme('winter')).toBe('winter');
        expect(normalizeBlockTheme('frozen')).toBe('frozen');
        expect(normalizeBlockTheme('ocean')).toBe('ocean');
        expect(normalizeBlockTheme('unknown')).toBe('amber');
    });

    it('removes plain green, blue, and purple and safely loads old selections', () => {
        expect(BLOCK_THEMES.map(theme => theme.id)).toEqual([
            'amber', 'winter', 'frozen', 'candy', 'grove', 'meadow', 'ocean',
        ]);
        for (const removed of ['jade', 'sapphire', 'berry']) {
            expect(normalizeBlockTheme(removed)).toBe('amber');
            expect(loadBlockTheme({ getItem: () => removed })).toBe('amber');
        }
    });

    it('applies and persists a selected theme', () => {
        const root = { dataset: {} };
        const values = new Map();
        const storage = {
            getItem: key => values.get(key),
            setItem: (key, value) => values.set(key, value),
        };
        expect(applyBlockTheme('ocean', { root, storage })).toBe('ocean');
        expect(root.dataset.blockTheme).toBe('ocean');
        expect(values.get(BLOCK_THEME_STORAGE_KEY)).toBe('ocean');
        expect(loadBlockTheme(storage)).toBe('ocean');
    });
});
