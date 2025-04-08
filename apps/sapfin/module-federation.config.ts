import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'sapfin',

  exposes: {
    './Module': './src/remote-entry.ts',
  },
};

export default config;
