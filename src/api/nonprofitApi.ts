import { Nonprofit, NonprofitApiResponse } from '../types';
import { fetchGlobalGivingNonprofits } from './globalGivingApi';
import { calculateSimilarity } from '../utils/stringUtils';
import { ITEMS_PER_PAGE } from '../constants';

const EVERYORG_API_KEY = 'pk_live_92627da7257d1affac0777ccf38238e7';

const filterAndMapEveryOrgNonprofits = (nonprofits: any[]): Nonprofit[] => {
  return nonprofits
    .filter(np => (
      np.name &&
      np.description &&
      np.location &&
      np.websiteUrl &&
      (np.slug || np.websiteUrl)
    ))
    .map(np => ({
      id: `eo-${np.ein || np.websiteUrl}-${np.slug || ''}`.replace(/[^\w-]/g, '-'),
      name: np.name,
      description: np.description,
      logoUrl: np.logoUrl || '',
      coverImageUrl: np.coverImageUrl || '',
      location: np.location,
      tags: np.causes || [],
      websiteUrl: np.websiteUrl,
      ein: np.ein || '',
      profileUrl: np.profileUrl || '',
      slug: np.slug || '',
      source: 'everyorg' as const
    }));
};

const fetchEveryOrgNonprofits = async (searchTerm: string, offset: number): Promise<NonprofitApiResponse> => {
  try {
    if (!searchTerm.trim()) {
      return { results: [], hasMore: false, total: 0 };
    }

    const encodedTerm = encodeURIComponent(searchTerm.trim());
    const url = `https://partners.every.org/v0.2/search/${encodedTerm}?apiKey=${EVERYORG_API_KEY}&take=${ITEMS_PER_PAGE}&offset=${offset}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data || !Array.isArray(data.nonprofits)) {
      console.warn('Invalid API response structure:', data);
      return { results: [], hasMore: false, total: 0 };
    }

    const results = filterAndMapEveryOrgNonprofits(data.nonprofits);
    const total = parseInt(data.total) || 0;
    const hasMore = results.length === ITEMS_PER_PAGE && offset + results.length < total;

    return {
      results,
      hasMore,
      total
    };
  } catch (error) {
    console.error('Error fetching Every.org nonprofits:', error);
    return { results: [], hasMore: false, total: 0 };
  }
};

const removeDuplicates = (nonprofits: Nonprofit[]): Nonprofit[] => {
  const uniqueNonprofits: Nonprofit[] = [];
  const SIMILARITY_THRESHOLD = 0.8;

  for (const nonprofit of nonprofits) {
    // Check if we already have a similar nonprofit
    const isDuplicate = uniqueNonprofits.some(existing => {
      const similarity = calculateSimilarity(existing.name, nonprofit.name);
      return similarity >= SIMILARITY_THRESHOLD;
    });

    if (!isDuplicate) {
      uniqueNonprofits.push(nonprofit);
    }
  }

  return uniqueNonprofits;
};

export const fetchNonprofits = async (searchTerm: string, offset: number): Promise<NonprofitApiResponse> => {
  try {
    // Fetch from both APIs in parallel
    const [everyOrgResults, globalGivingResults] = await Promise.all([
      fetchEveryOrgNonprofits(searchTerm, offset),
      fetchGlobalGivingNonprofits(searchTerm, offset)
    ]);

    // Combine results
    const combinedResults = [
      ...everyOrgResults.results,
      ...globalGivingResults.results
    ];

    // Remove duplicates using fuzzy matching
    const uniqueResults = removeDuplicates(combinedResults);

    // Sort results by name
    uniqueResults.sort((a, b) => a.name.localeCompare(b.name));

    return {
      results: uniqueResults.slice(0, ITEMS_PER_PAGE),
      hasMore: everyOrgResults.hasMore || globalGivingResults.hasMore,
      total: Math.min(everyOrgResults.total + globalGivingResults.total, 1000) // Cap total to avoid unrealistic numbers
    };
  } catch (error) {
    console.error('Error fetching combined nonprofits:', error);
    // Return just Every.org results if there's an error
    return fetchEveryOrgNonprofits(searchTerm, offset);
  }
};