
import React from 'react';

interface HeroSectionProps {
  children: React.ReactNode;
}

const HeroSection: React.FC<HeroSectionProps> = ({ children }) => {
  return (
    <div className="relative min-h-[500px] md:min-h-[600px] flex-1 bg-gradient-to-r from-blue-700 to-blue-900 text-white">
      <div className="container relative py-8 md:py-16 lg:py-24 flex flex-col items-center z-10 px-4">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-4 md:mb-8">          
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-3 md:mb-4 leading-tight">
            Journey Together, <span className="bg-gradient-to-r from-blue-300 to-white bg-clip-text text-transparent">Travel Smarter</span>
          </h1>
          
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-4 md:mb-8 text-blue-50">
            Connect with verified travelers to find or share available seats for hassle-free journeys.
          </p>
        </div>
        
        <div className="w-full max-w-4xl mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
