import type { Metadata } from 'next'
import Link from 'next/link'
import { CONTACT } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Accessibility Statement | Midwest Roots Tree Services',
  description: 'Midwest Roots Tree Services is committed to making our website accessible to all users. Learn about our accessibility standards and how to report issues.',
  alternates: { canonical: `${CONTACT.siteUrl}/accessibility` },
  openGraph: {
    title: 'Accessibility Statement | Midwest Roots',
    description: 'Our commitment to web accessibility for all users.',
    url: `${CONTACT.siteUrl}/accessibility`,
  },
}

export default function AccessibilityPage() {
  return (
    <div className="bg-[#f8f6f1] min-h-screen">
      <section className="bg-[#11261B] text-white py-14 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-3">Accessibility Statement</h1>
          <p className="text-green-100">Midwest Roots Tree Services — omahatreecare.com</p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-14">
        <div className="prose prose-amber max-w-none space-y-8 text-amber-900">
          <div>
            <h2 className="text-2xl font-bold text-amber-900 mb-3">Our Commitment</h2>
            <p className="text-amber-800 leading-relaxed">
              Midwest Roots Tree Services is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying relevant accessibility standards.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-amber-900 mb-3">Standards We Follow</h2>
            <p className="text-amber-800 leading-relaxed">
              We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1, Level AA. These guidelines explain how to make web content more accessible to people with disabilities. Conformance with these guidelines helps make the web more user-friendly for everyone.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-amber-900 mb-3">What We Are Doing</h2>
            <ul className="list-disc pl-6 space-y-2 text-amber-800">
              <li>Using semantic HTML elements to communicate structure and meaning</li>
              <li>Providing text alternatives for non-text content</li>
              <li>Ensuring sufficient color contrast between text and backgrounds</li>
              <li>Making all functionality available via keyboard navigation</li>
              <li>Avoiding content that flashes more than three times per second</li>
              <li>Writing descriptive link text that makes sense out of context</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-amber-900 mb-3">Known Limitations</h2>
            <p className="text-amber-800 leading-relaxed">
              Some of our interactive diagnostic tools contain complex interfaces that may not be fully accessible in all screen reader environments. We are actively working to improve these.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-amber-900 mb-3">Report an Issue</h2>
            <p className="text-amber-800 leading-relaxed mb-4">
              If you experience any accessibility barriers on our site, please contact us. We take all reports seriously and aim to respond within 2 business days.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`tel:${CONTACT.phoneRaw}`}
                className="inline-flex items-center justify-center px-6 py-3 bg-[#11261B] text-white rounded-xl font-semibold hover:bg-[#0d1a0f] transition-colors text-center"
              >
                Call {CONTACT.phone}
              </a>
              <a
                href={`mailto:${CONTACT.email}?subject=${encodeURIComponent('Accessibility Issue')}`}
                className="inline-flex items-center justify-center px-6 py-3 bg-white border-2 border-amber-300 text-amber-900 rounded-xl font-semibold hover:border-amber-500 transition-colors text-center"
              >
                Email {CONTACT.email}
              </a>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-amber-900 mb-3">Compatibility</h2>
            <p className="text-amber-800 leading-relaxed">
              This website is designed to be compatible with the following assistive technologies:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-amber-800 mt-3">
              <li>Screen readers including NVDA, JAWS, and VoiceOver</li>
              <li>Browser zoom up to 200% without loss of functionality</li>
              <li>Keyboard-only navigation</li>
              <li>High contrast mode</li>
            </ul>
          </div>

          <div className="pt-4 border-t-2 border-amber-200">
            <p className="text-amber-700 text-sm">
              This statement was last reviewed on March 31, 2026.{' '}
              <Link href="/contact" className="underline hover:text-amber-900 transition-colors">
                Return to contact page
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
