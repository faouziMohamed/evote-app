const path = require('path');
// const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'production',
  performance: {
    hints: false,
  },
  target: 'web',
  entry: {
    main: './src/public/js/main.js',
    encryption: './src/public/js/encryption/gpgEncryptor.js',
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
        use: { loader: 'babel-loader' },
      },
    ],
  },
};
