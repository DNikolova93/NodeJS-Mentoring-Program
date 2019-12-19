const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './index.js',
  externals: [nodeExternals()],
  output: {
    path: __dirname + '/public/js',
    filename: 'build.js',
  },
  module: {
    preLoaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'eslint-loader' },
    ],
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
    ],
  },
  eslint: {
    emitError: true,
    emitWarning: true,
    failOnError: true,
    failOnWarning: true,
  },
};
