import React from 'react';
import { Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass rounded-2xl p-6">
          <p className="text-center text-gray-700 flex items-center justify-center flex-wrap gap-2">
            Made with <Heart className="w-4 h-4 text-red-500" /> by{' '}
            <a 
              href="https://brandonsassin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Brandon Sassin
            </a>
            for those that want to make a difference
            <span className="mx-2">•</span>
            <a 
              href="https://www.every.org/api" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700"
            >
              Every.org API
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}