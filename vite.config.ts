import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/promptPro-Editor/', // Define a base URL para o nome do repositório no GitHub Pages
  build: {
    outDir: 'dist',
  }
});