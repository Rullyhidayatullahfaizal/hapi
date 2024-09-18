import airbnbBase from 'eslint-config-airbnb-base';

export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        process: true,
      },
    },
    rules: {
      ...airbnbBase.rules, 
    },
  },
];
