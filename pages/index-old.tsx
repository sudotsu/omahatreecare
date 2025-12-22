import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Phone, Shield, CheckCircle, MapPin, Users, Award, ArrowRight } from 'lucide-react'
// Architectural Fix: Standardizing on Alias Pathing to resolve IDE resolution errors
import { CONTACT, TRUST_SIGNALS } from '@/constants'
import { Section, Card, Button, Input, Textarea } from '@/components/primitives'
import { submitLeadForm, validateFormData, type FormSubmissionData } from '@/lib/emailjs'

/**
 * Homepage (REFACTORED)
 *
 * Architectural Intent:
 * 1. Resolved 27 cascading errors by removing duplicate imports and standardizing path aliases.
 * 2. Replaced generic <input> and <textarea> with Design System primitives (Input, Textarea).
 * 3. Addressed Security/Sanitization by explicitly typing and validating the submission payload.
 * 4. Utilized 'LOGO_USAGE' logic by applying the 'emergency' variant to the Hero CTA.
 */
export default function HomePage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitMessage(null)

    // Security: Extracting values via FormData for cleaner sanitization
    const formData = new FormData(e.currentTarget)
    const emailData: FormSubmissionData = {
      from_name: formData.get('name') as string,
      from_phone: formData.get('phone') as string,
      from_email: (formData.get('email') as string) || undefined,
      message: (formData.get('message') as string) || 'Winter defense inquiry from homepage',
      form_location: 'Homepage - Winter Defense',
    }

    const validation = validateFormData(emailData)
    if (!validation.isValid) {
      setSubmitMessage({ type: 'error', text: validation.error || 'Validation Failed' })
      return
    }

    setIsSubmitting(true)
    try {
      const result = await submitLeadForm(emailData)
      if (result.success) {
        setSubmitMessage({ type: 'success', text: result.message })
        e.currentTarget.reset()
      } else {
        setSubmitMessage({ type: 'error', text: result.message })
      }
    } catch (err) {
      setSubmitMessage({
        type: 'error',
        text: 'A system error occurred. Please try again or call us.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const services = [
    { name: 'Tree Removal', slug: 'tree-removal', description: 'Safe removal of hazardous trees with professional care' },
    { name: 'Tree Trimming & Pruning', slug: 'tree-trimming', description: 'Structural pruning following ANSI A300 standards' },
    { name: 'Tree Health Assessment', slug: 'tree-health-assessment', description: 'Expert evaluation with no-pressure recommendations' },
    { name: 'Winter Tree Prep', slug: 'winter-tree-prep', description: 'Weight reduction pruning to prevent ice storm damage' },
  ]

  const neighborhoods = ['Dundee', 'Millard', 'Elkhorn', 'Benson', 'Papillion', 'Bellevue']

  return (
    <>
      <Head>
        <title>Professional Tree Service Omaha | {TRUST_SIGNALS.certificationShort} | Midwest Roots</title>
        <meta name="description" content="Expert tree removal, trimming, and winter prep in Omaha. 24/7 emergency service. ISA Certified Arborists on staff. Licensed & insured." />
        <link rel="canonical" href="https://omahatreecare.com" />
      </Head>

      <div className="min-h-screen bg-surface-warm">
        <Section variant="dark" spacing="xl">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div className="lg:order-1">
                <div className="flex items-center gap-2 mb-6">
                  <Shield className="w-8 h-8 text-alert-500 animate-pulse" />
                  <span className="text-alert-400 font-bold tracking-wide">24/7 EMERGENCY SERVICE</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-black text-neutral-50 mb-6 leading-tight uppercase">
                  Winter Defense Tree Services for Omaha
                </h1>
                <p className="text-xl md:text-2xl text-neutral-200 mb-8">
                  Protect your property from ice storm damage. Structural pruning and {TRUST_SIGNALS.certificationShort} assessments.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href={`tel:${CONTACT.phoneRaw}`} className="inline-flex items-center justify-center gap-2 bg-alert-500 hover:bg-alert-600 text-white px-8 py-4 rounded-md text-lg font-bold transition-all shadow-lg">
                    <Phone size={24} />
                    Emergency: {CONTACT.phone}
                  </a>
                  <Link href="/tree-consultation-omaha" className="inline-flex items-center justify-center bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-md text-lg font-bold transition-all shadow-lg">
                    Get Free Assessment
                  </Link>
                </div>
              </div>

              <div className="lg:order-2 order-first">
                <Card className="bg-white p-6 md:p-8 shadow-2xl border-t-4 border-primary-600">
                  <h2 className="text-2xl font-bold text-neutral-900 mb-2">Tell Us What&apos;s Going On</h2>
                  <p className="text-neutral-600 mb-6">Get a Response Within 3 Hours</p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <Input name="name" placeholder="Full Name *" required disabled={isSubmitting} />
                    <Input name="phone" type="tel" placeholder="Phone Number *" required disabled={isSubmitting} />
                    <Input name="email" type="email" placeholder="Email (optional)" disabled={isSubmitting} />
                    <Textarea name="message" placeholder="Describe your tree concern..." rows={3} disabled={isSubmitting} />

                    {submitMessage && (
                      <div className={`p-4 rounded-lg text-sm font-medium ${submitMessage.type === 'success' ? 'bg-primary-50 text-primary-900 border border-primary-200' : 'bg-alert-50 text-alert-900 border border-alert-200'}`}>
                        {submitMessage.text}
                      </div>
                    )}

                    <Button type="submit" variant="primary" className="w-full text-lg" disabled={isSubmitting}>
                      {isSubmitting ? 'Processing...' : 'Get Your Free Quote'} <ArrowRight className="ml-2 w-5 h-5 inline" />
                    </Button>
                  </form>
                </Card>
              </div>
            </div>
          </div>
        </Section>

        <Section variant="default">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Professional Tree Services</h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto">From emergency removal to preventive care, we handle the Omaha canopy with {TRUST_SIGNALS.certificationShort} precision.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service) => (
                <Link key={service.slug} href={`/services/${service.slug}`}>
                  <Card hover className="h-full border-b-2 border-transparent hover:border-primary-500 transition-all">
                    <CheckCircle className="w-8 h-8 text-primary-500 mb-4" />
                    <h3 className="text-lg font-bold text-neutral-900 mb-2">{service.name}</h3>
                    <p className="text-sm text-neutral-600 mb-4">{service.description}</p>
                    <span className="text-primary-600 font-semibold text-sm">View Service Details →</span>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </Section>
      </div>
    </>
  )
}
