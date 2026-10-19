export const BLOCK_THEME_STORAGE_KEY = 'wood-block-puzzle-theme';
export const DEFAULT_BLOCK_THEME = 'amber';

export const BLOCK_THEMES = Object.freeze([
    Object.freeze({ id: 'amber', label: 'Amber' }),
    Object.freeze({ id: 'winter', label: 'Winter' }),
    Object.freeze({ id: 'frozen', label: 'Frozen' }),
    Object.freeze({ id: 'candy', label: 'Candy' }),
    Object.freeze({ id: 'grove', label: 'Grove' }),
    Object.freeze({ id: 'meadow', label: 'Meadow' }),
    Object.freeze({ id: 'ocean', label: 'Ocean' }),
]);

export function normalizeBlockTheme(themeId) {
    return BLOCK_THEMES.some(theme => theme.id === themeId)
        ? themeId
        : DEFAULT_BLOCK_THEME;
}

export function loadBlockTheme(storage) {
    try {
        if (storage === undefined) {
            storage = typeof localStorage === 'undefined' ? null : localStorage;
        }
        return normalizeBlockTheme(storage && storage.getItem(BLOCK_THEME_STORAGE_KEY));
    } catch (_error) {
        return DEFAULT_BLOCK_THEME;
    }
}

export function applyBlockTheme(themeId, options = {}) {
    const normalized = normalizeBlockTheme(themeId);
    const root = options.root
        || (typeof document === 'undefined' ? null : document.documentElement);
    const storage = options.storage === undefined
        ? (typeof localStorage === 'undefined' ? null : localStorage)
        : options.storage;
    if (root) root.dataset.blockTheme = normalized;
    if (options.persist !== false && storage) {
        try {
            storage.setItem(BLOCK_THEME_STORAGE_KEY, normalized);
        } catch (_error) {
            // A disabled storage provider should not prevent visual theme changes.
        }
    }
    return normalized;
}
