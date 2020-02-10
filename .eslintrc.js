module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  plugins: [
    'svelte3'
  ],
  overrides: [
    {
      files: ['**/*.svelte'],
      processor: 'svelte3/svelte3',
      rules: {
        'no-multiple-empty-lines': 'off',
        'import/prefer-default-export': 'off',
        'import/no-mutable-exports': 'off',
        'no-unused-vars': 'off',
        'import/no-extraneous-dependencies': 'off',
        'import/first': 'off'
      },
    }
  ],
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
  },
};
