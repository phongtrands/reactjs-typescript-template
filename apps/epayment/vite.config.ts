/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';

export default defineConfig(() => ({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/epayment',
  server: {
    port: 4201,
    host: 'localhost',
  },
  preview: {
    port: 4300,
    host: 'localhost',
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@core/services': resolve(__dirname, '../../libs/core/services/src/index.ts'),
      '@core/components': resolve(__dirname, '../../libs/core/components/src/index.ts'),
      '@libs/auth': resolve(__dirname, '../../libs/auth/src/index.ts'),
      '@epayment/services/stores': resolve(__dirname, '../../apps/epayment/src/services/stores/index.ts'),
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
