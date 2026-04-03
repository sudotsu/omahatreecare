import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { CONTACT } from '@/lib/constants'
import { dmSerif } from "@/lib/fonts"

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F7F6F2]">
      {/* Premium Header */}
      <header className="sticky top-0 z-50 border-b border-forest/10 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 md:px-6">
          <div className="flex items-center justify-between">
            <Link
              href="/#section-tools"
              className="group flex items-center gap-2 text-stone-500 hover:text-forest transition-colors"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-stone-100 transition-colors group-hover:bg-gold/20 group-hover:text-forest">
                <ArrowLeft className="h-4 w-4" />
              </div>
              <span className="text-sm font-bold uppercase tracking-wider">All Tools</span>
            </Link>
            
            <div className="flex flex-col items-center text-center">
              <p className={`${dmSerif.className} text-xl leading-none text-forest`}>
                Omaha Tree Care
              </p>
              <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.2em] text-gold">
                Tools & Resources
              </p>
            </div>

            <div className="hidden sm:block">
              <a
                href={`tel:${CONTACT.phoneRaw}`}
                className="text-sm font-bold text-forest hover:text-primary transition-colors"
              >
                {CONTACT.phone}
              </a>
            </div>
            {/* Mobile spacer to keep logo centered */}
            <div className="block sm:hidden w-10" />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 md:py-16 md:px-6">
        {children}
      </main>

      {/* Integrated Footer */}
      <footer className="border-t border-stone-200 bg-white py-16">
        <div className="container mx-auto px-4 text-center md:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Need Professional Expert Care?</p>
          <h2 className={`${dmSerif.className} mt-4 text-3xl text-forest md:text-4xl`}>
            Let&apos;s protect your property.
          </h2>
          
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href={`tel:${CONTACT.phoneRaw}`}
              className="min-w-[200px] rounded-sm bg-gold px-8 py-4 text-sm font-bold text-forest transition-all hover:bg-amber-400 hover:shadow-lg"
            >
              Call {CONTACT.phone}
            </a>
            <Link
              href="/contact"
              className="min-w-[200px] rounded-sm border-2 border-forest px-8 py-4 text-sm font-bold text-forest transition-all hover:bg-forest hover:text-white"
            >
              Request Free Estimate
            </Link>
          </div>
          
          <p className="mt-12 text-[10px] font-medium uppercase tracking-widest text-stone-400">
            Certified Arborist · Licensed & Insured · Serving Omaha
          </p>
        </div>
      </footer>
    </div>
  )
}
