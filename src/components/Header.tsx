import React from 'react';

export function Header() {
  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
        Global Non-Profit Finder
      </h1>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Discover and support impactful organizations making a difference worldwide
      </p>
    </div>
  );
}