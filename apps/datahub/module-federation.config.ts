import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'datahub',

  exposes: {
    './Module': './src/remote-entry.ts',
  },
};

export default config;
