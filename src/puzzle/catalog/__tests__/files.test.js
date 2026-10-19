import fs from 'fs';
import os from 'os';
import path from 'path';
import { afterEach, describe, expect, it } from 'vitest';
import catalogModule from '../../../../server/puzzleCatalog';

const { discoverPuzzleFiles, readPuzzleCatalog } = catalogModule;
const temporaryDirectories = [];

function temporaryDirectory() {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'wood-puzzles-'));
    temporaryDirectories.push(directory);
    return directory;
}

afterEach(() => {
    temporaryDirectories.splice(0).forEach(directory => {
        fs.rmSync(directory, { recursive: true, force: true });
    });
});

describe('server puzzle catalog discovery', () => {
    it('returns an empty catalog for a missing or empty directory', () => {
        const directory = temporaryDirectory();
        expect(discoverPuzzleFiles(path.join(directory, 'missing'))).toEqual([]);
        expect(readPuzzleCatalog(directory)).toEqual({
            catalogFormatVersion: 1,
            sources: [],
        });
    });

    it('recursively reads JSON documents in deterministic relative-path order', () => {
        const directory = temporaryDirectory();
        fs.mkdirSync(path.join(directory, 'nested'));
        fs.writeFileSync(path.join(directory, 'z.json'), JSON.stringify({ id: 'z' }));
        fs.writeFileSync(path.join(directory, 'nested', 'a.json'), JSON.stringify({ id: 'a' }));
        fs.writeFileSync(path.join(directory, 'ignored.txt'), '{}');
        const catalog = readPuzzleCatalog(directory);
        expect(catalog.sources.map(source => source.path)).toEqual([
            '/public/puzzles/nested/a.json',
            '/public/puzzles/z.json',
        ]);
        expect(catalog.sources.map(source => source.document.id)).toEqual(['a', 'z']);
    });

    it('identifies the relative path of malformed JSON', () => {
        const directory = temporaryDirectory();
        fs.writeFileSync(path.join(directory, 'broken.json'), '{');
        expect(() => readPuzzleCatalog(directory)).toThrow(/broken\.json/);
    });
});
