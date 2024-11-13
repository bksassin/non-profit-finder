import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadMoreButtonProps {
  loading: boolean;
  onClick: () => void;
}

export function LoadMoreButton({ loading, onClick }: LoadMoreButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="px-6 py-3 text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl font-medium shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
    >
      {loading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          Loading...
        </>
      ) : (
        'Load More Results'
      )}
    </button>
  );
}