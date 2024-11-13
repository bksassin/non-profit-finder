import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { SearchSection } from './components/SearchSection';
import { NonprofitGrid } from './components/NonprofitGrid';
import { LoadingSpinner } from './components/LoadingSpinner';
import { LoadMoreButton } from './components/LoadMoreButton';
import { EmptyState } from './components/EmptyState';
import { Footer } from './components/Footer';
import { LandingPage } from './components/LandingPage'
import { fetchNonprofits } from './api/nonprofitApi';
import { matchesSearch } from './utils/searchUtils';
import { SUGGESTED_CATEGORIES, ITEMS_PER_PAGE } from './constants';
import type { Nonprofit } from './types';

const DEFAULT_SEARCH_TERMS = [
  'nonprofit', 'charity', 'foundation', 'organization',
  'community', 'humanitarian', 'social', 'volunteer',
  'education', 'health', 'environment', 'arts',
  'youth', 'children', 'elderly', 'veterans',
  'research', 'cultural', 'religious', 'advocacy'
];

function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [nonprofits, setNonprofits] = useState<Nonprofit[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [activeCategory, setActiveCategory] = useState('');
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usedTerms, setUsedTerms] = useState<Set<string>>(new Set());

  const getRandomSearchTerms = (count: number): string[] => {
    const availableTerms = DEFAULT_SEARCH_TERMS.filter(term => !usedTerms.has(term));
    if (availableTerms.length === 0) {
      setUsedTerms(new Set());
      return DEFAULT_SEARCH_TERMS.slice(0, count);
    }
    return availableTerms
      .sort(() => Math.random() - 0.5)
      .slice(0, count);
  };

  const loadResults = async (isInitialLoad = false) => {
    try {
      setError(null);
      
      if (isInitialLoad) {
        setLoading(true);
        setPage(0);
        setNonprofits([]);
      } else {
        setLoadingMore(true);
      }

      const currentOffset = isInitialLoad ? 0 : page * ITEMS_PER_PAGE;
      let searchTerms: string[] = [];

      if (activeCategory) {
        const category = SUGGESTED_CATEGORIES.find(cat => cat.name === activeCategory);
        searchTerms = category?.terms || [];
      } else if (search) {
        searchTerms = [search];
      } else {
        searchTerms = getRandomSearchTerms(5);
        setUsedTerms(prev => new Set([...prev, ...searchTerms]));
      }

      const searchPromises = searchTerms.map(term => 
        fetchNonprofits(term, currentOffset)
      );

      const searchResults = await Promise.all(searchPromises);
      
      const allResults = searchResults.flatMap(result => result.results);
      const totalCount = Math.max(...searchResults.map(result => result.total));
      
      let filteredResults = allResults;
      if (activeCategory) {
        const category = SUGGESTED_CATEGORIES.find(cat => cat.name === activeCategory);
        filteredResults = allResults.filter(nonprofit => {
          const searchText = `${nonprofit.name} ${nonprofit.description}`.toLowerCase();
          return category?.terms.some(term => searchText.includes(term.toLowerCase()));
        });
      } else if (search) {
        filteredResults = allResults.filter(nonprofit => matchesSearch(nonprofit, search));
      }

      // Remove duplicates based on id
      const uniqueResults = Array.from(
        new Map(filteredResults.map(item => [item.id, item])).values()
      );

      if (isInitialLoad) {
        setNonprofits(uniqueResults);
      } else {
        setNonprofits(prev => {
          const combined = [...prev, ...uniqueResults];
          return Array.from(new Map(combined.map(item => [item.id, item])).values());
        });
      }

      setHasMore(uniqueResults.length >= ITEMS_PER_PAGE);
      setPage(prev => isInitialLoad ? 0 : prev + 1);

    } catch (error) {
      setError('Failed to load nonprofits. Please try again later.');
      console.error('Error loading results:', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleCategoryClick = (categoryName: string) => {
    if (activeCategory === categoryName) {
      setActiveCategory('');
    } else {
      setActiveCategory(categoryName);
      setSearch('');
    }
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      loadResults(true);
    }, 300);
    return () => clearTimeout(debounce);
  }, [search, activeCategory]);

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisitedBefore');
    if (hasVisited) {
      setShowLanding(false);
    }
  }, []);

  const handleStart = () => {
    localStorage.setItem('hasVisitedBefore', 'true');
    setShowLanding(false);
  };

  if (showLanding) {
    return <LandingPage onStart={handleStart} />;
  }

  return (
    <div className="min-h-screen">
      <main className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Header />
          
          <SearchSection
            search={search}
            onSearchChange={setSearch}
            activeCategory={activeCategory}
            onCategoryClick={handleCategoryClick}
          />

          {error ? (
            <div className="text-center py-8">
              <p className="text-red-600">{error}</p>
            </div>
          ) : loading ? (
            <LoadingSpinner />
          ) : nonprofits.length > 0 ? (
            <>
              <NonprofitGrid nonprofits={nonprofits} />
              
              {hasMore && (
                <div className="flex justify-center mt-8">
                  <LoadMoreButton
                    loading={loadingMore}
                    onClick={() => loadResults(false)}
                  />
                </div>
              )}
            </>
          ) : (
            <EmptyState />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;