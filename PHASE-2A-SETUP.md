# Phase 2A Implementation - Setup Guide

**Date:** 2025-11-30
**Status:** ✅ Complete - Ready for EmailJS Configuration

---

## What We Built

### 🎯 Complete Lead Generation Funnel

**Flow:** Hazard Assessment Tool → Risk-Based Landing Pages → Contact Forms → Lead Capture

```
User completes hazard assessment
    ↓
Risk Score Calculated
    ↓
├─ Score ≥ 6 (HIGH) → /emergency-tree-service-omaha
├─ Score 3-5 (MEDIUM) → /tree-consultation-omaha
└─ Score < 3 (LOW) → Email capture modal
    ↓
Contact form submission → EmailJS → Your email
```

---

## New Files Created

### Pages
1. **`src/pages/EmergencyTreeService.jsx`** - RED flag landing page
   - Honest 24/7 messaging
   - Phone CTA prominent
   - Emergency scenarios
   - Contact form integration

2. **`src/pages/TreeConsultation.jsx`** - YELLOW flag landing page
   - "Professional look before DIY" messaging
   - DIY vs Pro comparison
   - Softer, consultative tone
   - Contact form integration

### Components
3. **`src/components/ContactForm.jsx`** - Reusable EmailJS form
   - Urgency-based response times
   - Analytics tracking built-in
   - Success/error states
   - Mobile-optimized

4. **`src/components/EmailCaptureModal.jsx`** - GREEN flag email modal
   - Seasonal care tips opt-in
   - Clean, simple UX
   - Analytics tracking

### Updates
5. **`src/routes.jsx`** - Added new routes
6. **`src/components/tool/screens/HazardAssessment.jsx`** - Added routing logic
7. **`public/sitemap.xml`** - Added new pages for SEO

---

## EmailJS Setup (Required)

### Step 1: Get Your EmailJS Credentials

1. Go to https://dashboard.emailjs.com/sign-up (or login if you have an account)
2. Create a new service:
   - Click "Add New Service"
   - Choose Gmail, Outlook, or your email provider
   - Connect your email account
   - Note your **Service ID** (looks like: `service_abc123`)

3. Create an email template:
   - Click "Email Templates" → "Create New Template"
   - Template Name: "Tree Care Contact Form"
   - Use this template structure:

```
Subject: New Tree Care Lead - {{urgency}} Priority

From: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
Address: {{address}}

Message:
{{message}}

Best Time to Call: {{best_time}}

---
Lead Details:
- Urgency: {{urgency}}
- Page Source: {{page_source}}
- Submitted: {{submission_date}} at {{submission_time}}
```

   - Note your **Template ID** (looks like: `template_xyz789`)

4. Get your Public Key:
   - Go to "Account" → "General"
   - Copy your **Public Key** (looks like: `w-AbCdEf123456`)

### Step 2: Update the Code

Open `src/components/ContactForm.jsx` and replace these lines (around line 32):

```javascript
// TODO: Replace these with your actual EmailJS credentials
const SERVICE_ID = 'YOUR_SERVICE_ID'      // Replace with service_abc123
const TEMPLATE_ID = 'YOUR_TEMPLATE_ID'    // Replace with template_xyz789
const PUBLIC_KEY = 'YOUR_PUBLIC_KEY'      // Replace with w-AbCdEf123456
```

**With your actual credentials:**

```javascript
const SERVICE_ID = 'service_abc123'       // Your actual service ID
const TEMPLATE_ID = 'template_xyz789'     // Your actual template ID
const PUBLIC_KEY = 'w-AbCdEf123456'       // Your actual public key
```

### Step 3: Test the Forms

1. Build and run locally:
```bash
npm run build
npm run preview
```

2. Navigate to `/tools`
3. Complete the hazard assessment with different risk scores
4. Test each path:
   - HIGH risk → Emergency page → Fill out form
   - MEDIUM risk → Consultation page → Fill out form
   - LOW risk → Email modal → Enter email

5. Check your email for form submissions!

---

## SEO/GEO Features Built-In

