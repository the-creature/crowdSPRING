var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');

var config = {
  devtool: 'inline-source-map',
  resolve: {
    root: path.resolve('./src')
  },
  entry: {
    'build': './src/index'
  },
  output: {
    path: path.resolve('./public/'),
    filename: '[name].js'
  },
  plugins: [
    new webpack.NoErrorsPlugin()
  ],
  module: {
    preLoaders: [
      {
        test: /\.js/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.js|\.jsx/,
        loaders: [ 'babel' ],
        exclude: /node_modules/,
        include: path.resolve('./src')
      },
      {
        test: /\.scss/,
        loader: 'style!css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass?sourceMap',
        include: path.resolve('./src')
      }
    ]
  },
  eslint: {
    configFile: './.eslintrc'
  },
  postcss: [autoprefixer({ browsers: 'last 2 versions, not ie < 11' })]
};


module.exports = config;
