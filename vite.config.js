import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { fileURLToPath } from 'url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        popup: resolve(fileURLToPath(new URL('.', import.meta.url)), 'popup.html'),
        background: resolve(fileURLToPath(new URL('.', import.meta.url)), 'src/background.js'),
        // contentScript: resolve(fileURLToPath(new URL('.', import.meta.url)), 'src/contentScript.js')
      },
      output: {
        entryFileNames: 'src/[name].js',
      }
    }
  }
})