### URLs (Already Optimized)
- ✅ `/emergency-tree-service-omaha` - Targets "emergency tree service omaha"
- ✅ `/tree-consultation-omaha` - Targets "tree consultation omaha"

### Schema Markup (Already Implemented)
- ✅ Service schema for both pages
- ✅ LocalBusiness integration
- ✅ Proper contact points

### Analytics Tracking (Already Configured)
- ✅ Page view tracking
- ✅ Phone click tracking
- ✅ Form submission tracking
- ✅ Conversion tracking by risk level

### Sitemap (Already Updated)
- ✅ New pages added to sitemap.xml
- ✅ Ready for Google Search Console resubmission

---

## Next Steps

### Immediate (After EmailJS Setup)
1. **Test all forms** - Make sure emails arrive
2. **Commit changes** - Push to your repo
3. **Deploy to Vercel** - Let it build
4. **Test live site** - Verify routing works

### This Week
1. **Resubmit sitemap** to Google Search Console
   - Go to https://search.google.com/search-console
   - Sitemaps → Enter: `sitemap.xml`
   - Click Submit

2. **Monitor form submissions**
   - Check EmailJS dashboard for stats
   - Track Google Analytics events

3. **Test on mobile** - Most users will be on phones

### Phase 2B (Future)
1. **Add more city pages** (Bellevue, Papillion, etc.)
2. **Create service-specific pages** (tree removal, pruning, etc.)
3. **Add Calendly integration** (when ready for online scheduling)
4. **Build email automation** (drip campaigns for low-risk emails)

---

## Troubleshooting

### "Form submission error"
- Check EmailJS credentials are correct
- Verify service is connected to your email
- Check browser console for errors
- Try using EmailJS test mode first

### Routing not working
- Make sure you ran `npm run build` after changes
- Check React Router is installed
- Verify routes.jsx imports are correct

### Modal not showing
- Check browser console for import errors
- Verify EmailCaptureModal.jsx exists
- Test with browser dev tools open

---

## Analytics Events to Track

Once deployed, monitor these events in Google Analytics:

### Tool Completion
- `high_risk_conversion` - Users clicking to emergency page
- `moderate_risk_conversion` - Users clicking to consultation page
- `low_risk_email_modal` - Users opening email modal

### Engagement
- `phone_click` - Users clicking phone numbers
- `form_submission` - Users submitting contact forms
- `form_submission_success` - Successful submissions
- `email_capture` - Low-risk email captures

### Performance
- Page views on new landing pages
- Time on page
- Bounce rate
- Form completion rate

---

## Key Decisions Made

### Honest Messaging
- 24/7 phone availability with realistic callback expectations
- "If voicemail, expect callback within 2 hours" (business hours)
- No overpromising on response times

### Risk-Based Routing
- HIGH (≥6): Emergency page with urgent CTAs
- MEDIUM (3-5): Consultation page with softer approach
- LOW (<3): Email capture for ongoing engagement

### SEO Strategy
- City names in URLs (`-omaha`)
- Schema markup on each page
- Sitemap updated
- Internal links from tool

---

## Phase 2A Success Metrics

**Track these over 30 days:**

- Tool completions: ___ per week
- HIGH risk → Emergency page: ___% click-through
- MEDIUM risk → Consultation page: ___% click-through
- LOW risk → Email capture: ___% opt-in
- Form submissions: ___ per week
- Phone clicks: ___ per week
- Cost per lead: $___ (if running ads)

**Target benchmarks:**
- Tool → Landing page: 60%+ click-through
- Landing page → Form submission: 30%+
- Email modal opt-in: 40%+

---

## Support

**Questions?**
- EmailJS Docs: https://www.emailjs.com/docs/
- React Router Docs: https://reactrouter.com/
- Your SEO-GEO-STRATEGY.md for next phases

**Issues?**
- Check browser console for errors
- Verify all imports are correct
- Test locally before deploying
- Check Vercel deployment logs

---

**Document Version:** 1.0
**Last Updated:** 2025-11-30
**Ready to Deploy:** Yes (after EmailJS setup)
