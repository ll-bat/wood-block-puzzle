const path = require('path');

module.exports = {
    mode: 'production',
    target: 'node',
    entry: './src/puzzle/generation/cli.js',
    output: {
        filename: 'generate-puzzles.cjs',
        path: path.resolve(__dirname, 'dist/tools'),
        library: { type: 'commonjs2' },
    },
    optimization: { minimize: false },
};
