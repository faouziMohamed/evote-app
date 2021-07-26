module.exports = {
  env: {
    es2021: true,
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
    'promise/catch-or-return': 'error',
    'no-console': 'warn',
    'no-alert': 'error',
    'no-empty': 'error',
    'no-implicit-coercion': 'warn',
    'no-var': 'warn',
    'no-empty-function': 'warn',
    'no-confusing-arrow': ['error', { allowParens: true }],
    'no-mixed-operators': 'error',
    'no-param-reassign': 'warn',
    'no-plusplus': ['warn', { allowForLoopAfterthoughts: true }],
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
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
