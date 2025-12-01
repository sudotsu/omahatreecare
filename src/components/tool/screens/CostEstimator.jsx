import { useState } from 'react'
import { DollarSign, Info } from 'lucide-react'


const services = [
  {
    name: 'Tree Removal',
    description: 'Complete removal of tree including trunk and major branches',
    priceRange: '$400 - $3,500+',
    typical: '$800 - $1,500 for average tree',
    factors: [
      'Tree size and height',
      'Accessibility and space constraints',
      'Proximity to structures/power lines',
      'Trunk diameter',
      'Number of branches',
      'Stump removal (additional cost)',
      'Wood hauling vs. leaving on site'
    ]
  },
  {
    name: 'Stump Grinding',
    description: 'Grinding stump below ground level',
    priceRange: '$75 - $400',
    typical: '$150 - $250 for standard stump',
    factors: [
      'Stump diameter (charged per inch)',
      'Root spread and depth',
      'Accessibility for equipment',
      'Number of stumps (bulk discounts)',
      'Cleanup and haul-away'
    ]
  },
  {
    name: 'Tree Pruning/Trimming',
    description: 'Selective branch removal to improve structure and health',
    priceRange: '$200 - $1,200',
    typical: '$400 - $600 for standard pruning',
    factors: [
      'Tree size and number of branches',
      'Pruning type (structural, crown reduction, deadwood)',
      'Equipment needs (bucket truck vs. climbing)',
      'Cleanup and disposal',
      'Season (dormant vs. growing)'
    ]
  },
  {
    name: 'Crown Reduction',
    description: 'Reducing tree height and spread for safety or clearance',
    priceRange: '$400 - $1,500',
    typical: '$600 - $900',
    factors: [
      'Amount of reduction needed',
      'Tree species (growth pattern affects technique)',
      'Current tree size',
      'Precision required',
      'Cleanup volume'
    ]
  },
  {
    name: 'Deadwood Removal',
    description: 'Removing dead or dying branches',
    priceRange: '$200 - $800',
    typical: '$300 - $500',
    factors: [
      'Amount of deadwood',
      'Branch size and height',
      'Safety risk level',
      'Access difficulty',
      'Cleanup requirements'
    ]
  },
  {
    name: 'Cabling & Bracing',
    description: 'Installing support systems for weak branch unions',
    priceRange: '$400 - $1,200',
    typical: '$600 - $800 per installation',
    factors: [
      'Number of cables needed',
      'Tree height and access',
      'Type of system (static vs. dynamic)',
      'Inspection and monitoring setup'
    ]
  },
  {
    name: 'Emergency Storm Service',
    description: 'Emergency removal of storm-damaged or hazardous trees',
    priceRange: '$600 - $4,000+',
    typical: '$1,000 - $2,000',
    factors: [
      'Urgency and timing (24-hour service premium)',
      'Damage severity',
      'Safety complications',
      'Power line proximity',
      'Structure damage risk'
    ]
  },
  {
    name: 'Large Tree Removal',
    description: 'Removal of trees over 80 feet or 4+ feet diameter',
    priceRange: '$2,000 - $10,000+',
    typical: '$3,500 - $6,000',
    factors: [
      'Extreme size requires specialized equipment',
      'Crane rental may be necessary',
      'Multiple crew members and days',
      'High liability and insurance costs',
      'Permit requirements in some areas'
    ]
  },
  {
    name: 'Ash Tree EAB Treatment',
    description: 'Trunk injection treatment for Emerald Ash Borer protection',
    priceRange: '$10 - $15 per diameter inch',
    typical: '$200 - $400 every 2 years',
    factors: [
      'Tree diameter (measured at chest height)',
      'Treatment frequency (typically every 2 years)',
      'Treatment type (injection vs. soil drench)',
      'Tree health status',
      'Number of trees (discounts for multiple)'
    ]
  }
]

