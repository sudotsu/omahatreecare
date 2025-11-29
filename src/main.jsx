import { ViteReactSSG } from 'vite-react-ssg'
import { routes } from './routes'
import './index.css'

// SSG setup for static site generation
export const createRoot = ViteReactSSG(
  { routes },
  ({ router, isClient }) => {
    // Custom setup can go here
    // router: the react-router instance
    // isClient: whether running in browser or during SSG
  },
)
