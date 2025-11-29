import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// Note: vite-react-ssg is used via CLI commands (npm run dev/build)
// No plugin needed here - the CLI handles SSG configuration
export default defineConfig({
  plugins: [react()],
})
