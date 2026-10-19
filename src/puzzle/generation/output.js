export function fingerprintText(text) {
    if (typeof text !== 'string') throw new TypeError('Fingerprint input must be a string');
    let hash = 0x811c9dc5;
    for (let index = 0; index < text.length; index++) {
        hash ^= text.charCodeAt(index);
        hash = Math.imul(hash, 0x01000193) >>> 0;
    }
    return hash.toString(16).padStart(8, '0');
}

export function collectionFingerprint(collection) {
    if (!collection || typeof collection !== 'object' || Array.isArray(collection)) {
        throw new TypeError('Puzzle collection is required');
    }
    return fingerprintText(JSON.stringify(collection));
}

export function collectionFileName(collection) {
    if (!collection.config || !collection.statistics) {
        throw new TypeError('Versioned puzzle collection metadata is required');
    }
    const difficulty = collection.config.difficultyTarget;
    const seed = collection.config.seed;
    const count = collection.statistics.acceptedCount;
    if (typeof difficulty !== 'string'
        || !Number.isSafeInteger(seed)
        || !Number.isSafeInteger(count)) {
        throw new TypeError('Puzzle collection naming metadata is invalid');
    }
    return `puzzles-${difficulty}-seed-${seed}-count-${count}-${collectionFingerprint(collection)}.json`;
}
