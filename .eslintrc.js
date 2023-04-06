module.exports = {
  root: true,
  extends: 'standard',
  rules: {
    'comma-dangle': [1, 'only-multiline'],
    indent: ['error', 2, { MemberExpression: 1 }],
    'space-before-function-paren': 0
  },
  parserOptions: {
    ecmaVersion: 2018
  },
  env: {
    node: true,
    mocha: true,
    es6: true
  }
}
