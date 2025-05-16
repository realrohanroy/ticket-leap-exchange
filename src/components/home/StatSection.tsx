
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
    <div className="bg-white py-10 md:py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 text-gray-900">Why Choose ShareMySeat</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex flex-col items-center text-center group p-4">
              <div className="w-14 h-14 rounded-full bg-brand-blue/10 flex items-center justify-center mb-4 group-hover:bg-brand-blue/20 transition-colors">
                <benefit.icon className="w-7 h-7 text-brand-blue" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 md:mb-3">{benefit.title}</h3>
              <p className="text-sm md:text-base text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatSection;
