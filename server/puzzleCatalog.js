const fs = require('fs');
const path = require('path');

const PUZZLE_CATALOG_FORMAT_VERSION = 1;

function discoverPuzzleFiles(directory, fileSystem = fs) {
    let entries;
    try {
        entries = fileSystem.readdirSync(directory, { withFileTypes: true });
    } catch (error) {
        if (error && error.code === 'ENOENT') return [];
        throw error;
    }
    return entries.flatMap(entry => {
        const absolutePath = path.join(directory, entry.name);
        if (entry.isDirectory()) return discoverPuzzleFiles(absolutePath, fileSystem);
        if (entry.isFile() && path.extname(entry.name).toLowerCase() === '.json') {
            return [absolutePath];
        }
        return [];
    }).sort((left, right) => left.localeCompare(right, 'en'));
}

function publicPuzzlePath(relativePath) {
    return `/public/puzzles/${relativePath.split(path.sep).map(encodeURIComponent).join('/')}`;
}

function readPuzzleCatalog(directory, fileSystem = fs) {
    const files = discoverPuzzleFiles(directory, fileSystem);
    const sources = files.map(absolutePath => {
        const relativePath = path.relative(directory, absolutePath).split(path.sep).join('/');
        let document;
        try {
            document = JSON.parse(fileSystem.readFileSync(absolutePath, 'utf8'));
        } catch (error) {
            throw new Error(`Could not read puzzle file ${relativePath}: ${error.message}`);
        }
        return {
            path: publicPuzzlePath(relativePath),
            document,
        };
    });
    return {
        catalogFormatVersion: PUZZLE_CATALOG_FORMAT_VERSION,
        sources,
    };
}

module.exports = {
    PUZZLE_CATALOG_FORMAT_VERSION,
    discoverPuzzleFiles,
    readPuzzleCatalog,
};
