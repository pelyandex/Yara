module.exports = {
  extends: ['airbnb-typescript'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'no-plusplus': 0,
    'no-restricted-syntax': 0,
    'no-param-reassign': 0,
    'consistent-return': 0,
    'class-methods-use-this': 0,
    'no-underscore-dangle': 0,
    'no-tabs': 0,
    'max-classes-per-file': 0,
    'import/no-cycle': 0,
  },
  env: {
    browser: true,
    node: true,
  },
};
