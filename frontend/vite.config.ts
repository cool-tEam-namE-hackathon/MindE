import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import tailwindcss from '@tailwindcss/vite'

import { fileURLToPath, URL } from 'url';
import environment from 'vite-plugin-environment';

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [environment('all', { prefix: 'CANISTER_' }), environment('all', { prefix: 'DFX_' }), react(),
    tailwindcss(),
    TanStackRouterVite({ target: 'react', autoCodeSplitting: true }),],
  envDir: '../',
  define: {
    'process.env': process.env
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis'
      }
    }
  },
  resolve: {
    alias: [
      {
        find: 'declarations',
        replacement: fileURLToPath(new URL('../src/declarations', import.meta.url))
      }
    ]
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:4943',
        changeOrigin: true
      }
    },
    host: '127.0.0.1'
  }
})
