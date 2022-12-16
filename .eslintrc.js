'use strict';

module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'airbnb-base',
    'plugin:eslint-plugin/recommended',
    'plugin:node/recommended',
  ],
  env: {
    node: true,
  },
  rules: {
    strict: 'off',
    'max-len': ['error', {
      code: 120,
      ignoreComments: true,
    }],
  },
  overrides: [
    {
      files: ['tests/**/*.js'],
      env: { mocha: true },
    },
  ],
};
