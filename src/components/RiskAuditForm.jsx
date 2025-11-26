import emailjs from '@emailjs/browser';
import { AlertTriangle, Shield } from 'lucide-react';
import React, { useRef, useState } from 'react';

const RiskAuditForm = () => {
  const [formData, setFormData] = useState({
    address: '',
    phone: ''
  });
  const [formStatus, setFormStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ type: '', message: '' });

    // Basic validation
    if (!formData.address || !formData.phone) {
      setFormStatus({
        type: 'error',
        message: 'Please fill in all fields'
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // EmailJS configuration - now using environment variables with fallback
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_77y8j48';
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_534ddr9';
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'WMCnzw0M1hqlbYim1';

      // Check if EmailJS is configured
      if (serviceId === 'YOUR_SERVICE_ID') {
        // For development - just log to console
        if (import.meta.env.DEV) {
          console.log('Form submitted:', formData);
        }
        setFormStatus({
          type: 'success',
          message: 'Thanks! We\'ll contact you within 24 hours to schedule your risk audit.'
        });
        setFormData({ address: '', phone: '' });
        setIsSubmitting(false);
        return;
      }

      // Send email via EmailJS
      const result = await emailjs.send(
        serviceId,
        templateId,
        {
          property_address: formData.address,
          phone_number: formData.phone,
          submission_time: new Date().toLocaleString(),
        },
        publicKey
      );

      if (result.status === 200) {
        setFormStatus({
          type: 'success',
          message: 'Thanks! We\'ll contact you within 24 hours to schedule your risk audit.'
        });
        setFormData({ address: '', phone: '' });
      }
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Form submission error:', error);
      }
      setFormStatus({
        type: 'error',
        message: 'Something went wrong. Please call us at (402) 812-3294'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="audit" className="py-20 bg-slate-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-8 md:p-12 relative overflow-hidden shadow-2xl">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

          <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-10">
            <div className="lg:w-3/5">
              <div className="inline-block bg-orange-600 text-white text-xs font-black uppercase px-3 py-1 rounded mb-4">
                Limited Winter Availability
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                Get Your 15-Minute <span className="text-orange-500">Winter Risk Audit</span>
              </h2>
              <p className="text-slate-300 text-lg mb-8">
                This isn't a generic quote. It's a diagnostic walkthrough where we identify:
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <AlertTriangle size={20} className="text-orange-500 mr-3 mt-1 flex-shrink-0" aria-hidden="true" />
                  <span className="text-slate-300">Overhanging limbs threatening the roof or power lines.</span>
                </li>
                <li className="flex items-start">
                  <AlertTriangle size={20} className="text-orange-500 mr-3 mt-1 flex-shrink-0" aria-hidden="true" />
                  <span className="text-slate-300">Deadwood that will snap instantly in a deep freeze.</span>
                </li>
                <li className="flex items-start">
                  <AlertTriangle size={20} className="text-orange-500 mr-3 mt-1 flex-shrink-0" aria-hidden="true" />
                  <span className="text-slate-300">Structural defects invisible when leaves are on.</span>
                </li>
              </ul>

              <div className="bg-slate-900/50 p-4 rounded border border-slate-700 flex items-center gap-4">
                <Shield className="text-green-500 flex-shrink-0" size={24} aria-hidden="true" />
                <div>
                  <p className="text-white font-bold text-sm">The No-Pressure Promise</p>
                  <p className="text-slate-400 text-xs">We will tell you honestly if your trees are safe and need no work. We prioritize safety, not sales.</p>
                </div>
              </div>
            </div>

            <div className="lg:w-2/5 w-full">
              <form ref={formRef} onSubmit={handleSubmit} className="bg-white/5 border border-white/10 p-6 rounded-xl backdrop-blur-sm space-y-4">
                <h3 className="text-white font-bold text-xl mb-2">Secure Your Slot</h3>

                <div>
                  <label htmlFor="address" className="block text-xs font-bold text-slate-400 uppercase mb-1">
                    Property Address
                  </label>
                  <input
                    id="address"
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded p-3 text-white focus:border-orange-500 outline-none transition-colors"
                    placeholder="1234 Omaha St"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-xs font-bold text-slate-400 uppercase mb-1">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded p-3 text-white focus:border-orange-500 outline-none transition-colors"
                    placeholder="402-812-3294"
                    required
                  />
                </div>

                {formStatus.message && (
                  <div
                    className={`p-3 rounded ${formStatus.type === 'success' ? 'bg-green-500/20 border border-green-500/50 text-green-400' : 'bg-red-500/20 border border-red-500/50 text-red-400'}`}
                    role="alert"
                    aria-live="polite"
                  >
                    <p className="text-sm">{formStatus.message}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-black uppercase py-4 rounded shadow-lg transition-all"
                  aria-busy={isSubmitting}
                >
                  {isSubmitting ? 'SUBMITTING...' : 'BOOK RISK AUDIT'}
                </button>

                <p className="text-center text-slate-500 text-xs mt-2">
                  Your privacy is protected. No spam.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RiskAuditForm;
