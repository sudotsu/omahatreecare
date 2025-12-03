import emailjs from '@emailjs/browser'
import { AlertCircle, CheckCircle, Send } from 'lucide-react'
import { useState } from 'react'

export default function ContactForm({ urgency = 'medium', pageSource = 'unknown' }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    message: '',
    bestTime: 'morning'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success' | 'error' | null

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      // Track form submission
      if (window.gtag) {
        gtag('event', 'form_submission', {
          event_category: 'lead_generation',
          event_label: pageSource,
          urgency: urgency
        })
      }

      // EmailJS configuration
      // TODO: Replace these with your actual EmailJS credentials
      const SERVICE_ID = 'service_76afgoi'
      const TEMPLATE_ID = 'template_8mkbzl7'
      const PUBLIC_KEY = 'awhJXJQLTLlTyG8WZ'

      // Send email via EmailJS
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        address: formData.address,
        message: formData.message,
        best_time: formData.bestTime,
        urgency: urgency,
        page_source: pageSource,
        submission_date: new Date().toLocaleDateString(),
        submission_time: new Date().toLocaleTimeString()
      }

      const response = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        templateParams,
        PUBLIC_KEY
      )

      console.log('EmailJS Response:', response)

      // Track successful submission
      if (window.gtag) {
        gtag('event', 'form_submission_success', {
          event_category: 'conversion',
          event_label: pageSource,
          value: urgency === 'high' ? 10 : 5
        })
      }

      setSubmitStatus('success')

      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          address: '',
          message: '',
          bestTime: 'morning'
        })
      }, 3000)

    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')

      // Track error
      if (window.gtag) {
        gtag('event', 'form_submission_error', {
          event_category: 'error',
          event_label: error.message
        })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitStatus === 'success') {
    return (
      <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-500 rounded-2xl p-8 text-center">
        <CheckCircle className="w-16 h-16 text-green-600 dark:text-green-400 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-green-900 dark:text-green-200 mb-2">
          Message Received!
        </h3>
        <p className="text-green-800 dark:text-green-300 mb-4">
          Thanks for reaching out. I'll get back to you {urgency === 'high' ? 'within 2 hours' : 'within 24 hours'}.
        </p>
        <p className="text-sm text-green-700 dark:text-green-400">
          Check your email for a confirmation.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {submitStatus === 'error' && (
        <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-500 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-red-900 dark:text-red-200">Submission Failed</p>
            <p className="text-sm text-red-800 dark:text-red-300">
              Please try calling instead: (402) 812-3294
            </p>
          </div>
        </div>
      )}

      {/* Name */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-semibold text-slate-300 mb-2"
        >
          Your Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
          placeholder="John Smith"
        />
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-semibold text-slate-300 mb-2"
        >
          Email Address *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
          placeholder="john@example.com"
        />
      </div>

      {/* Phone */}
      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-semibold text-slate-300 mb-2"
        >
          Phone Number *
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
          placeholder="(402) 555-1234"
        />
      </div>

      {/* Address */}
      <div>
        <label
          htmlFor="address"
          className="block text-sm font-semibold text-slate-300 mb-2"
        >
          Property Address (City is fine)
        </label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
          placeholder="Omaha, NE or full address"
        />
      </div>

      {/* Best Time to Call */}
      <div>
        <label
          htmlFor="bestTime"
          className="block text-sm font-semibold text-slate-300 mb-2"
        >
          Best Time to Call You Back
        </label>
        <select
          id="bestTime"
          name="bestTime"
          value={formData.bestTime}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
        >
          <option value="morning">Morning (8am-12pm)</option>
          <option value="afternoon">Afternoon (12pm-5pm)</option>
          <option value="evening">Evening (5pm-7pm)</option>
          <option value="anytime">Anytime</option>
        </select>
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-semibold text-slate-300 mb-2"
        >
          Tell Me About Your Tree Situation
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows="4"
          className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition resize-none"
          placeholder="Describe your tree concern, location of tree relative to structures, any visible damage, etc."
        ></textarea>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-bold py-4 px-8 rounded-lg transition transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Sending...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Send Message
          </>
        )}
      </button>

      <p className="text-sm text-slate-400 text-center">
        {urgency === 'high'
          ? "I'll respond within 2 hours during business hours"
          : "I'll get back to you within 24 hours"}
      </p>
    </form>
  )
}
