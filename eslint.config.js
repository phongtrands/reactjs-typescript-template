const nx = require('@nx/eslint-plugin');

module.exports = [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: ['**/dist'],
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
              sourceTag: 'scope:shell',
              onlyDependOnLibsWithTags: ['scope:datahub-app', 'scope:sapfin-app', 'scope:shared', 'scope:datahub'],
            },
            {
              sourceTag: 'scope:datahub-app',
              onlyDependOnLibsWithTags: ['scope:datahub', 'scope:shared'],
            },
            {
              sourceTag: 'scope:sapfin-app',
              onlyDependOnLibsWithTags: ['scope:sapfin', 'scope:shared'],
            },
            // {
            //   sourceTag: 'type:app',
            //   onlyDependOnLibsWithTags: ['type:feature', 'type:components'],
            // },
            {
              sourceTag: 'scope:shared',
              onlyDependOnLibsWithTags: ['scope:shared'],
            },
          ],
        },
      ],
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    // Override or add rules here
    rules: {},
  },
];
