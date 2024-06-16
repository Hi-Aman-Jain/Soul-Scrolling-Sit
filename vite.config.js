// vite.config.js
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: '/Soul-Scrolling-Site/',
  optimizeDeps: {
    include: ['three'],
  },
  build: {
    rollupOptions: {
      external: ['three'],
      output: {
        globals: {
          three: 'THREE',
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
