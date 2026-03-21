export interface ServiceCost {
  name: string;
  description: string;
  priceRange: string;
  typical: string;
  factors: string[];
}

export const services: ServiceCost[] = [
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
];
