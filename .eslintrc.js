module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  rules: {
    'comma-dangle': [1, 'only-multiline'],
    'indent': ['error', 2, {MemberExpression: 1 }],
    'space-before-function-paren': 0
  },
  plugins: [
    "@typescript-eslint"
  ],
  parser: "@typescript-eslint/parser",
  env: {
    node: true,
    mocha: true,
    es6: true
  }
}
