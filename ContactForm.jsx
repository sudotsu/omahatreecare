import emailjs from '@emailjs/browser';
import React, { useState } from 'react';

export default function ContactForm({ urgency = 'medium', pageSource = 'unknown' }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState('idle'); // idle, sending, success, error

  // Pull credentials from env vars or use placeholders (so build doesn't crash)
  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_placeholder';
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_placeholder';
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'key_placeholder';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone,
      message: formData.message,
      urgency: urgency,
      page_source: pageSource,
      submission_time: new Date().toLocaleString()
    };

    try {
      // Only try to send if we have real keys, otherwise simulate success for dev/build
      if (PUBLIC_KEY !== 'key_placeholder') {
        await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
      } else {
        console.log('Simulating EmailJS send (no keys configured):', templateParams);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus('error');
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
          placeholder="Your Name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
          placeholder="email@example.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Phone</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
          placeholder="(402) 555-0123"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Message</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows="4"
          className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
          placeholder="How can we help?"
        />
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        className={`w-full py-3 px-6 rounded-xl font-bold text-white transition-all ${
          status === 'sending'
            ? 'bg-slate-400 cursor-not-allowed'
            : urgency === 'high'
              ? 'bg-red-600 hover:bg-red-700 shadow-lg shadow-red-900/20'
              : 'bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-900/20'
        }`}
      >
        {status === 'sending' ? 'Sending...' : 'Send Request'}
      </button>

      {status === 'success' && (
        <div className="p-4 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg text-center">
          Message sent! We'll be in touch shortly.
        </div>
      )}
      {status === 'error' && (
        <div className="p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg text-center">
          Something went wrong. Please call us directly.
        </div>
      )}
    </form>
  );
}