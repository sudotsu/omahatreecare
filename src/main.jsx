import { Analytics } from '@vercel/analytics/react'; // <--- Restored
import { injectSpeedInsights } from '@vercel/speed-insights'
import { ViteReactSSG } from 'vite-react-ssg'
import './index.css'
import { routes } from './routes'

export const createRoot = ViteReactSSG(
  { routes },
  ({ router, isClient, initialState }) => {
    return ({ children }) => (
      <>
        {children}
        <Analytics /> {/* <--- Tracks speed/visitors for Vercel dashboard */}
      </>
    )
  },
  () => {
    if (typeof window !== 'undefined') {
      injectSpeedInsights()
    }
  }
)