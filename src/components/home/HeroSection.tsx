
import React from 'react';

interface HeroSectionProps {
  children: React.ReactNode;
}

const HeroSection: React.FC<HeroSectionProps> = ({ children }) => {
  return (
    <div className="relative bg-gradient-to-r from-blue-800 to-blue-600 min-h-[600px] flex-1 text-white overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10"></div>
      
      {/* Content container */}
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Find Your <span className="bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">Perfect Journey</span>
          </h1>
          
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
            Share rides with verified travelers and enjoy affordable, 
            convenient travel experiences across multiple options.
          </p>
        </div>
        
        {/* Search form */}
        <div className="relative max-w-4xl mx-auto">
          <div className="absolute -top-6 left-0 right-0 h-12 bg-white/20 backdrop-blur-sm rounded-t-xl"></div>
          <div className="relative bg-white/15 backdrop-blur-md rounded-xl p-6 shadow-xl border border-white/20">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
