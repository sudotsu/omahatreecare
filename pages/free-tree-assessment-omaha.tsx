import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Phone, Shield, Clock, CheckCircle, AlertTriangle, Award, Users, FileText, ChevronRight } from 'lucide-react'
import { CONTACT } from '../src/constants'
import { submitLeadForm, validateFormData, type FormSubmissionData } from '../src/lib/emailjs'

/**
 * High-Converting Landing Page: Free Tree Risk Assessment
 *
 * CTAs: Above fold, middle, and bottom
 * Forms: Inline contact form with EmailJS integration
 * Urgency: Same-day/next-day messaging throughout
 */

export default function FreeTreeAssessmentPage() {
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' })
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
      message: formData.message || 'Free tree risk assessment request',
      form_location: 'Free Tree Assessment Page',
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
      setFormData({ name: '', phone: '', email: '', message: '' })
      // Auto-hide form after 5 seconds
      setTimeout(() => {
        setShowForm(false)
        setSubmitMessage(null)
      }, 5000)
    } else {
      setSubmitMessage({ type: 'error', text: result.message })
    }
  }

  return (
    <>
      <Head>
        <title>FREE Same-Day Tree Risk Assessment Omaha | No Cost Quote in 24 Hours</title>
        <meta name="description" content="Get a FREE professional tree risk assessment in Omaha - same day or next day guaranteed. No-pressure evaluation from ISA certified arborist Andrew. Call or text anytime." />
        <link rel="canonical" href="https://omahatreecare.com/free-tree-assessment-omaha" />
        <meta property="og:title" content="FREE Same-Day Tree Assessment in Omaha - No Cost Quote" />
        <meta property="og:description" content="Expert tree risk assessment delivered within 24 hours. Zero cost, zero pressure. Text Andrew anytime." />
      </Head>

      <div className="min-h-screen bg-neutral-50">

        {/* HERO - Above the Fold with Dual CTAs */}
        <section className="bg-gradient-to-br from-primary-700 via-primary-600 to-primary-500 text-white pt-32 pb-24 relative overflow-hidden">
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
          </div>

          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-5xl relative z-10">
            {/* Trust Badge */}
            <div className="flex items-center justify-center gap-2 mb-6">
              <Shield className="w-6 h-6 text-white" aria-hidden="true" />
              <span className="text-white font-semibold text-sm tracking-wide">ISA CERTIFIED ARBORIST • FULLY INSURED</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl md:text-6xl font-bold text-center mb-6 leading-tight">
              FREE Tree Risk Assessment<br />
              <span className="text-primary-100">Same Day or Next Day Guaranteed</span>
            </h1>

            {/* Subheadline with urgency */}
            <p className="text-xl md:text-2xl text-center text-white mb-4 max-w-3xl mx-auto">
              Worried about a dangerous tree? Get expert eyes on it within 24 hours.
            </p>
            <p className="text-lg text-center text-primary-100 mb-10 max-w-2xl mx-auto">
              Zero cost. Zero pressure. Just honest advice from a local tree expert who lives in Omaha.
            </p>

            {/* CTA Buttons - Above Fold */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              {!showForm ? (
                <button
                  onClick={() => setShowForm(true)}
                  className="group inline-flex items-center justify-center gap-2 bg-white text-primary-600 hover:bg-primary-50 px-10 py-5 rounded-lg text-xl font-bold transition-all shadow-2xl hover:scale-105"
                >
                  <FileText size={28} aria-hidden="true" />
                  Give Me A Free Estimate
                  <ChevronRight className="group-hover:translate-x-1 transition-transform" size={24} aria-hidden="true" />
                </button>
              ) : (
                <button
                  onClick={() => setShowForm(false)}
                  className="inline-flex items-center justify-center gap-2 bg-neutral-800 hover:bg-neutral-900 text-white px-8 py-4 rounded-lg text-lg font-bold transition-all"
                >
                  Hide Form
                </button>
              )}

              <a
                href={`tel:${CONTACT.phoneRaw}`}
                className="inline-flex flex-col items-center justify-center bg-alert-500 hover:bg-alert-600 px-10 py-5 rounded-lg text-white transition-all shadow-2xl hover:scale-105"
              >
                <span className="text-sm font-semibold mb-1">Urgent? Call/Text Andrew, Anytime of the Day</span>
                <span className="text-2xl font-bold flex items-center gap-2">
                  <Phone size={24} aria-hidden="true" />
                  {CONTACT.phone}
                </span>
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-8 text-sm text-primary-100">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" aria-hidden="true" />
                <span>Response in 2 hours or less</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" aria-hidden="true" />
                <span>On-site within 24 hours</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" aria-hidden="true" />
                <span>No sales pitch, just facts</span>
              </div>
            </div>
          </div>
        </section>

        {/* INLINE FORM - Flips in when CTA clicked */}
        {showForm && (
          <section className="bg-white border-y-4 border-primary-500 py-12 shadow-xl">
            <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-2xl">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-neutral-900 mb-2">Get Your Free Assessment</h2>
                <p className="text-lg text-neutral-600">Andrew will call you within 2 hours (or first thing tomorrow if after 7pm)</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-neutral-900 mb-2">Your Name *</label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-neutral-200 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors"
                      placeholder="John Smith"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-neutral-900 mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-neutral-200 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors"
                      placeholder="(402) 555-1234"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-neutral-900 mb-2">Email (optional)</label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-neutral-200 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors"
                    placeholder="john@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-neutral-900 mb-2">Tell us about your tree concern</label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-neutral-200 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors"
                    placeholder="Large oak tree leaning toward house after last storm..."
                  />
                </div>

                {submitMessage && (
                  <div
                    className={`p-4 rounded-lg ${
                      submitMessage.type === 'success'
                        ? 'bg-primary-100 border-2 border-primary-500 text-primary-900'
                        : 'bg-alert-100 border-2 border-alert-500 text-alert-900'
                    }`}
                  >
                    {submitMessage.text}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full px-8 py-5 rounded-lg text-xl font-bold transition-all shadow-lg hover:shadow-xl ${
                    isSubmitting
                      ? 'bg-neutral-400 cursor-not-allowed'
                      : 'bg-primary-500 hover:bg-primary-600 text-white'
                  }`}
                >
                  {isSubmitting ? 'Sending...' : 'Send My Free Assessment Request'}
                </button>

                <p className="text-center text-sm text-neutral-600">
                  By submitting, you agree to receive a call or text from Andrew. No spam, ever.
                </p>
              </form>
            </div>
          </section>
        )}

        {/* WHAT YOU GET - Value Proposition */}
        <section className="py-16 bg-neutral-100">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-neutral-900 mb-4">What You Get (100% Free)</h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto">No catch. No hidden fees. Just a genuine safety check from someone who cares about Omaha trees.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white border-2 border-neutral-200 rounded-xl p-8 hover:border-primary-500 transition-all">
                <div className="w-14 h-14 bg-primary-100 rounded-lg flex items-center justify-center mb-6">
                  <AlertTriangle className="w-8 h-8 text-primary-600" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-3">15-Minute On-Site Inspection</h3>
                <p className="text-neutral-600 mb-4">Andrew walks your property, examines the tree in question, and checks for hidden hazards you might miss.</p>
                <ul className="space-y-2 text-sm text-neutral-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Structural stability check</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Decay & fungus identification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Immediate danger assessment</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white border-2 border-neutral-200 rounded-xl p-8 hover:border-primary-500 transition-all">
                <div className="w-14 h-14 bg-primary-100 rounded-lg flex items-center justify-center mb-6">
                  <FileText className="w-8 h-8 text-primary-600" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-3">Honest Risk Evaluation</h3>
                <p className="text-neutral-600 mb-4">Get straight answers. If your tree is healthy, Andrew will tell you. If it&apos;s dangerous, you&apos;ll know exactly why.</p>
                <ul className="space-y-2 text-sm text-neutral-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Zero-pressure recommendations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Plain English explanations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span>DIY options when possible</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white border-2 border-neutral-200 rounded-xl p-8 hover:border-primary-500 transition-all">
                <div className="w-14 h-14 bg-primary-100 rounded-lg flex items-center justify-center mb-6">
                  <Award className="w-8 h-8 text-primary-600" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-3">Written Quote (If Needed)</h3>
                <p className="text-neutral-600 mb-4">If work is recommended, you&apos;ll get a detailed quote before we leave. No follow-up calls, no sales pitch.</p>
                <ul className="space-y-2 text-sm text-neutral-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Itemized pricing breakdown</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Multiple service options</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Good for 30 days, no expiration games</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* SOCIAL PROOF - Why People Trust This */}
        <section className="py-16 bg-steel-50">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-neutral-900 mb-4">Why Omaha Homeowners Trust This Assessment</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white rounded-xl p-8 shadow-md">
                <div className="flex items-start gap-4 mb-4">
                  <Users className="w-10 h-10 text-steel-700 flex-shrink-0" aria-hidden="true" />
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-2">It&apos;s Actually Free</h3>
                    <p className="text-neutral-700">
                      Not &quot;free estimate then we pressure you.&quot; Andrew invests this time to build neighborhood relationships.
                      If your tree is healthy, he&apos;ll tell you and leave. No strings attached.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-md">
                <div className="flex items-start gap-4 mb-4">
                  <Shield className="w-10 h-10 text-steel-700 flex-shrink-0" aria-hidden="true" />
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-2">You&apos;re Talking to the Expert</h3>
                    <p className="text-neutral-700">
                      Not a salesperson. Not an estimator. Andrew is the ISA Certified Arborist who will actually do the work.
                      He lives in Omaha and has for years.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-md">
                <div className="flex items-start gap-4 mb-4">
                  <Clock className="w-10 h-10 text-steel-700 flex-shrink-0" aria-hidden="true" />
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-2">Same Day or Next Day, Guaranteed</h3>
                    <p className="text-neutral-700">
                      Call before 5pm, Andrew can usually be there same day. Call later? First thing next morning.
                      We know tree worries keep you up at night.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-md">
                <div className="flex items-start gap-4 mb-4">
                  <Award className="w-10 h-10 text-steel-700 flex-shrink-0" aria-hidden="true" />
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-2">Peace of Mind, Not a Sales Pitch</h3>
                    <p className="text-neutral-700">
                      The goal is simple: give you the truth so you can sleep better. If removal is needed, you&apos;ll know why.
                      If not, you saved money and gained confidence.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MID-PAGE CTA - Second Conversion Point */}
        <section className="bg-gradient-to-r from-alert-500 to-alert-600 py-16">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Stop Worrying. Get Answers Within 24 Hours.
            </h2>
            <p className="text-xl text-white mb-8 opacity-90">
              No cost. No commitment. Just expert eyes on your tree concern.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {!showForm ? (
                <button
                  onClick={() => {
                    setShowForm(true)
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                  className="inline-flex items-center justify-center gap-2 bg-white text-alert-600 hover:bg-neutral-100 px-10 py-5 rounded-lg text-xl font-bold transition-all shadow-2xl"
                >
                  <FileText size={28} aria-hidden="true" />
                  Give Me A Free Estimate
                </button>
              ) : (
                <a
                  href="#form"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="inline-flex items-center justify-center gap-2 bg-white text-alert-600 hover:bg-neutral-100 px-10 py-5 rounded-lg text-xl font-bold transition-all shadow-2xl"
                >
                  Jump to Form Above
                </a>
              )}

              <a
                href={`tel:${CONTACT.phoneRaw}`}
                className="inline-flex flex-col items-center justify-center bg-neutral-900 hover:bg-neutral-800 px-10 py-5 rounded-lg text-white transition-all shadow-2xl"
              >
                <span className="text-sm font-semibold mb-1">Urgent? Call/Text Andrew, Anytime of the Day</span>
                <span className="text-2xl font-bold flex items-center gap-2">
                  <Phone size={24} aria-hidden="true" />
                  {CONTACT.phone}
                </span>
              </a>
            </div>
          </div>
        </section>

        {/* COMMON CONCERNS - FAQ Style */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl">
            <h2 className="text-4xl font-bold text-center text-neutral-900 mb-12">Common Questions</h2>

            <div className="space-y-6">
              <div className="border-l-4 border-primary-500 pl-6 py-4">
                <h3 className="text-xl font-bold text-neutral-900 mb-2">Is this really free, or is there a catch?</h3>
                <p className="text-neutral-700">
                  It&apos;s genuinely free. Andrew invests 15 minutes per assessment to build long-term relationships in Omaha neighborhoods.
                  If your tree is healthy, you won&apos;t hear from us again unless you reach out. If work is needed and you hire us, great. If not, no hard feelings.
                </p>
              </div>

              <div className="border-l-4 border-primary-500 pl-6 py-4">
                <h3 className="text-xl font-bold text-neutral-900 mb-2">How quickly can someone come out?</h3>
                <p className="text-neutral-700">
                  Same day if you call before 5pm (most days). Otherwise, first thing the next morning. We know tree concerns are stressful—we prioritize speed.
                </p>
              </div>

              <div className="border-l-4 border-primary-500 pl-6 py-4">
                <h3 className="text-xl font-bold text-neutral-900 mb-2">Will I be pressured to buy services I don&apos;t need?</h3>
                <p className="text-neutral-700">
                  Absolutely not. Andrew&apos;s reputation is built on honesty. If pruning is safer than removal, he&apos;ll say so. If you can wait a few months, he&apos;ll tell you.
                  His goal is to provide accurate information, not to upsell.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}