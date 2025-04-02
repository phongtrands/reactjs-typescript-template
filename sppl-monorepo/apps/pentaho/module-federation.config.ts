import { ModuleFederationConfig, SharedLibraryConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'pentaho',
  exposes: {
    './Module': './src/remote-entry.ts',
  },
  shared: (libraryName: string, sharedConfig: SharedLibraryConfig) => {
      const sharedLibraries = {
        // react: { singleton: true, eager: true, requiredVersion: '^18.0.0' },
        // 'react-dom': { singleton: true, eager: true, requiredVersion: '^18.0.0' },
        '@mui/material': { singleton: true, eager: true, requiredVersion: '^7.0.1' },
        '@emotion/react': { singleton: true, eager: true, requiredVersion: '^11.14.0' },
        '@emotion/styled': { singleton: true, eager: true, requiredVersion: '^11.14.0' },
      };
      console.log(sharedLibraries[libraryName]);
      if (sharedLibraries[libraryName]) {
        return {
          ...sharedLibraries[libraryName],
          ...sharedConfig,
        };
      }
  
      return undefined;
    },
};

/**
 * Nx requires a default export of the config to allow correct resolution of the module federation graph.
 **/
export default config;
