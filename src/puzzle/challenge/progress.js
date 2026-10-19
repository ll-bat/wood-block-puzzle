export const CHALLENGE_PROGRESS_FORMAT_VERSION = 1;
export const MANUAL_DIFFICULTIES = Object.freeze(['easy', 'medium', 'hard']);

export function defaultChallengeProgress() {
    return Object.freeze({ solved: false, manualDifficulty: 'easy' });
}

export function validateChallengeProgressEntry(value, context = 'challenge progress') {
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
        throw new TypeError(`${context} must be an object`);
    }
    if (typeof value.solved !== 'boolean') {
        throw new TypeError(`${context}.solved must be a boolean`);
    }
    if (!MANUAL_DIFFICULTIES.includes(value.manualDifficulty)) {
        throw new RangeError(`${context}.manualDifficulty must be easy, medium, or hard`);
    }
    return Object.freeze({
        solved: value.solved,
        manualDifficulty: value.manualDifficulty,
    });
}

export function progressForCollection(source, collection) {
    const supplied = source.progress;
    if (supplied !== undefined) {
        if (!supplied || typeof supplied !== 'object' || Array.isArray(supplied)
            || supplied.formatVersion !== CHALLENGE_PROGRESS_FORMAT_VERSION
            || !supplied.puzzles || typeof supplied.puzzles !== 'object'
            || Array.isArray(supplied.puzzles)) {
            throw new TypeError('Challenge progress has an unsupported or invalid format');
        }
    }
    const entries = {};
    collection.forEach(challenge => {
        entries[challenge.id] = supplied
            && Object.prototype.hasOwnProperty.call(supplied.puzzles, challenge.id)
            ? validateChallengeProgressEntry(
                supplied.puzzles[challenge.id],
                `progress for ${challenge.id}`,
            )
            : defaultChallengeProgress();
    });
    return Object.freeze(entries);
}

export async function saveChallengeProgress(puzzleId, changes, options = {}) {
    if (typeof puzzleId !== 'string' || puzzleId.length === 0) {
        throw new TypeError('Puzzle id must be a non-empty string');
    }
    const payload = { puzzleId, ...changes };
    const fetchImplementation = options.fetchImplementation
        || (typeof fetch === 'function' ? fetch : null);
    if (!fetchImplementation) throw new Error('No fetch implementation is available');
    let response;
    try {
        response = await fetchImplementation(
            options.endpoint || '/api/puzzle-progress',
            {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            },
        );
    } catch (error) {
        throw new Error(`Could not save challenge progress: ${error.message}`);
    }
    if (!response || !response.ok) {
        let detail = response ? `HTTP ${response.status}` : 'no response';
        try {
            const body = await response.json();
            if (body && body.error) detail = body.error;
        } catch (_error) {
            // Preserve the HTTP fallback when an error response is not JSON.
        }
        throw new Error(`Could not save challenge progress: ${detail}`);
    }
    const saved = await response.json();
    return validateChallengeProgressEntry(saved, `progress for ${puzzleId}`);
}
