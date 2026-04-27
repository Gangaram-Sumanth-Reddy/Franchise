import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          animations: ['framer-motion', 'gsap'],
          ui: ['react-icons'],
          utils: ['@studio-freight/lenis', 'swiper', 'three']
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    minify: 'terser',
    sourcemap: false,
    target: 'esnext'
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
    exclude: ['three']
  },
  server: {
    fs: {
      strict: true
    }
  }
})
