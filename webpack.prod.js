const path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist', 'assets'),
        filename: 'index.js',
        publicPath: '/assets/'
    },
    devServer: {
        contentBase: 'dist',
        port: 9000,
        open: true,
        hot: true
    }
};
