'use client';

import React, { Suspense, lazy, useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ArrowLeft, Loader2, Moon, Sun, Phone, Mail } from 'lucide-react';
import { CONTACT, SERVICE_AREAS, TRUST_SIGNALS } from '@/constants';

// Type safety for the routing system
type ToolId = 'home' | 'species' | 'hazard' | 'cost' | 'diy' | 'ailments';

// Performance: Lazy load screens to minimize initial bundle size [1, 6]
const Home = lazy(() => import('./screens/Home').then(m => ({ default: m.Home })));
const SpeciesIdentifier = lazy(() => import('./screens/SpeciesIdentifier').then(m => ({ default: m.SpeciesIdentifier })));
const HazardAssessment = lazy(() => import('./screens/HazardAssessment').then(m => ({ default: m.HazardAssessment })));
const CostEstimator = lazy(() => import('./screens/CostEstimator').then(m => ({ default: m.CostEstimator })));
const DIYvsProGuide = lazy(() => import('./screens/DIYvsProGuide').then(m => ({ default: m.DIYvsProGuide })));
const CommonAilments = lazy(() => import('./screens/CommonAilments').then(m => ({ default: m.CommonAilments })));

// Accessible Loading State [7]
const ToolLoader = () => (
  <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
    <Loader2 className="w-12 h-12 text-brand-primary animate-spin" />
    <p className="text-content-muted font-bold uppercase tracking-widest text-xs">Loading Tool...</p>
  </div>
);

export function TreeDiagnostic({ forceTool }: { forceTool?: string }) {
  const router = useRouter();
  const { tool: queryTool } = router.query;
  const currentScreen = (forceTool || queryTool) as ToolId || 'home';
  const [darkMode, setDarkMode] = useState(false);

  // SEO/GEO: Dynamic Metadata based on the active tool [2, 3]
  const getMetadata = () => {
    const baseTitle = `Omaha Tree Care Tools | ${CONTACT.businessName}`;
    switch (currentScreen) {
      case 'hazard': return { title: `Tree Hazard Assessment Omaha | ${baseTitle}`, desc: 'Assess tree safety risks using professional ISA standards.' };
      case 'cost': return { title: `Tree Service Cost Estimator Omaha | ${baseTitle}`, desc: 'Instant price ranges for Omaha tree removals and pruning.' };
      case 'species': return { title: `Omaha Tree Species Guide | ${baseTitle}`, desc: 'Identify local trees and check for Emerald Ash Borer risks.' };
      case 'ailments': return { title: `Tree Disease & Pest Guide Omaha | ${baseTitle}`, desc: 'Diagnose Oak Wilt, EAB, and other local tree health issues.' };
      case 'diy': return { title: `DIY vs Pro Tree Work Guide | ${baseTitle}`, desc: 'Safety guidelines for Omaha homeowners.' };
      default: return { title: baseTitle, desc: 'Professional arborist tools for Omaha homeowners.' };
    }
  };

  const meta = getMetadata();

  // Navigation logic for deep linking and static routing [2]
  const setScreen = (id: string) => {
    if (forceTool) {
      router.push(`/tools/${id}`);
    } else {
      router.push(`/tools/${id}`, undefined, { shallow: false });
    }
  };
  const goHome = () => router.push('/tools');

  // Dark Mode Sync: LocalStorage + OS Preference [4, 5]
  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true' ||
                  (!localStorage.getItem('darkMode') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setDarkMode(isDark);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-stone-100 dark:bg-slate-950 transition-colors duration-300">
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.desc} />
      </Head>

      {/* Accessibility: Skip Link [WCAG 2.1] */}
      <a href="#tool-main" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-brand-accent focus:text-white">
        Skip to tool content
      </a>

      {/* Modern App Header [4, 8] - Using Brand Identity Tokens */}
      <header className="bg-brand-primary text-white p-6 shadow-2xl">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            {currentScreen !== 'home' && (
              <button
                type="button"
                onClick={goHome}
                className="p-2 hover:bg-white/10 rounded-xl transition-colors focus:ring-2 focus:ring-brand-accent outline-none"
                aria-label="Back to tools"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
            )}
            <div>
              <h1 className="text-xl font-serif font-black uppercase italic tracking-tighter leading-none">{CONTACT.businessName}</h1>
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary-300">{TRUST_SIGNALS.certificationShort} Standards</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setDarkMode(!darkMode)}
            className="p-3 rounded-2xl bg-white/10 hover:bg-white/20 transition-all focus:ring-2 focus:ring-brand-accent outline-none"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Tool Content Wrapper [9, 10] */}
      <main id="tool-main" className="max-w-6xl mx-auto p-4 md:p-8">
        <Suspense fallback={<ToolLoader />}>
          {currentScreen === 'home' && <Home setScreen={setScreen} />}
          {currentScreen === 'species' && <SpeciesIdentifier />}
          {currentScreen === 'hazard' && <HazardAssessment />}
          {currentScreen === 'cost' && <CostEstimator />}
          {currentScreen === 'diy' && <DIYvsProGuide />}
          {currentScreen === 'ailments' && <CommonAilments />}
        </Suspense>
      </main>

      {/* High-Conversion Contextual Footer [9-11] - Integrated with Design System & GEO context */}
      <footer className="mt-12 border-t border-neutral-200 dark:border-slate-800 bg-surface-warm dark:bg-slate-900 p-8 md:p-12">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-2xl font-serif font-black text-content-heading dark:text-white uppercase italic tracking-tight">
            Need an Expert Opinion?
          </h2>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a
              href={`tel:${CONTACT.phoneRaw}`}
              className="flex items-center justify-center gap-2 bg-brand-primary hover:bg-brand-secondary text-white font-black py-4 px-8 rounded-2xl shadow-lg transition-transform hover:-translate-y-1 focus:ring-4 focus:ring-brand-accent/30"
            >
              <Phone className="w-5 h-5" /> {CONTACT.phone}
            </a>
            <a
              href={`mailto:${CONTACT.email}`}
              className="flex items-center justify-center gap-2 bg-white dark:bg-slate-800 text-content-heading dark:text-white font-bold py-4 px-8 rounded-2xl border border-neutral-200 dark:border-slate-700 transition-colors hover:border-brand-primary"
            >
              <Mail className="w-5 h-5" /> {CONTACT.email}
            </a>
          </div>

          <div className="pt-4 space-y-2">
            <p className="text-[10px] font-bold text-content-muted uppercase tracking-widest">
              Proudly serving {SERVICE_AREAS.slice(0, 5).map(area => area.name).join(', ')} & greater Omaha
            </p>
            <p className="text-xs font-bold text-content-muted uppercase tracking-widest">
              Free community diagnostic tool provided by {CONTACT.businessName}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default TreeDiagnostic;
