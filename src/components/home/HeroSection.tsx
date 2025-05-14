
import React from 'react';
import { Car, Bus, Train } from 'lucide-react';

interface HeroSectionProps {
  children: React.ReactNode;
}

const HeroSection: React.FC<HeroSectionProps> = ({ children }) => {
  const travelOptions = [
    { icon: Bus, title: 'Bus', description: 'Connect with travelers on the same bus route' },
    { icon: Train, title: 'Train', description: 'Find seats on trains across Maharashtra' },
    { icon: Car, title: 'Car Pooling', description: 'Share rides and reduce your carbon footprint' }
  ];
  
  return (
    <div className="relative min-h-[600px] flex-1 bg-gradient-to-b from-brand-blue to-blue-700 text-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10"></div>
      
      <div className="container relative py-16 md:py-24 flex flex-col items-center z-10 px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight text-center">
          Journey Together, Travel Smarter
        </h1>
        <p className="text-xl max-w-2xl mx-auto mb-8 text-blue-50 text-center">
          Connect with verified travelers across Maharashtra to find or share available seats for hassle-free journeys.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mx-auto mb-10">
          {travelOptions.map((option, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 transition-all hover:bg-white/20 border border-white/20">
              <div className="flex items-center justify-center mb-3">
                <option.icon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-lg font-bold text-center mb-2">{option.title}</h3>
              <p className="text-sm text-blue-50 text-center">{option.description}</p>
            </div>
          ))}
        </div>
        
        {children}
      </div>
    </div>
  );
};

export default HeroSection;
