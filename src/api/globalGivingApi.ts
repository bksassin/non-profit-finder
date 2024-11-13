import { Nonprofit, GlobalGivingProject, NonprofitApiResponse } from '../types';
import { ITEMS_PER_PAGE } from '../constants';

const API_KEY = '024868e5-f1af-4fa2-b55a-3332c25191d4';
const BASE_URL = 'https://api.globalgiving.org/api/public/services/search/projects';

const getImageUrl = (imageLinks: any[] = []): string => {
  if (!Array.isArray(imageLinks) || imageLinks.length === 0) return '';
  
  // Find the largest image (they're typically ordered by size)
  const validLinks = imageLinks
    .filter(link => typeof link === 'object' && link.url)
    .sort((a, b) => {
      const sizeA = parseInt(a.size || '0');
      const sizeB = parseInt(b.size || '0');
      return sizeB - sizeA;
    });

  return validLinks[0]?.url || '';
};

const mapGlobalGivingToNonprofit = (project: any): Nonprofit | null => {
  try {
    if (!project?.organization?.name || !project.title) {
      return null;
    }

    // Handle image gallery properly
    const imageLinks = project.image?.imagelink || [];
    const coverImageUrl = getImageUrl(imageLinks);
    
    // Use organization logo or first project image as logo
    const logoUrl = project.organization.logoUrl || 
      (project.organization.image?.imagelink ? 
        getImageUrl(project.organization.image.imagelink) : 
        coverImageUrl);

    // Extract themes properly
    const themes = Array.isArray(project.themes?.theme) 
      ? project.themes.theme 
      : project.themes?.theme 
        ? [project.themes.theme]
        : [];

    return {
      id: `gg-${project.id}`,
      name: project.organization.name,
      description: project.summary || project.title,
      logoUrl,
      coverImageUrl,
      location: project.country || 'Global',
      tags: themes.filter(Boolean),
      websiteUrl: project.contactUrl || project.projectLink || '',
      ein: '',
      profileUrl: project.projectLink || '',
      slug: '',
      source: 'globalgiving' as const
    };
  } catch (error) {
    console.warn('Error mapping Global Giving project:', error);
    return null;
  }
};

export const fetchGlobalGivingNonprofits = async (
  searchTerm: string,
  offset: number
): Promise<NonprofitApiResponse> => {
  if (!searchTerm.trim()) {
    return { results: [], hasMore: false, total: 0 };
  }

  try {
    const params = new URLSearchParams({
      api_key: API_KEY,
      q: searchTerm,
      start: (offset + 1).toString(), // Global Giving uses 1-based indexing
      count: ITEMS_PER_PAGE.toString(),
    });

    const response = await fetch(`${BASE_URL}?${params}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data?.search?.response?.projects?.project) {
      return { results: [], hasMore: false, total: 0 };
    }

    const projects = data.search.response.projects.project;
    
    // Handle both single project and multiple projects responses
    const projectArray = Array.isArray(projects) ? projects : [projects];

    const results = projectArray
      .map(mapGlobalGivingToNonprofit)
      .filter((nonprofit): nonprofit is Nonprofit => nonprofit !== null);

    const total = parseInt(data.search.response.numberFound) || 0;
    const hasMore = results.length === ITEMS_PER_PAGE && offset + results.length < total;

    return {
      results,
      hasMore,
      total
    };
  } catch (error) {
    console.error('Error fetching Global Giving nonprofits:', error);
    // Return empty results instead of throwing
    return { results: [], hasMore: false, total: 0 };
  }
};