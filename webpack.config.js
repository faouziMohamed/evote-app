const path = require('path');
// const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'development',
  performance: {
    hints: false,
  },
  cache: true,
  target: 'web',
  entry: {
    candidates: './src/public/js/lib/main-candidates.js',
    newPair: './src/public/js/lib/main-newKeyPair.js',
    results: './src/public/js/lib/main-results.js',
    votes: './src/public/js/lib/main-vote.js',
  },
  output: {
    path: path.resolve(__dirname, './src/public/js/'),
    filename: '[name]_bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: { cacheCompression: false, cacheDirectory: true },
      },
    ],
  },
};
