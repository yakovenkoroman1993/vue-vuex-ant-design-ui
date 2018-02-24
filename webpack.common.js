let path = require('path');
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

module.exports = {
    entry: {
        app: [
            './src/main.js'
        ],
        vendor: [
            'babel-polyfill'
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': path.resolve(__dirname, 'src'),
        }
    },
    module: {
        rules: [{
            enforce: 'pre',
            test: /\.(js|vue)$/,
            exclude: /node_modules/,
            loader: 'eslint-loader',
        }, {
            test: /\.vue$/,
            exclude: /node_modules/,
            include: path.join(__dirname, 'src'),
            use: 'vue-loader',
        }, {
            test: /\.js?$/,
            exclude: /node_modules/,
            include: path.join(__dirname, 'src'),
            use: 'babel-loader',
        }, {
            test: /\.json$/,
            use: 'json-loader'
        }, {
            test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/,
            loader: 'url-loader',
            options: {
                limit: 10000
            }
        }]
    },
    plugins: [
        // see https://webpack.js.org/plugins/
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'index.html'),
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks({ resource, context }) {
                // This prevents stylesheet resources with the .css or .scss extension
                // from being moved from their original chunk to the vendor chunk
                if (resource && (/^.*\.(css|scss)$/).test(resource)) {
                    return false;
                }

                return context && context.includes('node_modules');
            }
        }),
        new FriendlyErrorsWebpackPlugin(),
    ]
};
