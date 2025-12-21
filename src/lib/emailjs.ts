/**
 * EmailJS Integration Utility
 *
 * Provides a unified interface for form submissions using EmailJS.
 * All environment variables are required and validated at runtime.
 *
 * Environment Variables Required:
 * - NEXT_PUBLIC_EMAILJS_SERVICE_ID
 * - NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
 * - NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
 */

import emailjs from '@emailjs/browser';

export interface FormSubmissionData {
  from_name: string;
  from_email?: string;
  from_phone: string;
  message?: string;
  address?: string;
  service_type?: string;
  form_location?: string;
}

export interface SubmissionResult {
  success: boolean;
  message: string;
  error?: string;
}

/**
 * Validates that all required EmailJS environment variables are present
 */
function validateEmailJSConfig(): { isValid: boolean; error?: string } {
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    return {
      isValid: false,
      error: 'Email service is not configured. Please contact support at (402) 812-3294.',
    };
  }

  return { isValid: true };
}

/**
 * Submits a lead form to EmailJS
 *
 * @param formData - The form data to submit
 * @returns Promise with success status and message
 */
export async function submitLeadForm(
  formData: FormSubmissionData
): Promise<SubmissionResult> {
  // Validate configuration first
  const configCheck = validateEmailJSConfig();
  if (!configCheck.isValid) {
    return {
      success: false,
      message: configCheck.error!,
      error: 'EMAILJS_CONFIG_MISSING',
    };
  }

  try {
    // Send email using EmailJS
    const response = await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
      formData as any,
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
    );

    if (response.status === 200) {
      return {
        success: true,
        message: 'Thank you! We will contact you within 24 hours.',
      };
    } else {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (error: any) {
    console.error('EmailJS submission error:', error);

    // Provide user-friendly error messages
    let userMessage = 'Unable to send your request. Please call us at (402) 812-3294.';

    if (error.text) {
      // EmailJS-specific error
      userMessage = 'There was a problem sending your request. Please try calling us at (402) 812-3294.';
    }

    return {
      success: false,
      message: userMessage,
      error: error.message || 'UNKNOWN_ERROR',
    };
  }
}

/**
 * Validates basic form fields
 *
 * @param formData - The form data to validate
 * @returns Object with isValid flag and error message if invalid
 */
export function validateFormData(formData: Partial<FormSubmissionData>): {
  isValid: boolean;
  error?: string;
} {
  if (!formData.from_name || formData.from_name.trim().length < 2) {
    return {
      isValid: false,
      error: 'Please enter your name (at least 2 characters).',
    };
  }

  if (!formData.from_phone || formData.from_phone.trim().length < 10) {
    return {
      isValid: false,
      error: 'Please enter a valid phone number (at least 10 digits).',
    };
  }

  // Email is optional, but if provided, do basic validation
  if (formData.from_email && formData.from_email.trim().length > 0) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.from_email)) {
      return {
        isValid: false,
        error: 'Please enter a valid email address.',
      };
    }
  }

  return { isValid: true };
}
