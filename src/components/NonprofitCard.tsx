import React, { useState } from 'react';
import { ExternalLink, MapPin, Tag, Info, ChevronDown, ChevronUp, Globe } from 'lucide-react';
import type { Nonprofit } from '../types';

interface NonprofitCardProps {
  nonprofit: Nonprofit;
}

export function NonprofitCard({ nonprofit }: NonprofitCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const renderTags = () => {
    if (nonprofit.source !== 'everyorg') return null;
    
    return nonprofit.tags.slice(0, 3).map((tag, index) => (
      <span
        key={`${nonprofit.id}-tag-${index}`}
        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
      >
        <Tag className="w-3 h-3 mr-1" />
        {typeof tag === 'string' ? tag : ''}
      </span>
    ));
  };

  const shouldShowReadMore = nonprofit.description.length > 200;
  const displayDescription = isExpanded ? nonprofit.description : (
    shouldShowReadMore ? `${nonprofit.description.slice(0, 200)}...` : nonprofit.description
  );

  const donateUrl = nonprofit.source === 'everyorg'
    ? (nonprofit.slug ? `https://www.every.org/${nonprofit.slug}#/donate` : nonprofit.websiteUrl)
    : nonprofit.profileUrl;

  return (
    <div className="h-full">
      <div className="h-full glass glass-hover rounded-2xl overflow-hidden shadow-lg">
        {nonprofit.coverImageUrl && (
          <div className="relative h-48">
            <div className="absolute top-4 right-4 z-10">
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-white/80 text-gray-700 shadow-sm">
                <Globe className="w-3 h-3 mr-1" />
                {nonprofit.source === 'everyorg' ? 'Every.org' : 'Global Giving'}
              </span>
            </div>
            <img
              src={nonprofit.coverImageUrl}
              alt={nonprofit.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            {nonprofit.logoUrl && (
              <div className="absolute bottom-0 left-4 transform translate-y-1/2 w-16 h-16 rounded-xl overflow-hidden border-4 border-white shadow-lg">
                <img
                  src={nonprofit.logoUrl}
                  alt={`${nonprofit.name} logo`}
                  className="w-full h-full object-cover bg-white"
                />
              </div>
            )}
          </div>
        )}
        
        <div className={`p-6 ${nonprofit.coverImageUrl && nonprofit.logoUrl ? 'pt-12' : ''}`}>
          <h3 className="text-xl font-bold text-gray-900 mb-2">{nonprofit.name}</h3>
          
          <div className="flex items-center text-gray-600 mb-3">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="text-sm">{nonprofit.location}</span>
          </div>
          
          <div className="mb-4">
            <p className="text-gray-700">
              {displayDescription}
            </p>
            {shouldShowReadMore && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-2 text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
              >
                {isExpanded ? (
                  <>
                    Show less
                    <ChevronUp className="w-4 h-4 ml-1" />
                  </>
                ) : (
                  <>
                    Read more
                    <ChevronDown className="w-4 h-4 ml-1" />
                  </>
                )}
              </button>
            )}
          </div>
          
          {nonprofit.source === 'everyorg' && nonprofit.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {renderTags()}
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-3">
            <a
              href={nonprofit.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              <Info className="w-4 h-4 mr-2" />
              Learn More
            </a>
            
            <a
              href={donateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Donate
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}