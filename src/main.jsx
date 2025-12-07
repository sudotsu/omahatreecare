import { Analytics } from '@vercel/analytics/react'
import { inject } from '@vercel/analytics'
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
        <Analytics />
      </>
    )
  },
  () => {
    if (typeof window !== 'undefined') {
      inject()
      injectSpeedInsights()
    }
  }
)