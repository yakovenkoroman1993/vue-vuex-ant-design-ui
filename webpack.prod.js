let webpack = require('webpack');
let merge = require('webpack-merge');
let common = require('./webpack.common');
let UglifyJSPlugin = require('uglifyjs-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');
let CompressionPlugin = require('compression-webpack-plugin');
let Visualizer = require('webpack-visualizer-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = merge(common, {
    devtool: 'cheap-eval-source-map',
    output: {
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].chunk.[chunkhash].js',
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new webpack.DefinePlugin({
            'process.env': '"production"'
        }),
        new ExtractTextPlugin('app.bundle.css'),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest'
        }),
        new UglifyJSPlugin({
            sourceMap: true,
            parallel: true
        }),
        new CompressionPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: /\.js$|\.css$|\.html$/,
            threshold: 10240,
            minRatio: 0.8
        }),
        new Visualizer({
            filename: './statistics.html'
        }),
    ]
});