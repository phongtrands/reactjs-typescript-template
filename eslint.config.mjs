import nx from '@nx/eslint-plugin';
import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier';
import tsPlugin from '@typescript-eslint/eslint-plugin';

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: ['**/dist', '**/vite.config.*.timestamp*', '**/vitest.config.*.timestamp*'],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?js$'],
          depConstraints: [
            {
              sourceTag: '*',
              onlyDependOnLibsWithTags: ['*'],
            },
            {
              sourceTag: 'scope:core',
              onlyDependOnLibsWithTags: [],
            },
            {
              sourceTag: 'scope:module',
              onlyDependOnLibsWithTags: ['scope:core'],
            },
            {
              sourceTag: 'scope:app',
              onlyDependOnLibsWithTags: ['scope:module', 'scope:core'],
            },
          ],
        },
      ],
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.cts', '**/*.mts', '**/*.js', '**/*.jsx', '**/*.cjs', '**/*.mjs'],
    plugins: {
      prettier: prettierPlugin,
      import: importPlugin,
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      'no-console': 'warn',
      'no-debugger': 'error',
      'no-trailing-spaces': 'warn',
      'no-multiple-empty-lines': ['error', { max: 1 }],
      'max-len': ['warn', { code: 120 }],
      semi: ['warn', 'always'],
      quotes: ['warn', 'single'],
      eqeqeq: ['error', 'always'],
      curly: 'error',
      'object-curly-spacing': ['error', 'always'],

      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/consistent-type-imports': 'warn',

      'prettier/prettier': [
        'warn',
        {
          semi: true,
          singleQuote: true,
          trailingComma: 'all',
          tabWidth: 2,
          printWidth: 120,
          endOfLine: 'auto',
        },
      ],

      'import/order': [
        'warn',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
        },
      ],
      // 'import/no-unresolved': 'error',
      'no-duplicate-imports': 'warn',
    },
  },
];
