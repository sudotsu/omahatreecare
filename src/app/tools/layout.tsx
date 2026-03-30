import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { CONTACT } from '@/lib/constants'

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <header className="bg-gradient-to-r from-amber-900 to-yellow-700 text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/#section-tools"
              className="flex items-center gap-2 text-white/90 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">All Tools</span>
            </Link>
            <div className="flex-1 text-center">
              <p className="text-xl md:text-2xl font-bold tracking-tight">
                {CONTACT.businessName}
              </p>
              <p className="text-sm text-amber-100 mt-0.5">
                Free diagnostic tools for Omaha homeowners
              </p>
            </div>
            <div className="w-24" />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 md:py-8">
        {children}
      </main>

      <footer className="bg-amber-900 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg font-semibold mb-2">Need Professional Tree Care?</p>
          <p className="text-amber-200 mb-4">
            {CONTACT.businessName} · Serving Omaha &amp; Surrounding Areas
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href={`tel:${CONTACT.phoneRaw}`}
              className="px-6 py-3 bg-yellow-500 text-amber-900 rounded-lg font-bold hover:bg-yellow-400 transition-colors text-lg"
            >
              Call or Text: {CONTACT.phone}
            </a>
            <a
              href={`mailto:${CONTACT.email}`}
              className="px-6 py-3 bg-amber-800 text-white rounded-lg font-semibold hover:bg-amber-700 transition-colors"
            >
              {CONTACT.email}
            </a>
          </div>
          <p className="text-amber-300 text-xs mt-6">
            Free diagnostic tools provided as a community service
          </p>
        </div>
      </footer>
    </div>
  )
}
