# Vercel Serverless Functions

## Current Status

**⚠️ IMPORTANT:** These API endpoints exist in the codebase but are **NOT currently implemented or used** in the application.

The Omaha Tree Care diagnostic tools are currently **100% client-side** with no backend functionality. The tools do not:
- Collect user data
- Send emails
- Store information
- Make API calls

These functions are provided as **future implementation examples** if you want to add:
- Lead capture forms
- "Email My Results" functionality
- Contact form submissions
- User data collection

---

## Available Endpoints (Not Currently Used)

### 1. `/api/contact` - Lead Capture (NOT IMPLEMENTED)

Designed to capture contact form submissions and tree assessment leads.

**Method:** `POST`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "(402) 555-1234",
  "message": "I have a large oak tree...",
  "treeAssessment": {
    "riskLevel": "high",
    "species": "oak",
    "size": "large"
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Thank you! We'll contact you soon."
}
```

**Usage Example:**
```javascript
// In a future contact form component
const response = await fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '402-555-1234',
    message: 'Need help with tree removal',
    treeAssessment: assessmentResults
  })
});
```

---

### 2. `/api/email-assessment` - Email Assessment Results (NOT IMPLEMENTED)

Designed to send tree assessment results to user's email.

**Method:** `POST`

**Request Body:**
```json
{
  "email": "john@example.com",
  "assessmentData": {
    "riskLevel": "moderate",
    "treeSpecies": "Ash",
    "treeSize": "medium",
    "costEstimate": "$1,500-$3,500",
    "recommendations": "Professional inspection within 3-6 months",
    "timeline": "Non-urgent"
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Assessment results sent to john@example.com"
}
```

**Usage Example:**
```javascript
// Could be added to HazardAssessment.jsx results screen
const emailResults = async () => {
  const response = await fetch('/api/email-assessment', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: userEmail,
      assessmentData: {
        riskLevel: riskLevel,
        treeSpecies: selectedSpecies,
        treeSize: treeSize,
        costEstimate: estimatedCost,
        recommendations: recommendations,
        timeline: timeline
      }
    })
  });
};
```

---

## How to Implement These Functions

### Step 1: Choose an Email Service

**Option 1: Resend (Recommended)**
- Modern, developer-friendly
- 100 emails/day free tier
- Great documentation

```bash
npm install resend
```

Add to Vercel Environment Variables:
```
RESEND_API_KEY=re_xxxxx
FROM_EMAIL=noreply@omahatreecare.com
ADMIN_EMAIL=andrew@midwestroots.info
```

Update `/api/contact.js`:
```javascript
import { Resend } from 'resend';

export default async function handler(req, res) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const { name, email, phone, message, treeAssessment } = req.body;

  await resend.emails.send({
    from: 'Omaha Tree Care <noreply@omahatreecare.com>',
    to: process.env.ADMIN_EMAIL,
    subject: `New Lead: ${name}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Message:</strong> ${message}</p>
      ${treeAssessment ? `
        <h3>Tree Assessment Results</h3>
        <p><strong>Risk Level:</strong> ${treeAssessment.riskLevel}</p>
        <p><strong>Species:</strong> ${treeAssessment.species}</p>
        <p><strong>Size:</strong> ${treeAssessment.size}</p>
      ` : ''}
    `
  });

  res.status(200).json({ success: true });
}
```

**Option 2: SendGrid**
```bash
npm install @sendgrid/mail
```

**Option 3: Mailgun**
```bash
npm install mailgun.js
```

**Option 4: EmailJS (Client-Side)**

See `EMAILJS-SETUP.md` for EmailJS integration (no serverless functions needed).

### Step 2: Add UI Components

Create a contact form component:

```javascript
// src/components/ContactForm.jsx
import { useState } from 'react';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', message: ''
  });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  );
}
```

### Step 3: Add "Email Results" Button to Tools

In `src/components/tool/screens/HazardAssessment.jsx`:

```javascript
const emailResults = async () => {
  try {
    await fetch('/api/email-assessment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: userEmail,
        assessmentData: {
          riskLevel: riskLevel,
          likelihood: assessment.likelihood,
          consequence: assessment.consequence,
          issues: assessment.issues,
          recommendations: getRecommendations()
        }
      })
    });
    alert('Results sent to your email!');
  } catch (error) {
    alert('Failed to send email. Please try again.');
  }
};
```

---

## Testing Locally

```bash
# Install Vercel CLI
npm i -g vercel

# Run dev server with serverless functions
vercel dev
```

The site will run on `http://localhost:3000` with API routes available.

Test endpoints:
```bash
# Test contact form
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","phone":"402-555-0000","message":"Test message"}'

# Test email assessment
curl -X POST http://localhost:3000/api/email-assessment \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","assessmentData":{"riskLevel":"low","treeSpecies":"Oak"}}'
```

---

## Environment Variables

Add these to your Vercel project settings (Settings → Environment Variables):

```env
# Email Service
RESEND_API_KEY=re_xxxxxxxxxxxxx
FROM_EMAIL=noreply@omahatreecare.com
ADMIN_EMAIL=andrew@midwestroots.info

# Optional: Rate Limiting
UPSTASH_REDIS_REST_URL=xxxxx
UPSTASH_REDIS_REST_TOKEN=xxxxx
```

Never commit `.env` files to git!

---

## Security Best Practices

Before enabling these functions in production:

- ✅ Add input validation and sanitization
- ✅ Implement rate limiting (max 10 requests/hour per IP)
- ✅ Add CORS restrictions to your domain only
- ✅ Validate email formats
- ✅ Add honeypot fields to prevent spam bots
- ✅ Consider adding reCAPTCHA for public forms
- ✅ Monitor for abuse via Vercel logs
- ✅ Set up error alerting (Sentry, LogRocket, etc.)

### Rate Limiting Example

```javascript
import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const key = `rate-limit:${ip}`;

  const requests = await kv.incr(key);
  if (requests === 1) await kv.expire(key, 3600); // 1 hour window

  if (requests > 10) {
    return res.status(429).json({
      error: 'Too many requests. Please try again later.'
    });
  }

  // Process request...
}
```

---

## CORS Configuration

Update API functions to restrict to your domain:

```javascript
export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', 'https://omahatreecare.com');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  // Handle request...
}
```

---

## Deployment

These functions automatically deploy with your Vercel project. No additional configuration needed.

**Build Command:** `npm run build` (already configured)
**Output Directory:** `dist` (already configured)

Vercel automatically detects and deploys files in the `/api` directory as serverless functions.

---

## Monitoring & Analytics

Track API usage via:
1. **Vercel Dashboard** → Functions tab (shows invocations, errors, duration)
2. **Vercel Logs** → Filter by function name
3. **Third-party:** Sentry, LogRocket, Datadog

---

## Cost Considerations

**Vercel Free Tier:**
- 100GB bandwidth/month
- 100,000 serverless function invocations/month
- More than enough for a small tree care business

**Email Service Costs:**
- Resend: 100 emails/day free, then $20/month
- SendGrid: 100 emails/day free, then $15/month
- Mailgun: 5,000 emails/month free

---

## Related Documentation

- See `EMAILJS-SETUP.md` for client-side email alternative (no serverless functions)
- See `README.md` for general project documentation
- See `DEPLOYMENT-CHECKLIST.md` for deployment guide

---

**Last Updated:** December 2024
**Status:** Functions exist but NOT currently used in the application
**Implementation:** Optional - add if you need lead capture or email functionality
