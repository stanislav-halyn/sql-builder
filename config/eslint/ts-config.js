module.exports = {
  extends: [
    'airbnb-typescript',
    'plugin:import/typescript',
    'prettier',
    'prettier/@typescript-eslint',
    './base-config',
    './rules/typescript.rules'
  ],

  plugins: ['@typescript-eslint'],

  parser: '@typescript-eslint/parser',

  parserOptions: {
    project: './tsconfig.json'
  }
};
