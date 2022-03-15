import path from 'path';

import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react';
import alias from '@rollup/plugin-alias';
import resolve from '@rollup/plugin-node-resolve';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src', 'main.jsx'),
      name: 'sketch-ui',
      fileName: (format) => `sketch-ui.${format}.js`
    }
  },
  plugins: [
    alias({
      entries: [
        {
          find: 'entrypoints',
          replacement: path.resolve(__dirname, 'src', 'entrypoints')
        }
      ]
    }),
    resolve(),
    react()
  ]
})
