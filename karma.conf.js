module.exports = function (config) {
  config.set({
    frameworks: ['mocha', 'chai'],

    files: [
      'test/**/*.js', // load test files

      /* load component files (we can use karma-browserify if
          we want to use node style 'require' statements instead) */
      '!(jsdoc.conf).js',
    ],
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ['ChromeHeadless'],
    autoWatch: false,
    concurrency: Infinity,
  });
};