module.exports = {
  extends: ['plugin:@typescript-eslint/recommended', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: [
      './tsconfig.json',
      '@anrel-core/*/src/tsconfig.json',
      '@anrel-command/*/src/tsconfig.json',
      '@anrel-script/*/src/tsconfig.json',
      '@anrel-core/*/test/tsconfig.json',
      '@anrel-command/*/test/tsconfig.json',
      '@anrel-script/*/test/tsconfig.json',
    ],
  },
  env: {
    node: true,
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
  },
}
