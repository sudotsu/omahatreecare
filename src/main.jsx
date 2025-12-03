import { ViteReactSSG } from 'vite-react-ssg'
import { HelmetProvider } from 'react-helmet-async'
import { routes } from './routes'
import './index.css'
import { injectSpeedInsights } from '@vercel/speed-insights'

// SSG setup for static site generation
export const createRoot = ViteReactSSG(
  { routes },
  ({ router, isClient, initialState }) => {
    // Wrap with HelmetProvider for SEO metadata
    return ({ children }) => (
      <HelmetProvider context={initialState?.helmet || {}}>
        {children}
      </HelmetProvider>
    )
  },
  () => {
    // Client-side only setup
    if (typeof window !== 'undefined') {
      injectSpeedInsights()
    }
  }
)
