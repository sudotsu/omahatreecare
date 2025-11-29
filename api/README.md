# Vercel Serverless Functions

These API endpoints run as serverless functions on Vercel's edge network.

## Available Endpoints

### 1. `/api/contact` - Lead Capture
Captures contact form submissions and tree assessment leads.

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

### 2. `/api/email-assessment` - Email Assessment Results
Sends tree assessment results to user's email.

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
const response = await fetch('/api/email-assessment', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: userEmail,
    assessmentData: {
      riskLevel: 'moderate',
      treeSpecies: 'Ash',
      treeSize: 'medium',
      costEstimate: '$1,500-$3,500',
      recommendations: 'Professional inspection recommended',
      timeline: '3-6 months'
    }
  })
});
```

---

## Next Steps: Email Integration

Currently, these functions log data but don't send actual emails. To enable email functionality:

### Option 1: Resend (Recommended)
```bash
npm install resend
```

Add to `.env`:
```
RESEND_API_KEY=re_xxxxx
```

Update functions:
```javascript
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: 'Omaha Tree Care <noreply@omahatreecare.com>',
  to: email,
  subject: 'Your Tree Assessment Results',
  html: emailTemplate
});
```

### Option 2: SendGrid
```bash
npm install @sendgrid/mail
```

### Option 3: Mailgun
```bash
npm install mailgun.js
```

---

## Environment Variables

Add these to your Vercel project settings:

```
EMAIL_SERVICE=resend
RESEND_API_KEY=your_key_here
ADMIN_EMAIL=andrew@midwestroots.info
```

---

## Testing Locally

```bash
# Install Vercel CLI
npm i -g vercel

# Run dev server with serverless functions
vercel dev
```

Test endpoints:
```bash
# Test contact form
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com"}'

# Test email assessment
curl -X POST http://localhost:3000/api/email-assessment \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","assessmentData":{"riskLevel":"low"}}'
```

---

## Rate Limiting

Consider adding rate limiting to prevent abuse:

```javascript
// Example with Vercel KV (Redis)
import { kv } from '@vercel/kv';

const ip = req.headers['x-forwarded-for'];
const key = `rate-limit:${ip}`;
const requests = await kv.incr(key);
if (requests === 1) await kv.expire(key, 60); // 60 second window
if (requests > 10) {
  return res.status(429).json({ error: 'Too many requests' });
}
```

---

## Security Best Practices

- ✅ CORS configured for your domain only (update in production)
- ✅ Input validation on all fields
- ✅ Email format validation
- ✅ Method restrictions (POST only)
- ⚠️ Add rate limiting before production
- ⚠️ Add honeypot fields to prevent spam
- ⚠️ Consider CAPTCHA for public forms
