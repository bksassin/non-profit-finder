import { Nonprofit } from '../types';
import { matchesLocation, normalizeText } from './locationUtils';

export const matchesSearch = (nonprofit: Nonprofit, searchQuery: string): boolean => {
  const query = normalizeText(searchQuery);
  
  if (!query) return true;
  
  const searchableText = [
    nonprofit.name,
    nonprofit.description,
    nonprofit.location,
    ...nonprofit.tags
  ].join(' ').toLowerCase();
  
  const searchTerms = query.split(/\s+/).filter(Boolean);
  
  // Check if all search terms are found in the searchable text
  const allTermsMatch = searchTerms.every(term => 
    searchableText.includes(term) || matchesLocation(nonprofit.location, term)
  );
  
  return allTermsMatch;
};