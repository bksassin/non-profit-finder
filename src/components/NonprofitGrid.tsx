import React from 'react';
import { NonprofitCard } from './NonprofitCard';
import type { Nonprofit } from '../types';

interface NonprofitGridProps {
  nonprofits: Nonprofit[];
}

export function NonprofitGrid({ nonprofits }: NonprofitGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {nonprofits.map((nonprofit) => (
        <NonprofitCard key={nonprofit.id} nonprofit={nonprofit} />
      ))}
    </div>
  );
}