import emailjs from '@emailjs/browser';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, CheckCircle, Loader2, Send } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { CONTACT } from '../constants';

// 1. Zod Validation Schema - REDUCED FRICTION
// We only demand to know WHO they are and HOW to reach them.
// The "What" (message/service) is now optional.
const schema = z.object({
  user_name: z.string().min(1, { message: "Name is required." }),
  user_email: z.string().email({ message: "Please enter a valid email." }),
  user_phone: z.string().min(7, { message: "Phone number is required." }), // Min 7 to catch basic errors, but permissive
  service_type: z.string().optional(),
  message: z.string().optional(),
  address: z.string().optional(),
});

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          user_name: data.user_name,
          user_email: data.user_email,
          user_phone: data.user_phone,
          // Fallbacks for optional fields so email doesn't look broken
          service_type: data.service_type || 'Not specified',
          message: data.message || 'No description provided',
          address: data.address || 'Not provided',
        },
        publicKey
      );

      setSubmitStatus('success');
      reset();
    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className="bg-green-50 p-8 rounded-lg border border-green-200 text-center shadow-sm">
        <div className="flex justify-center mb-4">
          <CheckCircle className="h-16 w-16 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-green-900 mb-2">Message Received</h3>
        <p className="text-green-800 mb-6">
          We have your contact info. We will call you shortly to discuss the details.
        </p>
        <button
          onClick={() => setSubmitStatus(null)}
          className="text-green-700 font-semibold hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-slate-100">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Request an Estimate</h2>

      {submitStatus === 'error' && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3 items-start">
          <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-red-900">Submission Failed</h4>
            <p className="text-sm text-red-700">
              Something went wrong. Please call us at <strong>{CONTACT.phone}</strong>.
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

        {/* Row 1: Name & Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1">
            <label htmlFor="user_name" className="block text-sm font-medium text-slate-700">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              id="user_name"
              type="text"
              placeholder="Your Name"
              {...register('user_name')}
              className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:outline-none transition-all ${
                errors.user_name
                  ? 'border-red-300 focus:ring-red-200 bg-red-50'
                  : 'border-slate-300 focus:ring-emerald-200 focus:border-emerald-500'
              }`}
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="user_phone" className="block text-sm font-medium text-slate-700">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              id="user_phone"
              type="tel"
              placeholder="(402)..."
              {...register('user_phone')}
              className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:outline-none transition-all ${
                errors.user_phone
                  ? 'border-red-300 focus:ring-red-200 bg-red-50'
                  : 'border-slate-300 focus:ring-emerald-200 focus:border-emerald-500'
              }`}
            />
          </div>
        </div>

        {/* Row 2: Email */}
        <div className="space-y-1">
          <label htmlFor="user_email" className="block text-sm font-medium text-slate-700">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            id="user_email"
            type="email"
            placeholder="email@address.com"
            {...register('user_email')}
            className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:outline-none transition-all ${
              errors.user_email
                ? 'border-red-300 focus:ring-red-200 bg-red-50'
                : 'border-slate-300 focus:ring-emerald-200 focus:border-emerald-500'
            }`}
          />
        </div>

        {/* Row 3: Address (Optional) */}
        <div className="space-y-1">
          <label htmlFor="address" className="block text-sm font-medium text-slate-700">
            Property Address <span className="text-slate-400 font-normal">(Optional)</span>
          </label>
          <input
            id="address"
            type="text"
            {...register('address')}
            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 focus:outline-none transition-all"
          />
        </div>

        {/* Row 4: Service Type (Optional) */}
        <div className="space-y-1">
          <label htmlFor="service_type" className="block text-sm font-medium text-slate-700">
            Service <span className="text-slate-400 font-normal">(Optional)</span>
          </label>
          <select
            id="service_type"
            {...register('service_type')}
            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 focus:outline-none transition-all"
          >
            <option value="">I'm not sure</option>
            <option value="Tree Removal">Tree Removal</option>
            <option value="Pruning / Trimming">Pruning / Trimming</option>
            <option value="Stump Grinding">Stump Grinding</option>
            <option value="Storm Damage">Storm Damage</option>
            <option value="Plant Health / EAB">Plant Health Care</option>
          </select>
        </div>

        {/* Row 5: Message (Optional) */}
        <div className="space-y-1">
          <label htmlFor="message" className="block text-sm font-medium text-slate-700">
            How can we help? <span className="text-slate-400 font-normal">(Optional)</span>
          </label>
          <textarea
            id="message"
            rows="3"
            placeholder="Leave blank if you prefer to discuss on the phone."
            {...register('message')}
            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 focus:outline-none transition-all"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="h-5 w-5" />
              Get My Free Estimate
            </>
          )}
        </button>

        <p className="text-xs text-slate-400 text-center mt-4">
          Or call us directly at <a href={`tel:${CONTACT.phoneRaw}`} className="text-emerald-600 hover:underline">{CONTACT.phone}</a>
        </p>
      </form>
    </div>
  );
}