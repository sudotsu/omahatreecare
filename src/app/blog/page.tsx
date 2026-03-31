import type { Metadata } from 'next'
import Link from 'next/link'
import { posts } from '@/data/blog/posts'
import { CONTACT } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Tree Care Blog | Midwest Roots Tree Services',
  description: 'Educational tree care articles for Omaha homeowners — EAB treatment, Iron Chlorosis, Bradford Pear failures, ice storm prep, and more. Written by a certified arborist.',
  alternates: { canonical: `${CONTACT.siteUrl}/blog` },
  openGraph: {
    title: 'Tree Care Blog | Midwest Roots',
    description: 'Real tree care education for Omaha homeowners. No generic filler.',
    url: `${CONTACT.siteUrl}/blog`,
  },
}

const categoryColors: Record<string, string> = {
  'Tree Health':   'bg-green-100 text-green-800',
  'Tree Care':     'bg-amber-100 text-amber-800',
  'Tree Selection':'bg-blue-100 text-blue-800',
  'Storm Prep':    'bg-red-100 text-red-800',
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    year:  'numeric',
    month: 'long',
    day:   'numeric',
  })
}

export default function BlogIndexPage() {
  return (
    <div className="bg-[#f8f6f1] min-h-screen">
      {/* Header */}
      <section className="bg-[#11261B] text-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-amber-400 font-semibold uppercase tracking-widest text-sm mb-4">Written by a Certified Arborist</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Tree Care Blog</h1>
          <p className="text-lg text-green-100 max-w-2xl mx-auto">
            Real information about the trees in your Omaha yard — EAB, soil problems, structural failures, storm prep. No generic filler.
          </p>
        </div>
      </section>

      {/* Posts */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="space-y-6">
          {posts.map(post => (
            <article key={post.slug} className="bg-white border-2 border-amber-200 rounded-2xl p-7 shadow-sm hover:border-amber-400 hover:shadow-md transition-all">
              <div className="flex items-center gap-3 mb-3">
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${categoryColors[post.category] ?? 'bg-amber-100 text-amber-800'}`}>
                  {post.category}
                </span>
                <time dateTime={post.date} className="text-sm text-amber-600">
                  {formatDate(post.date)}
                </time>
              </div>
              <h2 className="text-xl font-bold text-amber-900 mb-2">
                <Link href={`/blog/${post.slug}`} className="hover:text-[#11261B] transition-colors">
                  {post.title}
                </Link>
              </h2>
              <p className="text-amber-700 leading-relaxed mb-4">{post.excerpt}</p>
              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center gap-1 text-[#11261B] font-semibold text-sm hover:gap-2 transition-all"
              >
                Read article →
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-amber-50 border-t-2 border-amber-200 py-12 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-amber-900 mb-3">Have a Tree Question?</h2>
          <p className="text-amber-800 mb-6">Andrew offers free on-site assessments for Omaha homeowners. No obligation, no sales pitch.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={`tel:${CONTACT.phoneRaw}`}
              className="px-8 py-4 bg-[#11261B] text-white rounded-xl font-bold hover:bg-[#0d1a0f] transition-colors text-center"
            >
              Call {CONTACT.phone}
            </a>
            <Link
              href="/tools"
              className="px-8 py-4 bg-white border-2 border-amber-300 text-amber-900 rounded-xl font-semibold hover:border-amber-500 transition-colors text-center"
            >
              Try the Diagnostic Tools
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
