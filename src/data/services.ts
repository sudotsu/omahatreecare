export interface ServicePage {
  title: string;
  slug: string;
  meta_desc: string;
  hero_headline: string;
  hero_sub: string;
  pain_point: string;
  solution: string;
  benefit_1: string;
  benefit_2: string;
  benefit_3: string;
}

export const servicesData: Record<string, ServicePage> = {
  'tree-removal': {
    title:          'Hazardous & Large Tree Removal',
    slug:           'tree-removal',
    meta_desc:      'Request an on-site estimate for large, hazardous, or access-constrained tree removal in the Omaha area.',
    hero_headline:  'Large & Hazardous Tree Removal',
    hero_sub:       'Start with a site-specific review of access, targets, and removal options.',
    pain_point:     'Trees near roofs, fences, utilities, and narrow access require a careful site-specific work plan.',
    solution:       'Midwest Roots reviews the tree, nearby targets, access, and equipment needs before proposing a removal approach. Availability of specialized equipment is confirmed during estimating.',
    benefit_1:      'Access & Target Review',
    benefit_2:      'Site-Specific Work Plan',
    benefit_3:      'Written Scope Before Work',
  },
  'tree-trimming': {
    title:          'Corrective Pruning & Deadwooding',
    slug:           'tree-trimming',
    meta_desc:      'Request an on-site estimate for pruning and deadwood removal based on the tree, objectives, targets, and access.',
    hero_headline:  'Structural Pruning & Deadwood Removal',
    hero_sub:       'Define the pruning objective and written work scope before cutting.',
    pain_point:     'Indiscriminate topping and poorly placed cuts can create lasting tree problems, while visible dead or damaged branches may need site-specific review.',
    solution:       'We discuss pruning goals and a bounded work scope before cutting. Qualified independent review remains appropriate for safety-critical or preservation-sensitive trees.',
    benefit_1:      'Address Visible Deadwood',
    benefit_2:      'Improve Sunlight & Airflow',
    benefit_3:      'No Spikes on Live Trees',
  },
  'tree-health-assessment': {
    title:          'No-Pressure Tree Health Assessment',
    slug:           'tree-health-assessment',
    meta_desc:      'Request an on-site tree-service estimate and discuss the visible concerns you have noticed.',
    hero_headline:  'Talk Through What You Are Seeing.',
    hero_sub:       'A service conversation can clarify next steps; it is not a credentialed risk assessment.',
    pain_point:     'Worrying about a leaning tree keeps you up at night, but calling for a \'quote\' feels like inviting a salesman to pressure you.',
    solution:       'Midwest Roots can review the requested service and explain what an estimate covers. Diagnosis or formal risk assessment should be handled by an appropriately credentialed professional.',
    benefit_1:      'Visible-Concern Review',
    benefit_2:      'Service-Scope Discussion',
    benefit_3:      'Clear Estimate Next Steps',
  },
  'winter-tree-prep': {
    title:          'Winter Storm Structural Support',
    slug:           'winter-tree-prep',
    meta_desc:      'Discuss winter pruning concerns and site-specific service options for Omaha-area trees.',
    hero_headline:  'Winter Defense: Weight Reduction',
    hero_sub:       'Plan before winter weather adds load to vulnerable branches.',
    pain_point:     'Ice can add substantial load to branches. Visible defects, long limbs, and nearby targets are reasons to discuss a site-specific work plan.',
    solution:       'A site review can identify the branches and targets you are concerned about and determine whether pruning is an appropriate service option.',
    benefit_1:      'Reduce End-Weight Leverage',
    benefit_2:      'Service Options Confirmed On Site',
    benefit_3:      'Target-Aware Work Scope',
  },
};

export const serviceIds = Object.keys(servicesData);
