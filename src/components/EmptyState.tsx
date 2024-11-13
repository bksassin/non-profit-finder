import React from 'react';

export function EmptyState() {
  return (
    <div className="text-center py-20">
      <p className="text-gray-600">
        No nonprofits found with complete information. Try a different search term.
      </p>
    </div>
  );
}