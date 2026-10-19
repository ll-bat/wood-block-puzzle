import {
    COLLECTION_FORMAT_VERSION,
    RECORD_FORMAT_VERSION,
    deserializeCollectionEnvelope,
    deserializePuzzleRecord,
} from '../generation';
import { progressForCollection } from './progress';

export const PUZZLE_CATALOG_FORMAT_VERSION = 1;

export class ChallengeLoadError extends Error {
    constructor(message, cause) {
        super(message);
        this.name = 'ChallengeLoadError';
        this.cause = cause;
    }
}

function selectionIndex(records, selector) {
    if (selector.id !== undefined) {
        if (typeof selector.id !== 'string' || selector.id.length === 0) {
            throw new ChallengeLoadError('Challenge id must be a non-empty string');
        }
        const index = records.findIndex(record => record.id === selector.id);
        if (index < 0) throw new ChallengeLoadError(`Challenge id not found: ${selector.id}`);
        return index;
    }
    const index = selector.index === undefined ? 0 : selector.index;
    if (!Number.isSafeInteger(index) || index < 0 || index >= records.length) {
        throw new ChallengeLoadError(`Challenge index is out of range: ${index}`);
    }
    return index;
}

function validatedEntries(source) {
    if (Array.isArray(source.sources)) {
        if (source.catalogFormatVersion !== PUZZLE_CATALOG_FORMAT_VERSION) {
            throw new RangeError(`Unsupported puzzle catalog format: ${source.catalogFormatVersion}`);
        }
        const entries = source.sources.flatMap((catalogSource, sourceIndex) => {
            if (!catalogSource || typeof catalogSource !== 'object'
                || Array.isArray(catalogSource)
                || typeof catalogSource.path !== 'string'
                || catalogSource.path.length === 0
                || !catalogSource.document
                || typeof catalogSource.document !== 'object') {
                throw new TypeError(`Invalid puzzle catalog source at index ${sourceIndex}`);
            }
            let sourceEntries;
            try {
                sourceEntries = validatedEntries(catalogSource.document);
            } catch (error) {
                throw new RangeError(`Invalid puzzle source ${catalogSource.path}: ${error.message}`);
            }
            return sourceEntries.map((challenge, recordIndex) => Object.freeze({
                ...challenge,
                sourcePath: catalogSource.path,
                sourceIndex,
                recordIndex,
            }));
        });
        if (entries.length === 0) throw new RangeError('Puzzle catalog contains no puzzles');
        const identifiers = new Set();
        entries.forEach(challenge => {
            if (identifiers.has(challenge.id)) {
                throw new RangeError(`Puzzle catalog contains duplicate id: ${challenge.id}`);
            }
            identifiers.add(challenge.id);
        });
        return Object.freeze(entries.map((challenge, index) => Object.freeze({
            ...challenge,
            index,
        })));
    }
    if (Array.isArray(source.puzzles)) {
        if (source.formatVersion !== COLLECTION_FORMAT_VERSION) {
            throw new RangeError(`Unsupported collection format: ${source.formatVersion}`);
        }
        const envelope = deserializeCollectionEnvelope(source);
        return Object.freeze(envelope.puzzles.map((challenge, index) => Object.freeze({
            index,
            ...challenge,
        })));
    }
    if (source.formatVersion !== RECORD_FORMAT_VERSION) {
        throw new RangeError(`Unsupported puzzle record format: ${source.formatVersion}`);
    }
    return Object.freeze([Object.freeze({
        index: 0,
        ...deserializePuzzleRecord(source),
    })]);
}

export function selectChallenge(source, selector = {}) {
    if (!source || typeof source !== 'object' || Array.isArray(source)) {
        throw new ChallengeLoadError('Challenge source must be a record or collection object');
    }
    try {
        const collection = validatedEntries(source);
        const index = selectionIndex(collection, selector);
        const progress = progressForCollection(source, collection);
        return Object.freeze({ ...collection[index], collection, progress });
    } catch (error) {
        if (error instanceof ChallengeLoadError) throw error;
        throw new ChallengeLoadError(`Invalid challenge data: ${error.message}`, error);
    }
}

export async function loadChallenge(source, options = {}) {
    if (typeof source !== 'string') return selectChallenge(source, options);
    const fetchImplementation = options.fetchImplementation
        || (typeof fetch === 'function' ? fetch : null);
    if (!fetchImplementation) throw new ChallengeLoadError('No fetch implementation is available');
    let response;
    try {
        response = await fetchImplementation(source);
    } catch (error) {
        throw new ChallengeLoadError(`Could not load challenge source: ${source}`, error);
    }
    if (!response || !response.ok) {
        throw new ChallengeLoadError(
            `Could not load challenge source: ${source} (${response ? response.status : 'no response'})`,
        );
    }
    let document;
    try {
        document = await response.json();
    } catch (error) {
        throw new ChallengeLoadError(`Challenge source is not valid JSON: ${source}`, error);
    }
    return selectChallenge(document, options);
}
