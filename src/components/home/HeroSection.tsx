
import React from 'react';
import { Car, Bus, Train, MapPin, Calendar, Users } from 'lucide-react';

interface HeroSectionProps {
  children: React.ReactNode;
}

const HeroSection: React.FC<HeroSectionProps> = ({ children }) => {
  return (
    <div className="relative bg-gradient-to-r from-blue-700 to-blue-900 min-h-[600px] flex-1 text-white overflow-hidden">
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
          
          {/* Travel icons */}
          <div className="flex items-center justify-center gap-8 mb-12">
            <div className="flex flex-col items-center gap-2">
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-full">
                <Car className="h-8 w-8 text-blue-200" />
              </div>
              <span className="text-blue-100">Cars</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-full">
                <Bus className="h-8 w-8 text-blue-200" />
              </div>
              <span className="text-blue-100">Bus</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-full">
                <Train className="h-8 w-8 text-blue-200" />
              </div>
              <span className="text-blue-100">Train</span>
            </div>
          </div>
        </div>
        
        {/* Search form */}
        <div className="relative max-w-4xl mx-auto">
          <div className="absolute -top-6 left-0 right-0 h-12 bg-white/20 backdrop-blur-sm rounded-t-xl"></div>
          <div className="relative bg-white/15 backdrop-blur-md rounded-xl p-6 shadow-xl border border-white/20">
            {children}
          </div>
        </div>
        
        {/* Features below search */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 max-w-4xl mx-auto">
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm p-4 rounded-lg">
            <MapPin className="text-blue-200 h-5 w-5 flex-shrink-0" />
            <span className="text-blue-50">Multiple destinations</span>
          </div>
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm p-4 rounded-lg">
            <Calendar className="text-blue-200 h-5 w-5 flex-shrink-0" />
            <span className="text-blue-50">Flexible scheduling</span>
          </div>
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm p-4 rounded-lg">
            <Users className="text-blue-200 h-5 w-5 flex-shrink-0" />
            <span className="text-blue-50">Verified travelers</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
