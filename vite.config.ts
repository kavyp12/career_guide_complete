import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/ai': { // Add this if testing AI locally
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
    allowedHosts: [
      'localhost',
      'enhc.tech',
      'www.enhc.tech',
      '16.16.129.30', // Optional, for IP access
    ],
  },
  build: {
    outDir: 'dist',
  },
});