
const path = require("path");

module.exports = {
  mode: 'development',
  //entry: './components/index.js',
  output: {
      filename: "bundle-test.js"
  },
  resolve: {
    extensions: ['.js', '.json']
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /^((?!\.spec).)*\.js$/,
        use: {
          loader: 'istanbul-instrumenter-loader',
          options: { esModules: true }
        },
        enforce: 'pre',
        include: path.resolve('components')
      }
    ],
  }
};