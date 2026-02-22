module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['src/*', 'electron/*', '../*'],
            message: 'Packages cannot import from an app boundary (`src` or `electron`). They must be isolated.',
          },
        ],
      },
    ],
  },
  overrides: [
    {
      files: ['src/**/*', 'electron/**/*'],
      rules: {
         'no-restricted-imports': 'off', // Allow app logic to import anything it needs
      }
    }
  ]
}
