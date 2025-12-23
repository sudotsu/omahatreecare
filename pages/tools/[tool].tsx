import React from 'react';
import Head from 'next/head';
import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react';
import Head from 'next/head';
import { GetStaticPaths, GetStaticProps } from 'next';
import TreeDiagnostic from '@/tool/TreeDiagnostic';
import { CONTACT } from '@/constants';
import TreeDiagnostic from '@/tool/TreeDiagnostic';
import { CONTACT } from '@/constants';

const toolMetadata: Record<string, { title: string, desc: string }> = {
  'hazard': {
    title: 'Tree Hazard Assessment Omaha | Midwest Roots',
    desc: 'Calculate tree safety risk scores using professional ISA standards. Free assessment tool for Omaha homeowners.'
  },
  'cost': {
    title: 'Tree Service Cost Estimator Omaha | Midwest Roots',
    desc: 'Instant price ranges for Omaha tree removals, pruning, and stump grinding. Get a transparent estimate today.'
  },
  'species': {
    title: 'Omaha Tree Species Identifier | Midwest Roots',
    desc: 'Identify local Nebraska trees and check for Emerald Ash Borer or Oak Wilt risks.'
  },
  'ailments': {
    title: 'Tree Disease & Pest Guide Omaha | Midwest Roots',
    desc: 'Diagnose common Omaha tree problems like bagworms, EAB, and fungal infections.'
  },
  'diy': {
    title: 'DIY vs Pro Tree Work Guide | Omaha | Midwest Roots',
    desc: 'Safety guidelines for Omaha homeowners. Learn when it’s safe to DIY and when you need a pro.'
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = Object.keys(toolMetadata).map(tool => ({
    params: { tool }
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  return { props: { toolId: params?.tool } };
};

const ToolSubPage = ({ toolId }: { toolId: string }) => {
  const meta = toolMetadata[toolId] || {
    title: 'Tree Diagnostic Tool | Omaha | Midwest Roots',
    desc: 'Professional arborist tools for Omaha homeowners.'
  };
  const siteUrl = CONTACT.siteUrl;

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": `Midwest Roots ${meta.title}`,
    "description": meta.desc,
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "All",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
  };

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.desc} />
        <link rel="canonical" href={`${siteUrl}/tools/${toolId}`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
        />
      </Head>

      <main
        id="main-content"
        className="min-h-screen bg-surface-warm dark:bg-surface-dark transition-colors duration-300"
        aria-label={meta.title}
      >
        <TreeDiagnostic forceTool={toolId} />
      </main>
    </>
  );
};

export default ToolSubPage;
