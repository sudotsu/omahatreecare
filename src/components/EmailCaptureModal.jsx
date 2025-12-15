import emailjs from '@emailjs/browser';
import { CheckCircle, Mail, X } from 'lucide-react';
import PropTypes from 'prop-types'; // ADDED: Import PropTypes for prop validation
import React, { useState } from 'react';


/**
 * Renders an email capture modal that collects an email address, emits a tracking event when available, and shows a brief success state before closing.
 *
 * This version integrates with EmailJS to actually send the lead, replacing the non-functional setTimeout simulation.
 * @param {boolean} isOpen - Whether the modal is visible.
 * @param {() => void} onClose - Callback invoked to close the modal.
 * @returns {JSX.Element|null} The modal markup when open, or `null` when closed.
 */
export default function EmailCaptureModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  if (!isOpen) return null

  // Use the same environment variables as ContactForm.jsx
  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID; // Assuming one template is used for all leads
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // 1. ANALYTICS: Track the attempt
    if (window.gtag) {
      window.gtag('event', 'email_capture', {
        event_category: 'lead_generation',
        event_label: 'low_risk_email',
        value: 1,
        email: email
      })
    }

    const templateParams = {
        from_name: "Low Risk Lead (Email Capture)",
        user_phone: "N/A (Email Opt-in)",
        user_address: "N/A",
        message: `User signed up for seasonal tips via the Low Risk Modal. Email: ${email}`,
        urgency: 'low',
        page_source: 'low_risk_email_modal',
        from_email: email // Send the captured email in a field the template can use
    };

    try {
        // 2. SEND: Use EmailJS to send the lead
        await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);

        // 3. SUCCESS STATE
        setIsSubmitting(false)
        setIsSuccess(true)

        // Analytics: Track Success
        if (window.gtag) {
            window.gtag('event', 'generate_lead', {
                currency: "USD",
                value: 1.00 // Low arbitrary value for email lead
            });
        }

        // Close modal after 2 seconds
        setTimeout(() => {
          onClose()
          setIsSuccess(false)
          setEmail('')
        }, 2000)
    } catch (error) {
        console.error('EmailJS Error:', error.text);
        setIsSubmitting(false)
        alert('Subscription failed. Please check your network or try again later.');
    }
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>

        {!isSuccess ? (
          <>
            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                Great News! Your Tree Looks Healthy
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                Want to keep it that way? Get seasonal care tips delivered to your inbox.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-semibold py-3 px-6 rounded-lg transition transform hover:scale-105 disabled:transform-none"
              >
                {isSubmitting ? 'Subscribing...' : 'Get Tree Care Tips'}
              </button>

              <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
                Free seasonal tips • No spam • Unsubscribe anytime
              </p>
            </form>

            {/* Benefits */}
            <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                You'll receive:
              </p>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Spring pruning reminders (optimal timing for Omaha trees)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Winter storm prep checklist (before the ice hits)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span>EAB updates and ash tree protection tips</span>
                </li>
              </ul>
            </div>
          </>
        ) : (
          /* Success state */
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              You're All Set!
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              Check your inbox for a confirmation email.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

EmailCaptureModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}