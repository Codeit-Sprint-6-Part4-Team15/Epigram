module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    project: './tsconfig.json',
    createDefaultProgram: true,
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
    'plugin:jsx-a11y/recommended',
    'next/core-web-vitals',
    'plugin:prettier/recommended',
  ],
  plugins: [
    'react',
    'react-hooks',
    '@typescript-eslint',
    'jsx-a11y',
    'import',
    'prettier',
  ],
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        required: {
          some: ['nesting', 'id'],
        },
      },
    ],
    "react/react-in-jsx-scope": "off", // Next.js doesn't require React to be in scope
    "react/prop-types": "off",
    "no-console": "error",
    "react/jsx-props-no-spreading": "off",
    '@typescript-eslint/semi': 'off',
    'react/jsx-filename-extension': ['warn', { extensions: ['.ts', '.tsx'] }],
    'no-useless-catch': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    'react/require-default-props': 'off',
    'react/jsx-no-useless-fragment': 'warn',
    'react-hooks/exhaustive-deps': 'off',
    'import/prefer-default-export': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {},
    },
  },
  overrides: [
    {
      files: ['*.tsx', '*.jsx'],
      rules: {
        '@typescript-eslint/no-use-before-define': 'off',
      },
    },
  ],
  ignorePatterns: ['next.config.mjs', 'postcss.config.mjs'],
};
