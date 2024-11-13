import { Nonprofit, NonprofitApiResponse } from '../types';
import { ITEMS_PER_PAGE } from '../constants';

const API_KEY = 'pk_live_92627da7257d1affac0777ccf38238e7';

const filterAndMapNonprofits = (nonprofits: any[]): Nonprofit[] => {
  return nonprofits
    .filter(np => (
      np.name &&
      np.description &&
      np.location &&
      np.websiteUrl &&
      (np.slug || np.websiteUrl)
    ))
    .map(np => ({
      id: `${np.ein || np.websiteUrl}-${np.slug || ''}`.replace(/[^\w-]/g, '-'),
      name: np.name,
      description: np.description,
      logoUrl: np.logoUrl || '',
      coverImageUrl: np.coverImageUrl || '',
      location: np.location,
      tags: np.causes || [],
      websiteUrl: np.websiteUrl,
      ein: np.ein || '',
      profileUrl: np.profileUrl || '',
      slug: np.slug || ''
    }));
};

export const fetchNonprofits = async (searchTerm: string, offset: number): Promise<NonprofitApiResponse> => {
  try {
    if (!searchTerm.trim()) {
      return { results: [], hasMore: false, total: 0 };
    }

    const encodedTerm = encodeURIComponent(searchTerm.trim());
    const url = `https://partners.every.org/v0.2/search/${encodedTerm}?apiKey=${API_KEY}&take=${ITEMS_PER_PAGE}&offset=${offset}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data || !Array.isArray(data.nonprofits)) {
      console.warn('Invalid API response structure:', data);
      return { results: [], hasMore: false, total: 0 };
    }

    const results = filterAndMapNonprofits(data.nonprofits);
    const total = parseInt(data.total) || 0;
    const hasMore = results.length === ITEMS_PER_PAGE && offset + results.length < total;

    return {
      results,
      hasMore,
      total
    };
  } catch (error) {
    console.error('Error fetching nonprofits:', error);
    throw error;
  }
};