import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Example: proxying requests starting with /api to your backend
      '/api': {
        target: 'http://localhost:5001', // your backend server
        changeOrigin: true,
      },
    },
  },
})
