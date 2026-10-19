const express = require('express');
const serveStatic = require("serve-static")
const fs = require('fs');
const path = require('path');
const { readPuzzleCatalog } = require('./server/puzzleCatalog');
const { synchronizeProgress, updateProgress } = require('./server/challengeProgress');

function createApp(options = {}) {
    const app = express();
    const rootDirectory = options.rootDirectory || __dirname;
    const puzzleDirectory = options.puzzleDirectory
        || path.join(rootDirectory, 'public', 'puzzles');
    const progressFile = options.progressFile
        || path.join(rootDirectory, 'data', 'challenge-progress.json');
    const fileSystem = options.fileSystem || fs;
    app.use(express.json({ limit: '32kb' }));
    app.get('/api/puzzles', (_request, response) => {
        try {
            const catalog = readPuzzleCatalog(puzzleDirectory, fileSystem);
            const progress = synchronizeProgress(catalog, progressFile, fileSystem);
            response.json({ ...catalog, progress });
        } catch (error) {
            response.status(500).json({ error: error.message });
        }
    });
    app.patch('/api/puzzle-progress', (request, response) => {
        try {
            const catalog = readPuzzleCatalog(puzzleDirectory, fileSystem);
            const progress = updateProgress(catalog, progressFile, request.body, fileSystem);
            response.json({ puzzleId: request.body.puzzleId, ...progress });
        } catch (error) {
            response.status(400).json({ error: error.message });
        }
    });
    app.use(serveStatic(rootDirectory));
    return app;
}

const app = createApp();
if (require.main === module) {
    const port = process.env.PORT || 3000;
    app.listen(port);
}

module.exports = { createApp };
