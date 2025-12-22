'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import emailjs from '@emailjs/browser';
import { Loader2, Send, Phone } from 'lucide-react';
import { CONTACT } from '@/constants';

// Import design system primitives
import { Input } from './primitives/Input';
import { Button } from './primitives/Button';
import { Textarea } from './primitives/Textarea';
import { Select } from './primitives/Select';
import { Alert } from './primitives/Alert';
import { Card } from './primitives/Card';

// Reduced friction schema: only name, email, and phone are required.
const schema = z.object({
  user_name: z.string().min(1, { message: "Name is required." }),
  user_email: z.string().email({ message: "Please enter a valid email." }),
  user_phone: z.string().min(7, { message: "Phone number is required." }),
  address: z.string().min(1, { message: "Address is required for estimates." }),
  service_type: z.string().optional(),
  message: z.string().optional(),
});

type ContactFormData = z.infer<typeof schema>;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      service_type: 'Not sure',
    }
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.error("Missing EmailJS Environment Variables");
      setSubmitStatus('error');
      setIsSubmitting(false);
      return;
    }

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          user_name: data.user_name,
          user_email: data.user_email,
          user_phone: data.user_phone,
          address: data.address,
          service_type: data.service_type || 'Not specified',
          message: data.message || 'No description provided',
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
      <Card variant="feature" className="text-center py-12 space-y-6">
        <div className="bg-primary-100 dark:bg-primary-900/30 w-20 h-20 rounded-full flex items-center justify-center mx-auto transition-transform hover:scale-110">
          <Send className="w-10 h-10 text-primary-600" />
        </div>
        <div className="space-y-2">
          <h3 className="text-3xl font-black text-content-heading uppercase italic tracking-tight">Estimate Requested</h3>
          <p className="text-content-body font-medium max-w-sm mx-auto">
            We&apos;ve received your details. One of our arborists will call you shortly to schedule your free on-site assessment.
          </p>
        </div>
        <Button variant="ghost" onClick={() => setSubmitStatus(null)}>
          Send Another Request
        </Button>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      {submitStatus === 'error' && (
        <Alert variant="error">
          <p className="font-bold">Submission Failed</p>
          <p className="text-sm">Please call us directly at <a href={`tel:${CONTACT.phoneRaw}`} className="underline">{CONTACT.phone}</a> for immediate assistance.</p>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="user_name" className="text-xs font-black uppercase tracking-widest text-content-muted ml-1">Full Name *</label>
          <Input
            id="user_name"
            {...register('user_name')}
            placeholder="John Smith"
            error={!!errors.user_name}
            aria-invalid={errors.user_name ? "true" : "false"}
          />
          {errors.user_name && <p className="text-xs text-alert-600 font-bold ml-1">{errors.user_name.message}</p>}
        </div>
        <div className="space-y-2">
          <label htmlFor="user_phone" className="text-xs font-black uppercase tracking-widest text-content-muted ml-1">Phone Number *</label>
          <Input
            id="user_phone"
            {...register('user_phone')}
            placeholder="(402) 555-0123"
            error={!!errors.user_phone}
            aria-invalid={errors.user_phone ? "true" : "false"}
          />
          {errors.user_phone && <p className="text-xs text-alert-600 font-bold ml-1">{errors.user_phone.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="user_email" className="text-xs font-black uppercase tracking-widest text-content-muted ml-1">Email Address *</label>
        <Input
          id="user_email"
          {...register('user_email')}
          type="email"
          placeholder="john@example.com"
          error={!!errors.user_email}
          aria-invalid={errors.user_email ? "true" : "false"}
        />
        {errors.user_email && <p className="text-xs text-alert-600 font-bold ml-1">{errors.user_email.message}</p>}
      </div>

      <div className="space-y-2">
        <label htmlFor="address" className="text-xs font-black uppercase tracking-widest text-content-muted ml-1">Service Address *</label>
        <Input
          id="address"
          {...register('address')}
          placeholder="1234 Maple St, Omaha, NE"
          error={!!errors.address}
          aria-invalid={errors.address ? "true" : "false"}
        />
        {errors.address && <p className="text-xs text-alert-600 font-bold ml-1">{errors.address.message}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="service_type" className="text-xs font-black uppercase tracking-widest text-content-muted ml-1">Service Type</label>
          <Select id="service_type" {...register('service_type')}>
            <option value="Not sure">I&apos;m not sure</option>
            <option value="Tree Removal">Tree Removal</option>
            <option value="Pruning">Pruning / Trimming</option>
            <option value="Storm Damage">Storm Damage</option>
            <option value="Stump Grinding">Stump Grinding</option>
          </Select>
        </div>
        <div className="flex items-end">
           <div className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-xl border border-primary-100 dark:border-primary-800 flex items-center gap-3 w-full">
              <Phone className="w-5 h-5 text-primary-600" />
              <div>
                <p className="text-[10px] font-black uppercase tracking-tighter text-primary-700/70">Urgent Storm Damage?</p>
                <a href={`tel:${CONTACT.phoneRaw}`} className="text-sm font-black text-primary-900 dark:text-primary-100 hover:underline">{CONTACT.phone}</a>
              </div>
           </div>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-xs font-black uppercase tracking-widest text-content-muted ml-1">How can we help? (Optional)</label>
        <Textarea
          id="message"
          {...register('message')}
          rows={3}
          placeholder="Describe your tree needs..."
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-6 h-6 animate-spin mr-2" />
            Processing...
          </>
        ) : (
          <>
            <Send className="w-5 h-5 mr-2" />
            Get My Free Estimate
          </>
        )}
      </Button>

      <p className="text-center text-[10px] font-bold text-content-muted uppercase tracking-widest">
        Property of {CONTACT.businessName}
      </p>
    </form>
  );
}
