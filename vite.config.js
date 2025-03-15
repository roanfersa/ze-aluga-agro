import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  resolve: {
    alias: {
      'react-is': path.resolve(__dirname, './node_modules/react-is/'),
      './cjs/react-is.development.js': path.resolve(__dirname, './node_modules/react-is/cjs/react-is.production.min.js')
    }
  },
  build: {
    outDir: 'dist'
  }
})