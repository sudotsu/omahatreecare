import Head from 'next/head'
import Link from 'next/link'
import { Phone, Shield, CheckCircle, MapPin, Users, Award } from 'lucide-react'
import { CONTACT } from '../src/constants'
import { Section, Card } from '../src/components/primitives'

/**
 * Main landing page for Omaha Tree Care.
 *
 * Features a high-conversion Hero section with emergency focus,
 * a services overview, local trust signals, and SEO-optimized
 * neighborhood links.
 *
 * @returns {JSX.Element} The rendered homepage component
 */
export default function HomePage() {
  /**
   * Core service offerings displayed in the Services section.
   * Descriptions are optimized for SEO and readability.
   */
  const services = [
    { name: 'Tree Removal', slug: 'tree-removal', description: 'Safe removal of hazardous trees with zero property damage guarantee' },
    { name: 'Tree Trimming & Pruning', slug: 'tree-trimming', description: 'Structural pruning following ANSI A300 standards' },
    { name: 'Tree Health Assessment', slug: 'tree-health-assessment', description: 'Free expert evaluation with no-pressure recommendations' },
    { name: 'Winter Tree Prep', slug: 'winter-tree-prep', description: 'Weight reduction pruning to prevent ice storm damage' },
  ]

  /** List of top-tier neighborhoods for quick navigation and local SEO relevance. */
  const neighborhoods = ['Dundee', 'Millard', 'Elkhorn', 'Benson', 'Papillion', 'Bellevue']

  return (
    <>
      <Head>
        <title>Professional Tree Service Omaha | Winter Defense & Emergency Removal | Midwest Roots</title>
        <meta name="description" content="Expert tree removal, trimming, and winter prep in Omaha. 24/7 emergency service. Zero property damage guarantee." />
        <link rel="canonical" href="https://omahatreecare.com" />
      </Head>

      <div className="min-h-screen">
        {/* Hero Section - Dark variant */}
        <Section variant="dark" spacing="xl">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
            <div className="max-w-4xl">
              <div className="flex items-center gap-2 mb-6">
                <Shield className="w-8 h-8 text-alert-500 animate-pulse" aria-hidden="true" />
                <span className="text-alert-400 font-bold tracking-wide">24/7 EMERGENCY SERVICE</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-neutral-50 mb-6 leading-tight">Winter Defense Tree Services for Omaha</h1>
              <p className="text-xl md:text-2xl text-neutral-200 mb-8">Protect your property from ice storm damage. Expert tree removal, structural pruning, and hazard assessment.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href={`tel:${CONTACT.phoneRaw}`} className="inline-flex items-center justify-center gap-2 bg-alert-500 hover:bg-alert-600 text-white px-8 py-4 rounded-lg text-lg font-bold transition-colors shadow-lg">
                  <Phone size={24} aria-hidden="true" />
                  Emergency: {CONTACT.phone}
                </a>
                <Link href="/tree-consultation-omaha" className="inline-flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-lg text-lg font-bold transition-colors shadow-lg">
                  Get Free Consultation
                </Link>
              </div>
              <div className="mt-8 flex flex-wrap gap-6 text-sm text-neutral-300">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary-400" aria-hidden="true" />
                  <span>Zero Property Damage Guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary-400" aria-hidden="true" />
                  <span>Licensed & Fully Insured</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary-400" aria-hidden="true" />
                  <span>Free Estimates</span>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Services Section - Default (white) variant */}
        <Section variant="default">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-content-heading mb-4">Professional Tree Services</h2>
              <p className="text-xl text-content-body max-w-3xl mx-auto">From emergency removal to preventive care, we handle the trees other companies won&apos;t touch.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service) => (
                <Link key={service.slug} href={`/services/${service.slug}`}>
                  <Card hover className="h-full">
                    <CheckCircle className="w-8 h-8 text-primary-500 mb-4" aria-hidden="true" />
                    <h3 className="text-lg font-bold text-content-heading mb-2">{service.name}</h3>
                    <p className="text-sm text-content-body mb-4">{service.description}</p>
                    <span className="text-primary-600 font-semibold text-sm">Learn more →</span>
                  </Card>
                </Link>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link href="/services" className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold">View All Services →</Link>
            </div>
          </div>
        </Section>

        {/* Trust Section - Warm variant (alternates with white) */}
        <Section variant="warm">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-content-heading mb-4">Serving Omaha Since Day One</h2>
              <p className="text-xl text-content-body max-w-3xl mx-auto">Local experts who know your neighborhood&apos;s trees</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <MapPin className="w-8 h-8 text-steel-700 mb-4" aria-hidden="true" />
                <h3 className="text-lg font-bold text-content-heading mb-4">Service Areas</h3>
                <div className="flex flex-wrap gap-2">
                  {neighborhoods.map((n) => <span key={n} className="text-xs bg-steel-100 text-steel-700 px-2 py-1 rounded">{n}</span>)}
                </div>
                <Link href="/locations" className="inline-block mt-4 text-sm text-primary-600 hover:text-primary-700 font-semibold">See all areas →</Link>
              </Card>
              <Card>
                <Award className="w-8 h-8 text-steel-700 mb-4" aria-hidden="true" />
                <h3 className="text-lg font-bold text-content-heading mb-4">Certified & Insured</h3>
                <ul className="space-y-2 text-sm text-content-body">
                  <li>• ISA Certified Arborists</li>
                  <li>• Licensed & Bonded</li>
                  <li>• $2M Liability Insurance</li>
                </ul>
              </Card>
              <Card>
                <Users className="w-8 h-8 text-steel-700 mb-4" aria-hidden="true" />
                <h3 className="text-lg font-bold text-content-heading mb-4">Omaha Owned & Operated</h3>
                <p className="text-sm text-content-body mb-4">We live in the neighborhoods we serve. Your trees are our trees.</p>
                <p className="text-sm text-content-body"><strong>Contact:</strong> {CONTACT.email}</p>
              </Card>
            </div>
          </div>
        </Section>

        {/* CTA Section - Brand gradient variant */}
        <Section variant="gradient" spacing="lg">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Protect Your Property?</h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">Get a free, no-pressure tree assessment from Omaha&apos;s trusted tree care experts.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={`tel:${CONTACT.phoneRaw}`} className="inline-flex items-center justify-center gap-2 bg-white text-primary-600 hover:bg-primary-50 px-8 py-4 rounded-lg text-lg font-bold transition-colors shadow-lg">
                <Phone size={24} aria-hidden="true" />
                Call {CONTACT.phone}
              </a>
              <Link href="/tree-consultation-omaha" className="inline-flex items-center justify-center gap-2 bg-primary-800 hover:bg-primary-900 text-white px-8 py-4 rounded-lg text-lg font-bold transition-colors border-2 border-primary-400">
                Schedule Free Consultation
              </Link>
            </div>
            <p className="mt-6 text-primary-200 text-sm">Serving all Omaha neighborhoods • Licensed & Insured • Free Estimates</p>
          </div>
        </Section>
      </div>
    </>
  )
}
