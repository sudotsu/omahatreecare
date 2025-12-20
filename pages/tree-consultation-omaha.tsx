/**
 * Tree Consultation Page (REFACTORED)
 *
 * Uses standardized PageHero + section patterns.
 * Replace tree-consultation-omaha.tsx once approved.
 */

import Head from 'next/head'
import { CONTACT } from '../src/constants'
import { PageHero } from '../src/components/PageHero'
import { IconBulletList, ProcessSteps, CTASection } from '../src/components/sections'
import { Check } from 'lucide-react'

export default function TreeConsultationPage() {
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
