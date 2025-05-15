
import React from 'react';
import { Search } from 'lucide-react';

interface HeroSectionProps {
  children: React.ReactNode;
}

const HeroSection: React.FC<HeroSectionProps> = ({ children }) => {
  return (
    <div className="relative min-h-[600px] flex-1 bg-gradient-to-r from-blue-700 to-blue-900 text-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10"></div>
      
      <div className="container relative py-16 md:py-24 flex flex-col items-center z-10 px-4">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-8">          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            Journey Together, <span className="bg-gradient-to-r from-blue-300 to-white bg-clip-text text-transparent">Travel Smarter</span>
          </h1>
          
          <p className="text-xl max-w-2xl mx-auto mb-8 text-blue-50">
            Connect with verified travelers to find or share available seats for hassle-free journeys.
          </p>
        </div>
        
        <div className="w-full relative">
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-white/30 backdrop-blur-md w-full max-w-5xl h-12 rounded-t-xl"></div>
          <div className="relative bg-white/20 backdrop-blur-sm rounded-xl p-6 w-full max-w-4xl mx-auto shadow-2xl">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
