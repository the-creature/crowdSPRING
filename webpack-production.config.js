var webpack = require('webpack');
var path = require('path');

var WebpackStripLoader = require('strip-loader');
var devConfig = require('./webpack.config.js');

var stripLoader = {
  test: [/\.js$/],
  exclude: /node_modules/,
  loader: WebpackStripLoader.loader('console.log')
};

var prodEnvPlugin = new webpack.DefinePlugin({
  'process.env': {
    'NODE_ENV': JSON.stringify("production")
  }
});

devConfig.plugins.push(prodEnvPlugin);
devConfig.module.loaders.push(stripLoader);

delete devConfig.devtool;

module.exports = devConfig;
