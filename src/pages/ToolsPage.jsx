import React from 'react';
import { Head } from 'vite-react-ssg';
import { TreeDiagnostic } from '../components/tool/TreeDiagnostic';
import { CONTACT } from '../constants';

const ToolsPage = () => {
  return (
    <div className="min-h-screen">
      <Head>
        <title>Tree Health Diagnostic Tool | Midwest Roots</title>
        <meta name="description" content="Free AI-powered tree health assessment tool. Check storm risk, identify diseases, and get instant recommendations for your Omaha trees." />
        <link rel="canonical" href={`${CONTACT.siteUrl}/tools`} />

        {/* SoftwareApplication Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Midwest Roots Diagnostic Tool",
            "operatingSystem": "Web Browser",
            "applicationCategory": "UtilitiesApplication",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "description": "A web-based diagnostic tool for Omaha homeowners to assess tree health, storm risk, and potential removal costs.",
            "featureList": "Risk Score Calculation, Lean Angle Assessment, Cost Estimator",
            "author": {
              "@type": "LocalBusiness",
              "name": CONTACT.businessName
            }
          })}
        </script>
      </Head>

      {/* This renders your actual interactive tool */}
      <TreeDiagnostic />
    </div>
  );
};

export default ToolsPage;