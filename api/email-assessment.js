// Serverless function for emailing tree assessment results
// Endpoint: /api/email-assessment
// Usage: POST with { email, assessmentData }

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { email, assessmentData } = req.body;

    // Validation
    if (!email || !assessmentData) {
      return res.status(400).json({ error: 'Email and assessment data required' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Extract assessment details
    const {
      riskLevel,
      treeSpecies,
      treeSize,
      costEstimate,
      recommendations,
      timeline
    } = assessmentData;

    // Log assessment email request
    console.log('Assessment email requested:', {
      email,
      riskLevel,
      timestamp: new Date().toISOString()
    });

    // TODO: Send email with assessment results
    // Template would include:
    // - Risk level with color coding
    // - Tree details (species, size)
    // - Cost estimates
    // - Recommended actions
    // - Timeline
    // - Link back to tool
    // - Contact information for follow-up

    // For now, just capture the lead
    return res.status(200).json({
      success: true,
      message: 'Assessment results sent to ' + email
    });

  } catch (error) {
    console.error('Email assessment error:', error);
    return res.status(500).json({ error: 'Failed to send assessment' });
  }
}
