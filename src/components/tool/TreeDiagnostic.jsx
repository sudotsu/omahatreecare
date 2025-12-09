import { ArrowLeft, Loader2, Moon, Sun } from 'lucide-react';
import React, { Suspense, lazy, useEffect, useState } from 'react';
import { CONTACT } from '../../constants';

// -----------------------------------------------------------------------------
// LAZY LOAD IMPORTS (Performance Optimization)
// We use this pattern to keep your named exports (export function Home) working
// without rewriting all your sub-files.
// -----------------------------------------------------------------------------
const Home = lazy(() => import('./screens/Home').then(m => ({ default: m.Home })));
const SpeciesIdentifier = lazy(() => import('./screens/SpeciesIdentifier').then(m => ({ default: m.SpeciesIdentifier })));
const HazardAssessment = lazy(() => import('./screens/HazardAssessment').then(m => ({ default: m.HazardAssessment })));
const CostEstimator = lazy(() => import('./screens/CostEstimator').then(m => ({ default: m.CostEstimator })));
const DIYvsProGuide = lazy(() => import('./screens/DIYvsProGuide').then(m => ({ default: m.DIYvsProGuide })));
const CommonAilments = lazy(() => import('./screens/CommonAilments').then(m => ({ default: m.CommonAilments })));

// Simple Loading Spinner Component
const ToolLoader = () => (
  <div className="flex flex-col items-center justify-center min-h-[400px] text-emerald-600">
    <Loader2 className="w-12 h-12 animate-spin mb-4" />
    <p className="text-sm font-medium text-slate-500">Loading Tool...</p>
  </div>
);

export function TreeDiagnostic() {
  const [currentScreen, setCurrentScreen] = useState('home');

  // Initialize state from localStorage immediately to match index.html script
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true';
    }
    return false;
  });

  // Sync state changes to DOM and LocalStorage
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

  const goHome = () => setCurrentScreen('home');

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900 transition-colors duration-300">

      {/* Header */}
      <header className="bg-gradient-to-r from-amber-900 to-yellow-700 dark:from-slate-800 dark:to-slate-900 text-white shadow-lg sticky top-0 z-50 transition-colors duration-300">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {currentScreen !== 'home' && (
              <button
                onClick={goHome}
                className="flex items-center gap-2 text-white/90 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-medium">Back</span>
              </button>
            )}

            <div className={currentScreen === 'home' ? 'mx-auto text-center' : 'flex-1 text-center'}>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                Omaha Tree Care Guide
              </h1>
              <p className="text-sm text-amber-100 dark:text-slate-300 mt-1">
                Expert tree care knowledge, free for homeowners
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content with Suspense Wrapper */}
      <main className="container mx-auto px-4 py-6 md:py-8">
        <Suspense fallback={<ToolLoader />}>
          {currentScreen === 'home' && <Home setScreen={setCurrentScreen} />}
          {currentScreen === 'species' && <SpeciesIdentifier />}
          {currentScreen === 'hazard' && <HazardAssessment />}
          {currentScreen === 'cost' && <CostEstimator />}
          {currentScreen === 'diy' && <DIYvsProGuide />}
          {currentScreen === 'ailments' && <CommonAilments />}
        </Suspense>
      </main>

      {/* Footer */}
      <footer className="bg-amber-900 dark:bg-slate-900 text-white py-8 mt-12 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-lg font-semibold mb-2">
              Need Professional Tree Care?
            </p>
            <p className="text-amber-200 dark:text-slate-300 mb-4">
              {CONTACT.businessName} - Serving Omaha & Surrounding Areas
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
              <a
                href={`tel:${CONTACT.phoneRaw}`}
                className="px-6 py-3 bg-yellow-500 dark:bg-emerald-500 text-amber-900 dark:text-white rounded-lg font-bold hover:bg-yellow-400 dark:hover:bg-emerald-400 transition-colors text-lg"
              >
                📞 Call or Text: {CONTACT.phone}
              </a>
              <a
                href={`mailto:${CONTACT.email}`}
                className="px-6 py-3 bg-amber-800 dark:bg-slate-700 text-white rounded-lg font-semibold hover:bg-amber-700 dark:hover:bg-slate-600 transition-colors"
              >
                📧 {CONTACT.email}
              </a>
            </div>
            <div className="border-t border-amber-700 dark:border-slate-700 pt-4 mt-4">
              <a
                href="https://midwestroots.info"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-200 dark:text-slate-300 hover:text-white transition-colors text-sm"
              >
                Visit MidwestRoots.info for more about our services
              </a>
              <p className="text-amber-300 dark:text-slate-400 text-xs mt-2">
                Free diagnostic tool provided as a community service
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}