import path from 'path';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@routes': path.resolve(__dirname, 'src/routes'),
      // Add more aliases as needed
    },
  },
  // server: {
  //   host: "26.145.139.40",
  // },
  build: {
    chunkSizeWarningLimit: 10000
  }
})


