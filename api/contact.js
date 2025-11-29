// Serverless function for lead capture
// Endpoint: /api/contact
// Usage: POST with { name, email, phone, message, treeAssessment }

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { name, email, phone, message, treeAssessment } = req.body;

    // Validation
    if (!email || !name) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Log the lead (in production, you'd save to database or send to email service)
    console.log('New lead received:', {
      name,
      email,
      phone,
      message,
      treeAssessment,
      timestamp: new Date().toISOString(),
      userAgent: req.headers['user-agent'],
      ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress
    });

    // TODO: Integrate with email service
    // Options:
    // 1. Resend (resend.com) - Modern, developer-friendly
    // 2. SendGrid - Popular, reliable
    // 3. Mailgun - Powerful API
    // 4. AWS SES - Cheap, scalable

    // For now, just return success
    // In production, you'd send email notification here

    return res.status(200).json({
      success: true,
      message: 'Thank you! We\'ll contact you soon.'
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
