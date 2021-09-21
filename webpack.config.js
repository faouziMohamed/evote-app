const path = require('path');
// const nodeExternals = require('webpack-node-externals');

module.exports = {
  devtool: 'source-map',
  node: { global: false },
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
    home: './src/public/js/lib/home/autotext.js',
    layout: './src/public/js/lib/main-layout.js',
    admin: './src/public/js/lib/main-admin.js',
    auth: './src/public/js/lib/main-auth.js',
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
