export const REASONING_MECHANISMS = Object.freeze([
    'clear-required',
    'initially-blocked',
    'order-restricted',
    'delayed-failure',
    'misleading-best-move',
]);

const predicates = Object.freeze({
    'clear-required': metrics => metrics.minimumClearedLineCount > 0,
    'initially-blocked': metrics => metrics.initiallyBlockedShapeCount > 0,
    'order-restricted': metrics => (
        metrics.viableShapeOrderCount < metrics.distinctShapeOrderCount
    ),
    'delayed-failure': metrics => metrics.delayedLosingFirstMoveCount > 0,
    'misleading-best-move': metrics => metrics.misleadingHeuristicBestMoveCount > 0,
});

export function validateRequiredMechanisms(value = []) {
    if (!Array.isArray(value)) throw new TypeError('requiredMechanisms must be an array');
    const seen = new Set();
    value.forEach(mechanism => {
        if (!REASONING_MECHANISMS.includes(mechanism)) {
            throw new RangeError(`Unsupported reasoning mechanism: ${mechanism}`);
        }
        if (seen.has(mechanism)) {
            throw new RangeError(`Duplicate reasoning mechanism: ${mechanism}`);
        }
        seen.add(mechanism);
    });
    return Object.freeze([...value].sort());
}

export function matchesRequiredMechanisms(difficulty, requiredMechanisms = []) {
    const validated = validateRequiredMechanisms(requiredMechanisms);
    return validated.every(mechanism => predicates[mechanism](difficulty.metrics));
}
