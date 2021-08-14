module.exports = {
  env: {
    es2021: true,
    browser: true,
  },
  extends: ['airbnb-base', 'prettier', 'plugin:promise/recommended'],
  parser: '@babel/eslint-parser',
  parserOptions: {
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: true,
      },
      { usePrettierrc: true },
    ],
    'lines-between-class-members': [
      'error',
      'always',
      { exceptAfterSingleLine: true },
    ],
    'promise/catch-or-return': 'error',
    'no-console': 'warn',
    'no-alert': 'error',
    'no-empty': 'error',
    'no-implicit-coercion': 'warn',
    'no-underscore-dangle': 'off',
    'no-var': 'warn',
    'no-use-before-define': ['error', { functions: false }],
    'no-empty-function': 'warn',
    'no-confusing-arrow': ['error', { allowParens: true }],
    'no-mixed-operators': 'error',
    'no-plusplus': ['warn', { allowForLoopAfterthoughts: true }],
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'no-param-reassign': ['error', { props: false }],
    'sort-imports': 'off',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'import/prefer-default-export': 'off',
  },
  plugins: ['prettier', 'simple-import-sort', 'import', 'promise'],
  settings: {
    'import/resolver': {
      'babel-module': {},
    },
  },
};
