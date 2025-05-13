
import React from 'react';

interface HeroSectionProps {
  children: React.ReactNode;
}

const HeroSection: React.FC<HeroSectionProps> = ({ children }) => {
  return (
    <div className="relative flex-1 bg-gradient-to-b from-brand-blue to-blue-700 text-white">
      <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10"></div>
      
      <div className="container relative py-12 md:py-24 flex flex-col items-center text-center z-10 px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          Journey Together, Travel Smarter
        </h1>
        <p className="text-xl max-w-2xl mx-auto mb-6 text-blue-50">
          Connect with verified travelers across Maharashtra to find or share available seats for hassle-free journeys.
        </p>
        
        {children}
      </div>
    </div>
  );
};

export default HeroSection;
