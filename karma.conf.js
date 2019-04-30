module.exports = function (config) {
  config.set({
    frameworks: ['mocha', 'chai'],
    files: [
      /* load component files (we can use karma-browserify if
          we want to use node style 'require' statements instead) */
      'components/**/!(*.min).js',
    ],
    reporters: ['progress', 'coverage'],
    preprocessors: {
      'components/**/!(*.spec|*.min).js': ['coverage'],
    },
    coverageReporter: {
      type: 'lcovonly',
      dir: 'coverage/',
      subdir: '.',
      file: 'lcov.info',
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ['ChromeHeadless'],
    autoWatch: false,
    concurrency: Infinity,
  });
};
