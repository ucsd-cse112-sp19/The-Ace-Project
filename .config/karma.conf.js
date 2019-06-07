const webpackConfig = require("./webpack.test")

module.exports = function (config) {
  config.set({
    frameworks: ['mocha', 'chai'],
    reporters: ['progress', 'coverage-istanbul'],
    files: [
      /* load component files (we can use karma-browserify if
          we want to use node style 'require' statements instead) */
      '../components/**/index-test.spec.js',
    ],
    preprocessors: {
      '../components/**/index-test.spec.js': ['webpack', 'sourcemap'],
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    },
    coverageIstanbulReporter: {
      reports: [ 'html', 'text-summary', 'lcovonly' ],
      dir: '../coverage',
      subdir: '.',
      fixWebpackSourcePaths: true,
      'report-config': {
        html: { outdir: 'html' }
      }
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ['ChromeHeadless'],
    autoWatch: false,
    concurrency: Infinity,
  });
};
