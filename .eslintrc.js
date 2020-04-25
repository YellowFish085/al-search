module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    'brace-style': ['error', 'stroustrup'],
    'class-methods-use-this': 'off',
    'max-classes-per-file': 'off',
    'no-alert': 'off',
    'no-console': 'off',
    'prefer-destructuring': ['error', { object: true, array: false }],
  },
};
