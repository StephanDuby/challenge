var path = require('path');
var HtmlWebPackPlugin = require("html-webpack-plugin");
// var CopyWebpackPlugin = require("copy-webpack-plugin");

const PATHS = require('./paths');

const htmlPlugin = new HtmlWebPackPlugin({
    template: "./src/index.html",
    filename: "./index.html"
});

/* const copyPlugin = new CopyWebpackPlugin([
    { from: 'assets' }
]);*/

module.exports = {
    entry: {
        'app': [
            path.join(PATHS.jsSourcePath, 'index.js')
        ]
    },
    output: {
        path: PATHS.assetsTargetPath,
        filename: '[name].bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                enforce: 'pre',
                use: [{
                    loader: 'eslint-loader'
                }],
                exclude: /node_modules/
            }, {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    devServer: {
        historyApiFallback: true
    },
    plugins: [htmlPlugin]
};