// Map of US state abbreviations to full names and common variations
export const STATE_MAPPINGS = {
  'AL': ['alabama'],
  'AK': ['alaska'],
  'AZ': ['arizona'],
  'AR': ['arkansas'],
  'CA': ['california', 'cali'],
  'CO': ['colorado'],
  'CT': ['connecticut'],
  'DE': ['delaware'],
  'FL': ['florida', 'fla'],
  'GA': ['georgia'],
  'HI': ['hawaii'],
  'ID': ['idaho'],
  'IL': ['illinois'],
  'IN': ['indiana'],
  'IA': ['iowa'],
  'KS': ['kansas'],
  'KY': ['kentucky'],
  'LA': ['louisiana'],
  'ME': ['maine'],
  'MD': ['maryland'],
  'MA': ['massachusetts', 'mass'],
  'MI': ['michigan'],
  'MN': ['minnesota', 'minn'],
  'MS': ['mississippi', 'miss'],
  'MO': ['missouri'],
  'MT': ['montana'],
  'NE': ['nebraska'],
  'NV': ['nevada'],
  'NH': ['new hampshire'],
  'NJ': ['new jersey'],
  'NM': ['new mexico'],
  'NY': ['new york'],
  'NC': ['north carolina'],
  'ND': ['north dakota'],
  'OH': ['ohio'],
  'OK': ['oklahoma'],
  'OR': ['oregon'],
  'PA': ['pennsylvania', 'penn'],
  'RI': ['rhode island'],
  'SC': ['south carolina'],
  'SD': ['south dakota'],
  'TN': ['tennessee', 'tenn'],
  'TX': ['texas'],
  'UT': ['utah'],
  'VT': ['vermont'],
  'VA': ['virginia'],
  'WA': ['washington', 'wash'],
  'WV': ['west virginia'],
  'WI': ['wisconsin', 'wisc'],
  'WY': ['wyoming'],
};

// Create reverse mapping for state lookups
const createStateVariationsMap = () => {
  const variations: Record<string, string> = {};
  
  Object.entries(STATE_MAPPINGS).forEach(([abbr, names]) => {
    // Add the abbreviation itself
    variations[abbr.toLowerCase()] = abbr;
    
    // Add all variations of the state name
    names.forEach(name => {
      variations[name.toLowerCase()] = abbr;
    });
  });
  
  return variations;
};

export const STATE_VARIATIONS = createStateVariationsMap();

export const normalizeText = (text: string): string => 
  text.toLowerCase().trim();

export const extractLocationParts = (location: string): string[] => {
  return location
    .toLowerCase()
    .split(/[\s,]+/)
    .filter(part => part.length > 0);
};

export const matchesLocation = (location: string, searchQuery: string): boolean => {
  const normalizedQuery = normalizeText(searchQuery);
  const locationParts = extractLocationParts(location);
  
  // Direct match in location string
  if (location.toLowerCase().includes(normalizedQuery)) {
    return true;
  }
  
  // Check if search query matches any state variation
  const stateAbbr = STATE_VARIATIONS[normalizedQuery];
  if (stateAbbr && locationParts.some(part => 
    part === stateAbbr.toLowerCase() || 
    STATE_MAPPINGS[stateAbbr].some(name => part.includes(name.toLowerCase()))
  )) {
    return true;
  }
  
  // Check each part of the location
  return locationParts.some(part => part.includes(normalizedQuery));
};