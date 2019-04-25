module.exports = {
  plugins: [],
  recurseDepth: 10,
  opts: {
    recurse: true,
    destination: './doc/',
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
