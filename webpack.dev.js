let webpack = require('webpack');
let merge = require('webpack-merge');
let common = require('./webpack.common');
let config = require('config');
let {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');

let {port, host} = config.devServer;
let {
    open: openAnalyzer,
    port: analyzerPort,
    host: analyzerHost
} = config.bundleAnalyzer;

module.exports = merge(common, {
    devtool: 'eval',
    output: {
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js',
    },
    module: {
      rules: [{
          test: /\.css$/,
          use: [ 'style-loader', 'css-loader' ]
      }]
    },
    devServer: {
        port,
        host,
        contentBase: './dist',
        hot: true,
        historyApiFallback: true,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        // Support NFS mount volumes (docker)
        // see https://webpack.js.org/configuration/watch/#watchoptions-poll
        watchOptions: {
            poll: 1000, // it's worth setting a timeout to prevent high CPU load
        },
        proxy: {
            '/api/': {
                target: 'http://127.0.0.1:8080',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        },
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': '"develop"'
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new BundleAnalyzerPlugin({
            openAnalyzer,
            analyzerPort,
            analyzerHost
        }),
    ]

});