import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',      // Vercel looks here by default
    emptyOutDir: true    // Clears old build artifacts
  }
})
