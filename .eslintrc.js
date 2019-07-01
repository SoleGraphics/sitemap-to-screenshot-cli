module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
    mocha: true
  },
  extends: ['airbnb-base', 'prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {
    'arrow-parens': ['error', 'as-needed'],
    'no-console': 'off',
    'no-use-before-define': [
      'error',
      {
        functions: false
      }
    ]
  }
};
