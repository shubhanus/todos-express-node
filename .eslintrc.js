module.exports = {
  env: {
    es6: true,
    node: true,
    commonjs: true,
  },
  extends: ['prettier', 'airbnb-base'],
  plugins: ['prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: true,
        trailingComma: 'all',
      },
    ],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'consistent-return': 'off',
    'arrow-body-style': 'off',
    strict: 'off',
    'implicit-arrow-linebreak': 'off',
  },
};
