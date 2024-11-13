import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onCategoryReset: () => void;
}

export function SearchBar({ value, onChange, onCategoryReset }: SearchBarProps) {
  return (
    <div className="relative mb-4">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      <input
        type="text"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          onCategoryReset();
        }}
        placeholder="Search by name, location (e.g., CA, California), or description..."
        className="w-full pl-10 pr-4 py-3 rounded-xl glass glass-hover focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
      />
    </div>
  );
}