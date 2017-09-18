module.exports = {
  'env': {
    'es6': true,
    'node': true,
    'browser': true,
    'jquery': true
  },
  'parser': 'babel-eslint',
  'extends': 'eslint:recommended',
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true
    },
    'ecmaVersion': 8,
    'sourceType': 'module'
  }
}
