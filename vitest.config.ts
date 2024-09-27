import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Maps '@/' to './src/'
    },
  },
  test: {
    environment: 'happy-dom', // or 'jsdom', 'node'
  },
});
