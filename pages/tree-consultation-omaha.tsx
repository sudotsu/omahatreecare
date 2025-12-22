/**
 * Tree Consultation Page (REFACTORED)
 *
 * Uses standardized PageHero + section patterns.
 * Includes EmailJS-integrated contact form.
 */

import { useState } from 'react'
import Head from 'next/head'
import { CONTACT } from '../src/constants'
import { PageHero } from '../src/components/PageHero'
import { IconBulletList, ProcessSteps, CTASection } from '../src/components/sections'
import { Section, Container, Button } from '../src/components/primitives'
import { Check } from 'lucide-react'
import { submitLeadForm, validateFormData, type FormSubmissionData } from '../src/lib/emailjs'

export default function TreeConsultationPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitMessage(null)

    // Prepare data for EmailJS
    const emailData: FormSubmissionData = {
      from_name: formData.name,
      from_phone: formData.phone,
      from_email: formData.email || undefined,
      address: formData.address || undefined,
      message: formData.message || 'Tree consultation request',
      form_location: 'Tree Consultation Omaha Page',
    }

    // Validate form data
    const validation = validateFormData(emailData)
    if (!validation.isValid) {
      setSubmitMessage({ type: 'error', text: validation.error! })
      return
    }

    // Submit to EmailJS
    setIsSubmitting(true)
    const result = await submitLeadForm(emailData)
    setIsSubmitting(false)

    if (result.success) {
      setSubmitMessage({ type: 'success', text: result.message })
      // Clear form on success
      setFormData({ name: '', phone: '', email: '', address: '', message: '' })
    } else {
      setSubmitMessage({ type: 'error', text: result.message })
    }
  }
  const pageTitle = 'Tree Consultation Omaha - Professional Assessment Before DIY | Midwest Roots'
  const metaDescription = `Get a professional tree risk assessment in Omaha before you DIY. Expert advice on safety, pruning vs removal, and storm risks. Call ${CONTACT.phone}.`
  const canonicalUrl = `${CONTACT.siteUrl}/tree-consultation-omaha`

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonicalUrl} />

        {/* OpenGraph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={`${CONTACT.siteUrl}/images/og-image.jpg`} />

        {/* JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Service',
              name: 'Tree Consultation Service',
              description: metaDescription,
              provider: {
                '@type': 'LocalBusiness',
                name: CONTACT.businessName,
                telephone: CONTACT.phone,
                email: CONTACT.email,
                address: {
                  '@type': 'PostalAddress',
                  streetAddress: CONTACT.streetAddress,
                  addressLocality: CONTACT.addressLocality,
                  addressRegion: CONTACT.addressRegion,
                  postalCode: CONTACT.postalCode,
                  addressCountry: CONTACT.addressCountry,
                },
              },
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
                description: 'Free consultation',
              },
            }),
          }}
        />
      </Head>

      {/* PageHero - with FREE badge */}
      <PageHero
        eyebrow="Free Consultation"
        title="Expert Tree Consultation Before You DIY"
        description="Get professional advice without the sales pressure. Know what you're dealing with before you pick up that chainsaw."
        badge={{
          text: '100% FREE - NO OBLIGATION',
          variant: 'success',
        }}
        variant="default"
      />

      {/* Contact Form Section */}
      <Section variant="warm" spacing="lg">
        <Container>
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-neutral-900 mb-3">Request Your Free Consultation</h2>
              <p className="text-lg text-neutral-600">
                Fill out the form below and we&apos;ll get back to you within 24 hours
              </p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 md:p-8 space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-neutral-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-neutral-100 disabled:cursor-not-allowed"
                    placeholder="John Smith"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-neutral-700 mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-neutral-100 disabled:cursor-not-allowed"
                    placeholder="(402) 555-1234"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-neutral-700 mb-2">
                  Email (optional)
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-neutral-100 disabled:cursor-not-allowed"
                  placeholder="john@email.com"
                />
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-semibold text-neutral-700 mb-2">
                  Address (optional)
                </label>
                <input
                  type="text"
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-neutral-100 disabled:cursor-not-allowed"
                  placeholder="123 Main St, Omaha, NE"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-neutral-700 mb-2">
                  What&apos;s your tree concern?
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-neutral-100 disabled:cursor-not-allowed"
                  placeholder="Large oak tree leaning toward house after last storm..."
                />
              </div>

              {submitMessage && (
                <div
                  className={`p-4 rounded-lg text-sm font-medium ${
                    submitMessage.type === 'success'
                      ? 'bg-primary-100 border-2 border-primary-500 text-primary-900'
                      : 'bg-alert-100 border-2 border-alert-500 text-alert-900'
                  }`}
                >
                  {submitMessage.text}
                </div>
              )}

              <Button
                type="submit"
                variant="primary"
                className="w-full text-lg font-bold"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Request Free Consultation'}
              </Button>

              <p className="text-center text-sm text-neutral-600">
                We&apos;ll contact you within 24 hours. No spam, no pressure.
              </p>
            </form>
          </div>
        </Container>
      </Section>

      {/* Why Get a Consultation - IconBulletList pattern */}
      <IconBulletList
        title="Why Get a Professional Consultation?"
        description="Most homeowner tree injuries happen during DIY work that should have been left to pros. Here's what a free consultation can prevent:"
        items={[
          {
            title: 'Safety Assessment',
            description:
              'Know if your tree is truly dangerous or just looks scary. Most homeowner injuries happen during DIY tree work that should have been left to pros.',
          },
          {
            title: 'Prune or Remove?',
            description:
              'Removing a healthy tree costs $2,000+. Pruning might cost $400. We will tell you honestly which you need (or if you need neither).',
          },
          {
            title: 'Disease Identification',
            description:
              'Is it Emerald Ash Borer, Oak Wilt, or just fall leaf drop? Misdiagnosis can waste thousands on unnecessary treatments.',
          },
          {
            title: 'Realistic Cost Ranges',
            description:
              'Know what you should actually pay before getting quotes. Avoid both low-ball hacks and overpriced operators.',
          },
        ]}
        background="white"
        iconVariant="check"
      />

      {/* What to Expect - ProcessSteps pattern */}
      <ProcessSteps
        title="What to Expect"
        description="No pressure, no obligations. Just honest professional advice."
        steps={[
          {
            title: '15-Minute Phone Call',
            description:
              'Describe your tree, your concerns, and what you are trying to accomplish',
          },
          {
            title: 'Honest Assessment',
            description:
              'We will tell you if it is DIY-safe or needs a pro. No sales pressure.',
          },
          {
            title: 'Next Steps (Your Choice)',
            description:
              'If you want a quote, we can schedule that. If not, no follow-up calls.',
          },
        ]}
        background="cream"
        layout="horizontal"
      />

      {/* CTA Section */}
      <CTASection
        title="Get Your Free Consultation"
        description="No obligation. No sales pitch. Just honest advice."
        primaryCTA={{
          label: CONTACT.phone,
          href: `tel:${CONTACT.phoneRaw}`,
        }}
        variant="primary"
        note="Available daily 7am - 9pm"
      />
    </>
  )
}
