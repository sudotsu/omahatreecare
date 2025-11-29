# EmailJS Setup Guide - Omaha Tree Care

## Current Status

**Note:** This project currently does NOT use EmailJS or contact forms. The diagnostic tools are informational only and do not collect user data or send emails.

If you want to add contact forms or lead capture in the future, this guide shows how to integrate EmailJS.

---

## Why EmailJS?

- Free tier: 300 emails/month (sufficient for small sites)
- No backend required (perfect for static Vite sites)
- Works with Gmail, Outlook, or any email provider
- Easy integration with React

## When You Might Need This

You might want to add EmailJS if you want to:
- Capture leads from the homepage
- Allow users to email themselves their diagnostic results
- Add a "Contact Us" form
- Request follow-up consultations

## Complete Setup Guide

### Step 1: Create EmailJS Account

1. Go to https://www.emailjs.com
2. Click "Sign Up" (top right)
3. Use your business email: **andrew@midwestroots.info**
4. Verify your email address

### Step 2: Add Email Service

1. Once logged in, click "Email Services" in left sidebar
2. Click "Add New Service"
3. Choose "Gmail" (recommended) or your email provider
4. Click "Connect Account" and authorize
5. **COPY THE SERVICE ID** - looks like `service_abc1234`

### Step 3: Create Email Template

1. Click "Email Templates" in left sidebar
2. Click "Create New Template"
3. Give it a name: "Tree Care Inquiry"
4. In the template editor, use this format:

**Subject:**
```
🌲 New Tree Care Inquiry - {{subject}}
```

**Content:**
```
NEW INQUIRY FROM OMAHATREECARE.COM
===================================

Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone_number}}
Service Needed: {{service_type}}

Message:
{{message}}

===================================
Submitted: {{submission_time}}
Auto-sent from omahatreecare.com
```

5. Click "Save"
6. **COPY THE TEMPLATE ID** - looks like `template_xyz7890`

### Step 4: Get Your Public Key

1. Click your profile picture (top right)
2. Click "Account"
3. Scroll to "General" section
4. **COPY THE PUBLIC KEY** - looks like `BxYz123AbC456`

### Step 5: Install EmailJS Package

```bash
npm install @emailjs/browser
```

### Step 6: Add Contact Form Component

Create a new component file: `src/components/ContactForm.jsx`

```javascript
import { useState } from 'react'
import emailjs from '@emailjs/browser'

export function ContactForm() {
  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    phone_number: '',
    service_type: '',
    message: ''
  })
  const [status, setStatus] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    try {
      await emailjs.send(
        'YOUR_SERVICE_ID',     // Replace with your Service ID
        'YOUR_TEMPLATE_ID',    // Replace with your Template ID
        {
          ...formData,
          submission_time: new Date().toLocaleString()
        },
        'YOUR_PUBLIC_KEY'      // Replace with your Public Key
      )
      setStatus('success')
      setFormData({ from_name: '', from_email: '', phone_number: '', service_type: '', message: '' })
    } catch (error) {
      console.error('EmailJS error:', error)
      setStatus('error')
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Contact Us</h2>

      <input
        type="text"
        name="from_name"
        value={formData.from_name}
        onChange={handleChange}
        placeholder="Your Name"
        required
        className="w-full mb-4 px-4 py-2 border rounded"
      />

      <input
        type="email"
        name="from_email"
        value={formData.from_email}
        onChange={handleChange}
        placeholder="Your Email"
        required
        className="w-full mb-4 px-4 py-2 border rounded"
      />

      <input
        type="tel"
        name="phone_number"
        value={formData.phone_number}
        onChange={handleChange}
        placeholder="Phone Number"
        className="w-full mb-4 px-4 py-2 border rounded"
      />

      <select
        name="service_type"
        value={formData.service_type}
        onChange={handleChange}
        required
        className="w-full mb-4 px-4 py-2 border rounded"
      >
        <option value="">Select Service Type</option>
        <option value="tree-removal">Tree Removal</option>
        <option value="pruning">Pruning/Trimming</option>
        <option value="stump-grinding">Stump Grinding</option>
        <option value="emergency">Emergency Service</option>
        <option value="consultation">Consultation</option>
      </select>

      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="Tell us about your tree care needs..."
        rows="4"
        className="w-full mb-4 px-4 py-2 border rounded"
      />

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-6 rounded-lg font-semibold"
      >
        {status === 'sending' ? 'Sending...' : 'Send Message'}
      </button>

      {status === 'success' && (
        <p className="mt-4 text-emerald-600 dark:text-emerald-400">Message sent successfully!</p>
      )}

      {status === 'error' && (
        <p className="mt-4 text-red-600 dark:text-red-400">Failed to send. Please try again.</p>
      )}
    </form>
  )
}
```

### Step 7: Use the Component

Add the contact form to your homepage or create a dedicated contact page:

```javascript
// In src/pages/HomePage.jsx
import { ContactForm } from '../components/ContactForm'

// Add wherever you want the form to appear
<ContactForm />
```

### Step 8: Test It

1. Save all files
2. Start dev server: `npm run dev`
3. Fill out the form with test data
4. Check your email - you should receive the submission!

## Common Issues

### Issue: "emailjs is not defined"
**Fix:** Make sure you installed the package: `npm install @emailjs/browser`

### Issue: "Failed to send email"
**Fix:** Double-check your Service ID, Template ID, and Public Key are correct

### Issue: Not receiving emails
**Fix:**
1. Check your spam folder
2. Verify the email service is connected in EmailJS dashboard
3. Make sure you're using the correct email address
4. Test with a different email address

### Issue: CORS errors
**Fix:** EmailJS handles CORS automatically. If you see CORS errors, check that you're using the correct domain in EmailJS dashboard.

## Alternative: Email Results Feature

Instead of a contact form, you could add an "Email My Results" button to the diagnostic tools:

```javascript
// In HazardAssessment.jsx or other tool screens
const emailResults = async () => {
  const resultsText = `
Your Tree Risk Assessment Results:
- Risk Level: ${riskLevel}
- Likelihood: ${assessment.likelihood}
- Consequence: ${assessment.consequence}
- Issues Found: ${assessment.issues.join(', ')}

Visit omahatreecare.com for more information.
  `

  await emailjs.send(
    'YOUR_SERVICE_ID',
    'YOUR_RESULTS_TEMPLATE_ID',
    {
      to_email: userEmail,
      results: resultsText,
      submission_time: new Date().toLocaleString()
    },
    'YOUR_PUBLIC_KEY'
  )
}
```

## Security Note

The Public Key is safe to expose in client-side code. It only allows SENDING emails, not reading them or accessing your account.

## Monitoring

After setup, monitor your EmailJS dashboard to see:
- How many submissions you're getting
- Delivery success rate
- If you're approaching your free tier limit (300/month)

If you exceed 300/month, upgrade to EmailJS Pro for $15/month.

## Resources

- **EmailJS Docs:** https://www.emailjs.com/docs/
- **React Integration:** https://www.emailjs.com/docs/examples/reactjs/
- **Template Variables:** https://www.emailjs.com/docs/user-guide/template-params/

---

**Last Updated:** December 2024
**Status:** Not currently implemented - guide for future use
