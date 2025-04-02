import { ModuleFederationConfig, SharedLibraryConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'shell',
  /**
   * To use a remote that does not exist in your current Nx Workspace
   * You can use the tuple-syntax to define your remote
   *
   * remotes: [['my-external-remote', 'https://nx-angular-remote.netlify.app']]
   *
   * You _may_ need to add a `remotes.d.ts` file to your `src/` folder declaring the external remote for tsc, with the
   * following content:
   *
   * declare module 'my-external-remote';
   *
   */
  remotes: ['pentaho'],
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
