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
    main: './src/public/js/main.js',
    newPair: './src/public/js/lib/new-pair.js',
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
