import React from 'react';
import { Head } from 'vite-react-ssg';
import { useLocation } from 'react-router-dom'; // IMPORT
import TreeDiagnostic from '../components/tools/TreeDiagnostic';
import { CONTACT } from '../constants';

export default function ToolsPage() {
  const location = useLocation(); // GET LOCATION
  const canonicalUrl = `https://omahatreecare.com${location.pathname}`; // BUILD URL

  return (
    <div className="bg-slate-50 min-h-screen pt-20">
      <Head>
        <title>Free Tree Risk Diagnostic Tool | {CONTACT.businessName}</title>
        <meta name="description" content="Assess your tree's storm risk in 60 seconds. Free diagnostic tool for Omaha homeowners based on ISA risk assessment standards." />

        {/* ADD CANONICAL */}
        <link rel="canonical" href={canonicalUrl} />
      </Head>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4">
                Does My Tree Need Help?
            </h1>
            <p className="text-xl text-slate-600">
                A 60-second self-assessment to decide if you need an arborist.
            </p>
        </div>

        <TreeDiagnostic />
      </main>
    </div>
  );
}