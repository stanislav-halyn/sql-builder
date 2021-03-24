/*
  This file includes best practice rules for eslint
*/

module.exports = {
  rules: {
    'lines-between-class-members': 'off',
    'no-else-return': ['error', { allowElseIf: true }],
    'arrow-parens': ['error', 'as-needed'],
    'newline-per-chained-call': ['error', { ignoreChainWithDepth: 2 }],
    'no-param-reassign': ['error', { props: false }],
    'no-underscore-dangle': 'off',
    'operator-linebreak': ['error', 'before'],
    'prefer-arrow-callback': ['error', { allowNamedFunctions: true }],
    'no-inline-comments': 'off',
    'no-return-await': 'error',
    'no-trailing-spaces': 'error'
  }
};
