import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { posts, postsBySlug } from '@/data/blog/posts'
import { CONTACT } from '@/lib/constants'

interface PageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return posts.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = postsBySlug[slug]
  if (!post) return {}
  return {
    title: `${post.title} | Midwest Roots Tree Blog`,
    description: post.excerpt,
    alternates: { canonical: `${CONTACT.siteUrl}/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${CONTACT.siteUrl}/blog/${slug}`,
      type: 'article',
    },
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    year:  'numeric',
    month: 'long',
    day:   'numeric',
  })
}

/** Render markdown-ish content: ## headings, **bold**, paragraphs */
function renderContent(content: string) {
  const paragraphs = content.trim().split(/\n\n+/)
  return paragraphs.map((block, i) => {
    const trimmed = block.trim()
    if (!trimmed) return null

    if (trimmed.startsWith('## ')) {
      return (
        <h2 key={i} className="text-2xl font-bold text-amber-900 mt-10 mb-4">
          {trimmed.slice(3)}
        </h2>
      )
    }

    if (trimmed.startsWith('**') && trimmed.endsWith('**') && !trimmed.slice(2, -2).includes('**')) {
      return (
        <p key={i} className="font-semibold text-amber-900 leading-relaxed mb-4">
          {trimmed.slice(2, -2)}
        </p>
      )
    }

    // Handle inline bold within paragraphs
    const parts = trimmed.split(/(\*\*[^*]+\*\*)/)
    return (
      <p key={i} className="text-amber-800 leading-relaxed mb-4">
        {parts.map((part, j) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={j} className="font-semibold text-amber-900">{part.slice(2, -2)}</strong>
          }
          return part
        })}
      </p>
    )
  })
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = postsBySlug[slug]
  if (!post) notFound()

  const otherPosts = posts.filter(p => p.slug !== slug).slice(0, 3)

  return (
    <div className="bg-[#f8f6f1] min-h-screen">
      {/* Header */}
      <section className="bg-[#11261B] text-white py-14 px-6">
        <div className="max-w-3xl mx-auto">
          <nav className="text-green-300 text-sm mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <span className="mx-2">/</span>
            <span className="text-green-100 line-clamp-1">{post.title}</span>
          </nav>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-semibold px-3 py-1 bg-amber-400 text-[#11261B] rounded-full">
              {post.category}
            </span>
            <time dateTime={post.date} className="text-green-300 text-sm">
              {formatDate(post.date)}
            </time>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">{post.title}</h1>
          <p className="text-green-100 text-lg">{post.excerpt}</p>
          <p className="text-green-300 text-sm mt-4">By Andrew — Midwest Roots Tree Services, Omaha NE</p>
        </div>
      </section>

      {/* Article body */}
      <article className="max-w-3xl mx-auto px-6 py-14">
        {renderContent(post.content)}

        {/* Author note */}
        <div className="mt-12 pt-8 border-t-2 border-amber-200">
          <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-6">
            <p className="font-bold text-amber-900 mb-1">About the Author</p>
            <p className="text-amber-800 text-sm leading-relaxed">
              Andrew is the owner of Midwest Roots Tree Services and a certified arborist based in Omaha, Nebraska. He has been working with Omaha&apos;s trees for over three years and specializes in hazardous removal and tree health diagnostics.{' '}
              <Link href="/contact" className="underline hover:text-amber-900 transition-colors">
                Schedule a free assessment.
              </Link>
            </p>
          </div>
        </div>
      </article>

      {/* CTA */}
      <section className="bg-[#11261B] text-white py-12 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-3">Questions About Your Specific Trees?</h2>
          <p className="text-green-100 mb-6">Andrew offers free on-site assessments in Omaha and surrounding areas. No obligation.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={`tel:${CONTACT.phoneRaw}`}
              className="px-8 py-4 bg-amber-400 text-[#11261B] rounded-xl font-bold hover:bg-amber-300 transition-colors text-center"
            >
              Call {CONTACT.phone}
            </a>
            <Link
              href="/contact"
              className="px-8 py-4 bg-white/10 text-white border border-white/30 rounded-xl font-semibold hover:bg-white/20 transition-colors text-center"
            >
              Send a Message
            </Link>
          </div>
        </div>
      </section>

      {/* More posts */}
      {otherPosts.length > 0 && (
        <section className="max-w-4xl mx-auto px-6 py-14">
          <h2 className="text-2xl font-bold text-amber-900 mb-6">More Articles</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {otherPosts.map(p => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="bg-white border-2 border-amber-200 rounded-2xl p-5 hover:border-amber-400 hover:shadow-md transition-all group"
              >
                <p className="text-xs font-semibold text-amber-600 uppercase tracking-wide mb-2">{p.category}</p>
                <h3 className="font-bold text-amber-900 group-hover:text-[#11261B] transition-colors text-sm leading-snug">
                  {p.title}
                </h3>
              </Link>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link href="/blog" className="inline-flex items-center gap-2 text-[#11261B] font-semibold hover:gap-3 transition-all">
              View all articles →
            </Link>
          </div>
        </section>
      )}
    </div>
  )
}
