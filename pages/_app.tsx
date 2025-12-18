import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useEffect } from 'react'
import '../src/index.css'

/**
 * Next.js App Component
 * Adapted from src/main.jsx.backup (Vite React SSG setup)
 *
 * Key migrations:
 * - Vercel Analytics: @vercel/analytics/react (same as Vite)
 * - Speed Insights: @vercel/speed-insights/next (Next.js specific)
 * - Global styles: imported from src/index.css
 * - Dark mode script: moved to _document.tsx
 */

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Dark mode initialization (client-side)
    // This runs after hydration to prevent flash
    try {
      const savedMode = localStorage.getItem('darkMode')
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      if (savedMode === 'true' || (savedMode === null && prefersDark)) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    } catch (e) {
      console.error('Dark mode initialization failed:', e)
    }
  }, [])

  return (
    <>
      <Head>
        {/* Default meta tags - can be overridden per page */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/images/favicon.ico" />
      </Head>

      <Component {...pageProps} />

      {/* Vercel Analytics - same as Vite setup */}
      <Analytics />

      {/* Speed Insights - Next.js specific package */}
      <SpeedInsights />
    </>
  )
}
