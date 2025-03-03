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
      '/ai': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
    allowedHosts: [
      'localhost',
      'enhc.tech',
      'www.enhc.tech',
      '16.16.129.30', // Your EC2 IP
    ],
    host: true, // Allow external access during dev
  },
  build: {
    outDir: 'dist',
  },
});