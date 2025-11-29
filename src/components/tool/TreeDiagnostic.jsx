import { useState, useEffect } from 'react';
import { Home } from './screens/Home';
import { SpeciesIdentifier } from './screens/SpeciesIdentifier';
import { HazardAssessment } from './screens/HazardAssessment';
import { CostEstimator } from './screens/CostEstimator';
import { DIYvsProGuide } from './screens/DIYvsProGuide';
import { CommonAilments } from './screens/CommonAilments';
import { ArrowLeft, Moon, Sun } from 'lucide-react';

export function TreeDiagnostic() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Apply dark mode class to html element
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
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
            {currentScreen !== 'home' ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                  aria-label="Toggle dark mode"
                >
                  {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
              </div>
            ) : (
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 md:py-8">
        {currentScreen === 'home' && <Home setScreen={setCurrentScreen} />}
        {currentScreen === 'species' && <SpeciesIdentifier />}
        {currentScreen === 'hazard' && <HazardAssessment />}
        {currentScreen === 'cost' && <CostEstimator />}
        {currentScreen === 'diy' && <DIYvsProGuide />}
        {currentScreen === 'ailments' && <CommonAilments />}
      </main>

      {/* Footer */}
      <footer className="bg-amber-900 dark:bg-slate-900 text-white py-8 mt-12 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-lg font-semibold mb-2">
              Need Professional Tree Care?
            </p>
            <p className="text-amber-200 dark:text-slate-300 mb-4">
              Midwest Roots Tree Services - Serving Omaha & Surrounding Areas
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
              <a
                href="tel:+14028123294"
                className="px-6 py-3 bg-yellow-500 dark:bg-emerald-500 text-amber-900 dark:text-white rounded-lg font-bold hover:bg-yellow-400 dark:hover:bg-emerald-400 transition-colors text-lg"
              >
                📞 Call or Text: (402) 812-3294
              </a>
              <a
                href="mailto:andrew@midwestroots.info"
                className="px-6 py-3 bg-amber-800 dark:bg-slate-700 text-white rounded-lg font-semibold hover:bg-amber-700 dark:hover:bg-slate-600 transition-colors"
              >
                📧 andrew@midwestroots.info
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
