module.exports = {
  entry: {
    polyfill: './components/index-polyfill.js',
    standard: './components/index.js',
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  output: {
    path: `${__dirname}/dist`,
    filename: '[name]-bundle.js',
  },
};
