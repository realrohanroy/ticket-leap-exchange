
import React from 'react';
import { Sparkles, Shield, CalendarCheck } from 'lucide-react';

const StatSection = () => {
  const benefits = [
    {
      icon: Shield,
      title: 'Safe & Verified',
      description: 'Every traveler on our platform goes through a verification process for your safety and peace of mind.'
    },
    {
      icon: Sparkles,
      title: 'Last-Minute Bookings',
      description: 'Find seats even when regular options are sold out or waitlisted.'
    },
    {
      icon: CalendarCheck,
      title: 'Flexible Travel Options',
      description: 'Choose from various modes of transport including trains, buses, and carpools that work best for you.'
    }
  ];

  return (
    <div className="bg-white py-8 md:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 md:mb-10 text-gray-900">Why Choose ShareMySeat</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex flex-col items-center text-center group p-4 touch-manipulation">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-brand-blue/10 flex items-center justify-center mb-3 md:mb-4 group-hover:bg-brand-blue/20 transition-colors">
                <benefit.icon className="w-6 h-6 md:w-7 md:h-7 text-brand-blue" />
              </div>
              <h3 className="text-base md:text-lg lg:text-xl font-bold text-gray-800 mb-2">
                {benefit.title}
              </h3>
              <p className="text-sm md:text-base text-gray-600">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatSection;