export function CostEstimator() {
  const [selectedService, setSelectedService] = useState(null)

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-amber-900 dark:text-slate-100 mb-3">Tree Service Cost Estimator</h2>
        <p className="text-amber-800 dark:text-slate-300 leading-relaxed">
          Get typical price ranges for common tree services in the Omaha area. 
          These are estimates only - actual costs vary based on specific conditions.
        </p>
      </div>

      {/* Service Cards */}
      {!selectedService && (
        <div className="space-y-3">
          {services.map((service, index) => (
            <button
              key={index}
              onClick={() => setSelectedService(service)}
              className="w-full bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-xl transition-all p-6 text-left group"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-amber-900 dark:text-slate-100 group-hover:text-amber-700 dark:text-slate-400 transition-colors mb-2">
                    {service.name}
                  </h3>
                  <p className="text-sm text-amber-700 dark:text-slate-400 mb-3">{service.description}</p>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-green-600 dark:text-emerald-400" />
                    <span className="text-lg font-semibold text-green-700">{service.priceRange}</span>
                  </div>
                </div>
                <svg className="w-6 h-6 text-amber-600 transform group-hover:translate-x-1 transition-transform flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Service Detail */}
      {selectedService && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden animate-fade-in">
          <div className="bg-gradient-to-r from-green-700 to-emerald-800 text-white p-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h2 className="text-3xl font-bold mb-2">{selectedService.name}</h2>
                <p className="text-green-100 text-lg">{selectedService.description}</p>
              </div>
              <button
                onClick={() => setSelectedService(null)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="bg-white/20 backdrop-blur rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm mb-1">Price Range</p>
                  <p className="text-3xl font-bold">{selectedService.priceRange}</p>
                </div>
                <div className="text-right">
                  <p className="text-green-100 text-sm mb-1">Typical Cost</p>
                  <p className="text-xl font-semibold">{selectedService.typical}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <h3 className="text-xl font-bold text-amber-900 dark:text-slate-100 mb-4">Factors Affecting Cost</h3>
              <ul className="space-y-3">
                {selectedService.factors.map((factor, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-amber-700 dark:text-slate-400 text-sm font-semibold">{i + 1}</span>
                    </div>
                    <span className="text-amber-800 dark:text-slate-300">{factor}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 rounded-xl p-5">
              <div className="flex gap-3">
                <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-900 dark:text-blue-200">
                  <p className="font-semibold mb-2">Getting Accurate Quotes</p>
                  <ul className="space-y-1">
                    <li>• Always get quotes from at least 3 reputable companies</li>
                    <li>• Ensure quotes are in writing with detailed scope of work</li>
                    <li>• Verify insurance and certifications (ISA certification preferred)</li>
                    <li>• Ask about cleanup, hauling, and stump removal</li>
                    <li>• Cheaper isn't always better - consider experience and safety</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-200 rounded-xl p-5">
              <div className="flex gap-3">
                <DollarSign className="w-5 h-5 text-yellow-700 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-yellow-900 dark:text-yellow-200">
                  <p className="font-semibold mb-2">Ways to Save Money</p>
                  <ul className="space-y-1">
                    <li>• Schedule work during dormant season (winter) when demand is lower</li>
                    <li>• Bundle multiple services together for efficiency discounts</li>
                    <li>• Leave wood on site if you can use it (firewood)</li>
                    <li>• Address issues early before they become emergencies</li>
                    <li>• Ask about payment plans for large jobs</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Next Steps CTA */}
            <div className="bg-green-50 dark:bg-emerald-900/20 border-2 border-green-300 rounded-xl p-6">
              <h3 className="text-xl font-bold text-green-900 dark:text-emerald-200 mb-4 text-center">Ready for a Free Quote?</h3>
              <div className="space-y-3">
                <a
                  href="mailto:andrew@midwestroots.info?subject=Free%20Quote%20Request%20from%20Cost%20Estimator&body=I'd%20like%20a%20quote%20for%20the%20following%20service:%20[SERVICE]%0A%0AMy%20address:%20%0AMy%20phone:%20%0ABest%20time%20to%20reach%20me:%20"
                  className="block w-full px-6 py-4 bg-green-600 dark:bg-emerald-600 text-white rounded-xl font-bold hover:bg-green-700 dark:hover:bg-emerald-700 transition-colors text-center"
                >
                  📧 Email for Free Written Quote
                  <div className="text-sm font-normal text-green-100 mt-1">Get detailed pricing for your specific situation</div>
                </a>
                
                <a
                  href="tel:+14028123294"
                  className="block w-full px-6 py-4 bg-blue-600 dark:bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 dark:hover:bg-blue-700 transition-colors text-center"
                >
                  📞 Call for Faster Response: (402) 812-3294
                  <div className="text-sm font-normal text-blue-100 mt-1">Often same-day quotes available</div>
                </a>

                <a
                  href="https://www.google.com/search?q=tree+removal+omaha"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full px-6 py-3 bg-gray-600 text-white rounded-xl font-semibold hover:bg-gray-700 transition-colors text-center text-sm"
                >
                  🔍 Compare Other Tree Services First
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* General Pricing Info */}
      {!selectedService && (
        <div className="mt-8 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-2xl p-8 border-2 border-amber- dark:border-slate-200 dark:border-slate-600">
          <h3 className="text-2xl font-bold text-amber-900 dark:text-slate-100 mb-4">Understanding Tree Service Pricing</h3>
          <div className="space-y-4 text-amber-900 dark:text-slate-100">
            <p>
              Tree service costs vary significantly based on complexity, equipment needed, and local market rates. 
              Here are some general guidelines:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
                <h4 className="font-bold mb-2">Small Jobs ($200-$600)</h4>
                <p className="text-sm text-amber-800 dark:text-slate-300">
                  Simple pruning, small tree removal, single stump grinding. Quick jobs under 4 hours.
                </p>
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
                <h4 className="font-bold mb-2">Medium Jobs ($600-$1,500)</h4>
                <p className="text-sm text-amber-800 dark:text-slate-300">
                  Standard tree removal, crown reduction, multiple stumps. Half to full day work.
                </p>
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
                <h4 className="font-bold mb-2">Large Jobs ($1,500-$4,000)</h4>
                <p className="text-sm text-amber-800 dark:text-slate-300">
                  Large tree removal, complex rigging, multiple trees. Multi-day projects.
                </p>
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
                <h4 className="font-bold mb-2">Major Projects ($4,000+)</h4>
                <p className="text-sm text-amber-800 dark:text-slate-300">
                  Crane work, massive trees, extensive property clearing. Specialized equipment required.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
