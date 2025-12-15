import emailjs from '@emailjs/browser'
import { ArrowRight, CheckCircle, Zap } from 'lucide-react'
import React, { useState } from 'react'
import { CONTACT } from '../constants'

export default function FastQuote() {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    zip: '',
    service: '',
    urgency: 'normal',
    phone: ''
  })

  // Environment Variables
  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Analytics & Email Logic (kept same)
    if (window.gtag) {
      window.gtag('event', 'lead_submission', {
        event_category: 'fast_quote',
        event_label: formData.service
      })
    }
    const templateParams = {
      from_name: "Fast Quote Widget",
      user_phone: formData.phone,
      user_address: `Zip: ${formData.zip}`,
      message: `Service: ${formData.service}\nUrgency: ${formData.urgency}`,
      urgency: formData.urgency,
      page_source: 'fast_quote_widget',
      from_email: 'no-reply@fastquote.com'
    }
    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      setStep(3)
      setIsSubmitting(false)
      setTimeout(() => {
        setStep(1)
        setFormData({ zip: '', service: '', urgency: 'normal', phone: '' })
      }, 5000)
    } catch (error) {
      console.error('FastQuote Error:', error)
      alert('Sorry, there was an issue sending your request. Please call us directly.')
      setIsSubmitting(false)
    }
  }

  // Step 1: Zip & Service
  if (step === 1) {
    return (
      // FOREMAN FIX: bg-white on bg-stone-200. Added border-primary to define edges.
      <div className="bg-white rounded-xl shadow-xl p-6 border-2 border-primary/30">
        <div className="flex items-center gap-2 mb-4 text-primary font-bold border-b border-slate-100 pb-2">
          <Zap className="w-5 h-5 fill-current" />
          <h3 className="text-lg">Fast Quote Request</h3>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">ZIP CODE</label>
            <input
              type="text"
              name="zip"
              value={formData.zip}
              onChange={handleChange}
              placeholder="e.g. 68104"
              className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-300 focus:ring-2 focus:ring-primary outline-none text-slate-900 font-medium placeholder:text-slate-400"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">SERVICE NEEDED</label>
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-300 focus:ring-2 focus:ring-primary outline-none text-slate-900 font-medium"
            >
              <option value="">Select Service...</option>
              <option value="removal">Tree Removal</option>
              <option value="trimming">Trimming/Pruning</option>
              <option value="stump">Stump Grinding</option>
              <option value="emergency">Emergency/Storm</option>
              <option value="health">Health Check/EAB</option>
            </select>
          </div>
          <button
            onClick={() => {
              if (formData.zip && formData.service) setStep(2)
            }}
            disabled={!formData.zip || !formData.service}
            className="w-full bg-primary hover:bg-primary-dark disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 mt-2 shadow-md"
          >
            Next <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    )
  }

  // Step 2: Phone & Urgency
  if (step === 2) {
    return (
      <div className="bg-white rounded-xl shadow-xl p-6 border-2 border-primary/30">
        <button
          onClick={() => setStep(1)}
          className="text-xs text-slate-500 hover:text-primary mb-4 flex items-center font-medium"
        >
          ← Back to Service
        </button>
        <h3 className="font-bold text-slate-900 mb-4 text-lg">Where should we send the quote?</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">PHONE NUMBER</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="(402) 555-0123"
              required
              className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-300 focus:ring-2 focus:ring-primary outline-none text-slate-900 font-medium placeholder:text-slate-400"
            />
          </div>

          <div>
             <label className="block text-xs font-semibold text-slate-500 mb-1">URGENCY</label>
            <div className="flex gap-2 text-sm">
              <label className={`flex-1 p-3 rounded-lg border-2 cursor-pointer text-center transition-all font-medium ${formData.urgency === 'normal' ? 'bg-emerald-50 border-emerald-500 text-emerald-800' : 'border-slate-200 hover:border-slate-300 text-slate-600'}`}>
                <input
                  type="radio"
                  name="urgency"
                  value="normal"
                  checked={formData.urgency === 'normal'}
                  onChange={handleChange}
                  className="hidden"
                />
                Standard
              </label>
              <label className={`flex-1 p-3 rounded-lg border-2 cursor-pointer text-center transition-all font-medium ${formData.urgency === 'high' ? 'bg-red-50 border-red-500 text-red-800' : 'border-slate-200 hover:border-slate-300 text-slate-600'}`}>
                <input
                  type="radio"
                  name="urgency"
                  value="high"
                  checked={formData.urgency === 'high'}
                  onChange={handleChange}
                  className="hidden"
                />
                Urgent
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !formData.phone}
            className="w-full bg-primary hover:bg-primary-dark disabled:bg-slate-300 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md mt-2"
          >
            {isSubmitting ? 'Sending...' : (
              <>
                Get My Quote <Zap className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    )
  }

  // Step 3: Success
  return (
    <div className="bg-emerald-50 rounded-xl shadow-xl p-8 border-2 border-emerald-500 flex flex-col items-center text-center">
      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
        <CheckCircle className="w-8 h-8 text-emerald-600" />
      </div>
      <h3 className="font-bold text-emerald-900 text-xl mb-2">Request Received!</h3>
      <p className="text-emerald-800 mb-6">
        Andrew will review your info and call you shortly at <span className="font-bold">{formData.phone}</span>.
      </p>
      <a
        href={`tel:${CONTACT.phoneRaw}`}
        className="text-sm font-bold text-white bg-emerald-600 px-6 py-2 rounded-lg hover:bg-emerald-700 transition"
      >
        Call Now: {CONTACT.phone}
      </a>
    </div>
  )
}