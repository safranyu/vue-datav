module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/airbnb'],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'max-len': [
      'error',
      {
        code: 200
      }
    ],
    'arrow-parens': ['error', 'always'],
    'no-bitwise': 'off',
    'no-restricted-globals': 'off',
    'import/prefer-default-export': 'off',
    'no-multi-assign': 'off',
    'no-underscore-dangle': 0,
    'default-case': 0,
    'prefer-destructuring': [
      'error',
      {
        object: false,
        array: false
      }
    ],

    camelcase: 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'one-var': 'off',
    'import/no-cycle': 'off',
    'comma-dangle': 0,
    'implicit-arrow-linebreak': 0
  }
}
