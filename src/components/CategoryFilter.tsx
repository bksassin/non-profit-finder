import React from 'react';
import { Category } from '../types';

interface CategoryFilterProps {
  categories: Category[];
  activeCategory: string;
  onCategoryClick: (categoryName: string) => void;
}

export function CategoryFilter({ categories, activeCategory, onCategoryClick }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {categories.map((category) => (
        <button
          key={category.name}
          onClick={() => onCategoryClick(category.name)}
          className={`
            px-4 py-2 rounded-full text-sm font-medium
            transition-all duration-200 ease-in-out
            ${activeCategory === category.name 
              ? 'bg-blue-600 text-white shadow-lg scale-105' 
              : 'glass glass-hover text-gray-700'}
          `}
        >
          <span className="mr-1">{category.icon}</span>
          {category.name}
        </button>
      ))}
    </div>
  );
}