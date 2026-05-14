import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    react({
      fastRefresh: true,
    }),
  ],
  resolve: {
    alias: {
      // Allows: import { submitContactForm } from '@/lib'
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/@supabase') || id.includes('node_modules/ws')) {
            return 'supabase';
          }
          if (id.includes('node_modules/zod')) {
            return 'zod';
          }
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'react-core';
          }
          if (id.includes('node_modules/framer-motion')) {
            return 'framer-motion';
          }
          if (id.includes('node_modules/react-icons')) {
            return 'icons';
          }
          if (id.includes('node_modules/gsap')) {
            return 'gsap';
          }
          if (id.includes('node_modules/three') || id.includes('@react-three')) {
            return 'three';
          }
          if (id.includes('node_modules/@studio-freight/lenis')) {
            return 'lenis';
          }
          if (id.includes('node_modules/swiper')) {
            return 'swiper';
          }
          if (id.includes('node_modules/lottie-react')) {
            return 'lottie';
          }
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
    chunkSizeWarningLimit: 500,
    minify: 'esbuild',
    sourcemap: false,
    target: 'esnext',
    assetsInlineLimit: 8192,
    cssCodeSplit: true,
    cssMinify: true,
    reportCompressedSize: false,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', '@studio-freight/lenis'],
    exclude: ['three', '@react-three/fiber', '@react-three/drei'],
  },
  server: {
    fs: { strict: true },
  },
  publicDir: 'public',
  base: '/',
})
