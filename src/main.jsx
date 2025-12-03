import { ViteReactSSG } from 'vite-react-ssg'
import { routes } from './routes'
import './index.css'
import { injectSpeedInsights } from '@vercel/speed-insights'

// SSG setup for static site generation
export const createRoot = ViteReactSSG(
  { routes },
  ({ router, isClient, initialState }) => {
    // No wrapper needed - using vite-react-ssg's built-in Head component
    return ({ children }) => children
  },
  () => {
    // Client-side only setup
    if (typeof window !== 'undefined') {
      injectSpeedInsights()
    }
  }
)
