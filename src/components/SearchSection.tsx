import React from 'react';
import { SearchBar } from './SearchBar';
import { CategoryFilter } from './CategoryFilter';
import { SUGGESTED_CATEGORIES } from '../constants';
import type { Category } from '../types';

interface SearchSectionProps {
  search: string;
  onSearchChange: (value: string) => void;
  activeCategory: string;
  onCategoryClick: (category: string) => void;
}

export function SearchSection({
  search,
  onSearchChange,
  activeCategory,
  onCategoryClick,
}: SearchSectionProps) {
  return (
    <div className="max-w-xl mx-auto mb-12">
      <SearchBar 
        value={search}
        onChange={onSearchChange}
        onCategoryReset={() => onCategoryClick('')}
      />
      
      <CategoryFilter
        categories={SUGGESTED_CATEGORIES}
        activeCategory={activeCategory}
        onCategoryClick={onCategoryClick}
      />
    </div>
  );
}