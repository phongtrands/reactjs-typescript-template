/// <reference types='vitest' />
import { resolve } from 'path';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig(() => ({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/sapfin',
  server: {
    port: 4200,
    host: 'localhost',
  },
  preview: {
    port: 4300,
    host: 'localhost',
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@core/helper': resolve(__dirname, '../../libs/core/helper/src/index.ts'),
      '@core/components': resolve(__dirname, '../../libs/core/components/src/index.ts'),
      '@core/types': resolve(__dirname, '../../libs/core/types/src/index.ts'),
      '@libs/auth': resolve(__dirname, '../../libs/auth/src/index.ts'),
    },
  },
  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },
  build: {
    outDir: './dist',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
}));
