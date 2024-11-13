import React from 'react';
import { Heart, ArrowRight, Search, BookOpen, HeartHandshake } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
}

export function LandingPage({ onStart }: LandingPageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="glass rounded-3xl p-8 md:p-12 max-w-4xl mx-auto text-center">
        <div className="flex justify-center mb-6">
          <Heart className="w-16 h-16 text-red-500 animate-pulse-colors hover:scale-102 transition-transform" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
        Welcome to the Global Non-Profit Network
        </h1>
        
        <p className="text-xl text-gray-800 mb-8">
          Discover and connect with nonprofits that are making a real difference in the world. 
          Our platform helps you find organizations aligned with causes you care about.
        </p>
        
        <div className="space-y-6 mb-8">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center mt-1">
              <Search className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-900 mb-1">
                Discover Impactful Organizations
              </h3>
              <p className="text-gray-700">
                Explore a curated collection of verified nonprofits working across various causes 
                - from environmental conservation to education, healthcare, and social justice. 
                Each organization is thoroughly vetted to ensure your support reaches genuine changemakers.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center mt-1">
              <BookOpen className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-900 mb-1">
                Understand Their Impact
              </h3>
              <p className="text-gray-700">
                Dive deep into each organization's mission, achievements, and ongoing projects. 
                Get transparent insights into how they're creating positive change in communities 
                and why your support matters. Make informed decisions about causes that resonate with you.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center mt-1">
              <HeartHandshake className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-900 mb-1">
                Make a Direct Difference
              </h3>
              <p className="text-gray-700">
                Connect directly with organizations and contribute to their causes. Whether through 
                donations, volunteering, or spreading awareness, you can be part of the solution. 
                Track your impact and see how your support helps create meaningful change.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={onStart}
          className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl hover:from-blue-700 hover:to-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 hover:-translate-y-0.5 shadow-lg"
        >
          Start Making an Impact
          <ArrowRight className="w-5 h-5 ml-2" />
        </button>
      </div>
    </div>
  );
}