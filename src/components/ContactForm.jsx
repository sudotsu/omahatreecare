import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { AlertCircle, CheckCircle, Send, Loader2 } from 'lucide-react';

export default function ContactForm({ urgency = 'medium', pageSource = 'contact_page' }) {
  const form = useRef();
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('loading');

    // 1. ANALYTICS: Track the attempt
    if (window.gtag) {
      window.gtag('event', 'form_submission', {
        event_category: 'lead_generation',
        event_label: pageSource,
        urgency: urgency
      });
    }

    // 2. SEND: Using sendForm (Matches your template variables automatically)
    // NOTE: Ensure your .env variables are set!
    emailjs.sendForm(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      form.current,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )
    .then((result) => {
      setStatus('success');

      // Analytics: Track Success
      if (window.gtag) {
        window.gtag('event', 'generate_lead', {
            currency: "USD",
            value: urgency === 'high' ? 50.00 : 20.00 // Arbitrary lead value
        });
      }

      form.current.reset();
    }, (error) => {
      setStatus('error');
      console.error('EmailJS Error:', error.text);
    });
  };

  // SUCCESS STATE
  if (status === 'success') {
    return (
      <div className="bg-green-50 border-2 border-green-500 rounded-2xl p-8 text-center animate-fade-in">
        <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-green-900 mb-2">
          Message Received.
        </h3>
        <p className="text-green-800 mb-4">
          Thanks. Andrew or the crew will review your property via satellite and reach out shortly.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="text-sm font-bold text-green-700 underline hover:text-green-900"
        >
          Send another request
        </button>
      </div>
    );
  }

  // FORM STATE
  return (
    <form ref={form} onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow-sm border border-slate-100">

      {/* ERROR ALERT */}
      {status === 'error' && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
          <div>
            <p className="font-bold text-red-900">Transmission Failed</p>
            <p className="text-sm text-red-800">
              Technology is great when it works. Please just call/text us: <strong>(402) 812-3294</strong>.
            </p>
          </div>
        </div>
      )}

      {/* HIDDEN ANALYTICS FIELDS */}
      <input type="hidden" name="urgency" value={urgency} />
      <input type="hidden" name="page_source" value={pageSource} />

      {/* NAME */}
      <div>
        <label className="block text-sm font-bold text-slate-700 mb-1">Your Name *</label>
        <input
          type="text"
          name="user_name"
          required
          className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition outline-none"
          placeholder="Jane Doe"
        />
      </div>

      {/* PHONE & BEST TIME */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">Phone *</label>
          <input
            type="tel"
            name="user_phone"
            required
            className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            placeholder="(402) ..."
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">Best Time</label>
          <select
            name="best_time"
            className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
          >
            <option value="Anytime">Anytime</option>
            <option value="Morning">Morning</option>
            <option value="Afternoon">Afternoon</option>
            <option value="Evening">Evening</option>
          </select>
        </div>
      </div>

      {/* ADDRESS */}
      <div>
        <label className="block text-sm font-bold text-slate-700 mb-1">Property Address</label>
        <input
          type="text"
          name="user_address"
          className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
          placeholder="Street, City, Zip (Allows us to check satellite view)"
        />
      </div>

      {/* MESSAGE */}
      <div>
        <label className="block text-sm font-bold text-slate-700 mb-1">How can we help?</label>
        <textarea
          name="message"
          rows="4"
          className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none resize-none"
          placeholder="I have a Silver Maple leaning over the garage..."
        ></textarea>
      </div>

      {/* SUBMIT */}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-green-700 hover:bg-green-800 disabled:opacity-70 text-white font-bold py-4 px-8 rounded-lg transition transform hover:scale-[1.02] flex items-center justify-center gap-2"
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="animate-spin w-5 h-5" /> Sending...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" /> Request Assessment
          </>
        )}
      </button>

      <p className="text-xs text-slate-400 text-center">
        We respect your privacy. Direct contact only, no spam lists.
      </p>
    </form>
  );
}