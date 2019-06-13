module.exports = {
  plugins: ['.utils/playground.js'],
  recurseDepth: 10,
  opts: {
    recurse: true,
    destination: './doc/',
    template: "node_modules/docdash"
  },
  source: {
    includePattern: '.+\\.js(doc|x)?$',
    excludePattern: '(node_modules|out)',
  },
  sourceType: 'module',
  tags: {
    allowUnknownTags: true,
    dictionaries: ['jsdoc', 'closure'],
  },
  templates: {
    cleverLinks: false,
    monospaceLinks: false,
  },
};
