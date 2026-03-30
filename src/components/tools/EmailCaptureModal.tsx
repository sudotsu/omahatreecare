'use client'

import emailjs from '@emailjs/browser'
import { CheckCircle, Mail, X } from 'lucide-react'
import { useState } from 'react'

const SERVICE_ID  = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID  ?? ''
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? ''
const PUBLIC_KEY  = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY  ?? ''

interface Props {
  isOpen: boolean
  onClose: () => void
}

export default function EmailCaptureModal({ isOpen, onClose }: Props) {
  const [email, setEmail]           = useState('')
  const [isSubmitting, setSubmitting] = useState(false)
  const [isSuccess, setSuccess]     = useState(false)

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'email_capture', {
        event_category: 'lead_generation',
        event_label: 'low_risk_email',
        value: 1,
      })
    }

    const templateParams = {
      from_name:    'Low Risk Lead (Email Capture)',
      user_phone:   'N/A (Email Opt-in)',
      user_address: 'N/A',
      message:      `User signed up for seasonal tips via the Low Risk Modal. Email: ${email}`,
      urgency:      'low',
      page_source:  'low_risk_email_modal',
      from_email:   email,
    }

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      setSubmitting(false)
      setSuccess(true)

      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'generate_lead', { currency: 'USD', value: 1.0 })
      }

      setTimeout(() => {
        onClose()
        setSuccess(false)
        setEmail('')
      }, 2000)
    } catch (error) {
      console.error('EmailJS error:', error)
      setSubmitting(false)
      alert('Subscription failed. Please try again or email us directly.')
    }
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>

        {!isSuccess ? (
          <>
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Great News! Your Tree Looks Healthy
              </h2>
              <p className="text-slate-600">
                Want to keep it that way? Get seasonal care tips delivered to your inbox.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg bg-white text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-semibold py-3 px-6 rounded-lg transition"
              >
                {isSubmitting ? 'Subscribing...' : 'Get Tree Care Tips'}
              </button>

              <p className="text-xs text-slate-500 text-center">
                Free seasonal tips · No spam · Unsubscribe anytime
              </p>
            </form>

            <div className="mt-6 pt-6 border-t border-slate-200">
              <p className="text-sm font-semibold text-slate-700 mb-3">You&apos;ll receive:</p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Spring pruning reminders (optimal timing for Omaha trees)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Winter storm prep checklist (before the ice hits)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>EAB updates and ash tree protection tips</span>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">You&apos;re All Set!</h3>
            <p className="text-slate-600">Check your inbox for a confirmation email.</p>
          </div>
        )}
      </div>
    </div>
  )
}
