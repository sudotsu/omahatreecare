/** All cities and their neighborhoods — ported from locations.json */
export const locations: Record<string, string[]> = {
  omaha:      ['dundee', 'benson', 'florence', 'midtown', 'aksarben', 'westside', 'north-omaha', 'south-omaha'],
  millard:    ['old-millard', 'harvey-oaks', 'oak-hills', 'millard-highlands'],
  elkhorn:    ['the-ridges', 'pacific-springs', 'skyline-ranches', 'indian-creek'],
  gretna:     ['tiburon', 'aspen-creek', 'buffalo-creek'],
  ralston:    ['mockingbird-hills'],
  papillion:  ['shadow-lake', 'eagle-hills'],
  bellevue:   ['fontenelle-hills'],
  bennington: ['newport-landing'],
};

export const cities = Object.keys(locations) as (keyof typeof locations)[];

/** Flat list of all [city, neighborhood] pairs — for static param generation */
export const allNeighborhoods: { city: string; neighborhood: string }[] = cities.flatMap(
  city => locations[city].map(neighborhood => ({ city, neighborhood }))
);
