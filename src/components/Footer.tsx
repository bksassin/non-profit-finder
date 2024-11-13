import React from 'react';
import { Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mt-16 pb-8">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="glass backdrop-blur-sm rounded-3xl p-8 shadow-lg">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="flex items-center justify-center flex-wrap gap-2 text-sm sm:text-base">
              <span className="text-gray-600">Made with</span>
              <Heart className="w-4 h-4 text-red-500 animate-pulse" />
              <span className="text-gray-600">by</span>
              <a 
                href="https://brandonsassin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 hover:underline"
              >
                Brandon Sassin
              </a>
              <span className="text-gray-400 mx-2">|</span>
              <span className="text-gray-600">for those that want to make a difference</span>
            </div>
            
            <div className="flex items-center justify-center flex-wrap gap-3 text-sm">
              <a 
                href="https://www.every.org/api" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 transition-colors duration-200 hover:underline"
              >
                Every.org API
              </a>
              <span className="text-gray-400">•</span>
              <a 
                href="https://www.globalgiving.org/api/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 transition-colors duration-200 hover:underline"
              >
                Globalgiving.org API
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}