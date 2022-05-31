const path = require('path')

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry: './src/app.js',
    output: {
        filename: 'build.js',
        path: path.join(__dirname, './dist/build.js')
    },
    module: {
        rules: [{
            test: /\.css?$/,
            use: ['style-loader', 'css-loader'],
        }]
    },
    watch: true,
}