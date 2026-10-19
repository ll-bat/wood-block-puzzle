const fs = require('fs');
const path = require('path');

const CHALLENGE_PROGRESS_FORMAT_VERSION = 1;
const MANUAL_DIFFICULTIES = Object.freeze(['easy', 'medium', 'hard']);

function defaultProgressEntry() {
    return { solved: false, manualDifficulty: 'easy' };
}

function normalizeProgressEntry(value, context = 'progress entry') {
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
        throw new TypeError(`${context} must be an object`);
    }
    if (typeof value.solved !== 'boolean') {
        throw new TypeError(`${context}.solved must be a boolean`);
    }
    if (!MANUAL_DIFFICULTIES.includes(value.manualDifficulty)) {
        throw new RangeError(`${context}.manualDifficulty must be easy, medium, or hard`);
    }
    return {
        solved: value.solved,
        manualDifficulty: value.manualDifficulty,
    };
}

function emptyProgressDocument() {
    return { formatVersion: CHALLENGE_PROGRESS_FORMAT_VERSION, puzzles: {} };
}

function readProgress(filePath, fileSystem = fs) {
    let parsed;
    try {
        parsed = JSON.parse(fileSystem.readFileSync(filePath, 'utf8'));
    } catch (error) {
        if (error && error.code === 'ENOENT') return emptyProgressDocument();
        throw new Error(`Could not read challenge progress: ${error.message}`);
    }
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)
        || parsed.formatVersion !== CHALLENGE_PROGRESS_FORMAT_VERSION
        || !parsed.puzzles || typeof parsed.puzzles !== 'object'
        || Array.isArray(parsed.puzzles)) {
        throw new Error('Challenge progress has an unsupported or invalid format');
    }
    const puzzles = {};
    Object.entries(parsed.puzzles).forEach(([id, entry]) => {
        if (!id) throw new TypeError('Challenge progress contains an empty puzzle id');
        puzzles[id] = normalizeProgressEntry(entry, `progress for ${id}`);
    });
    return { formatVersion: CHALLENGE_PROGRESS_FORMAT_VERSION, puzzles };
}

function writeProgressAtomic(filePath, document, fileSystem = fs) {
    const directory = path.dirname(filePath);
    fileSystem.mkdirSync(directory, { recursive: true });
    const temporaryPath = `${filePath}.tmp`;
    fileSystem.writeFileSync(temporaryPath, `${JSON.stringify(document, null, 2)}\n`, 'utf8');
    fileSystem.renameSync(temporaryPath, filePath);
}

function rawPuzzleIds(catalog) {
    const ids = [];
    catalog.sources.forEach(source => {
        const document = source.document;
        const records = Array.isArray(document && document.puzzles)
            ? document.puzzles
            : [document];
        records.forEach(record => {
            if (!record || typeof record.id !== 'string' || record.id.length === 0) {
                throw new TypeError(`Puzzle source ${source.path} contains a missing or invalid id`);
            }
            ids.push(record.id);
        });
    });
    const uniqueIds = new Set(ids);
    if (uniqueIds.size !== ids.length) throw new RangeError('Puzzle catalog contains duplicate ids');
    return ids;
}

function synchronizeProgress(catalog, filePath, fileSystem = fs) {
    const document = readProgress(filePath, fileSystem);
    let changed = false;
    rawPuzzleIds(catalog).forEach(id => {
        if (!Object.prototype.hasOwnProperty.call(document.puzzles, id)) {
            document.puzzles[id] = defaultProgressEntry();
            changed = true;
        }
    });
    if (changed) writeProgressAtomic(filePath, document, fileSystem);
    return document;
}

function validateProgressPatch(patch) {
    if (!patch || typeof patch !== 'object' || Array.isArray(patch)) {
        throw new TypeError('Progress update must be an object');
    }
    const allowed = new Set(['puzzleId', 'solved', 'manualDifficulty']);
    const keys = Object.keys(patch);
    if (keys.some(key => !allowed.has(key))) throw new TypeError('Progress update contains unknown fields');
    if (typeof patch.puzzleId !== 'string' || patch.puzzleId.length === 0) {
        throw new TypeError('Progress update puzzleId must be a non-empty string');
    }
    if (!keys.includes('solved') && !keys.includes('manualDifficulty')) {
        throw new TypeError('Progress update must change solved or manualDifficulty');
    }
    if (keys.includes('solved') && typeof patch.solved !== 'boolean') {
        throw new TypeError('Progress update solved must be a boolean');
    }
    if (keys.includes('manualDifficulty')
        && !MANUAL_DIFFICULTIES.includes(patch.manualDifficulty)) {
        throw new RangeError('Progress update manualDifficulty must be easy, medium, or hard');
    }
}

function updateProgress(catalog, filePath, patch, fileSystem = fs) {
    validateProgressPatch(patch);
    const ids = new Set(rawPuzzleIds(catalog));
    if (!ids.has(patch.puzzleId)) throw new RangeError(`Unknown puzzle id: ${patch.puzzleId}`);
    const document = synchronizeProgress(catalog, filePath, fileSystem);
    const current = document.puzzles[patch.puzzleId];
    const next = {
        solved: Object.prototype.hasOwnProperty.call(patch, 'solved') ? patch.solved : current.solved,
        manualDifficulty: Object.prototype.hasOwnProperty.call(patch, 'manualDifficulty')
            ? patch.manualDifficulty
            : current.manualDifficulty,
    };
    document.puzzles[patch.puzzleId] = next;
    writeProgressAtomic(filePath, document, fileSystem);
    return next;
}

module.exports = {
    CHALLENGE_PROGRESS_FORMAT_VERSION,
    MANUAL_DIFFICULTIES,
    defaultProgressEntry,
    readProgress,
    rawPuzzleIds,
    synchronizeProgress,
    updateProgress,
    validateProgressPatch,
    writeProgressAtomic,
};
