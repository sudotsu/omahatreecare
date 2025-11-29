import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ViteReactSSG } from 'vite-react-ssg'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ViteReactSSG({
      // Routes to pre-render
      routes: ['/', '/tools'],
    }),
  ],
})
