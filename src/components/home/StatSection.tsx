
import React from 'react';
import { Car } from 'lucide-react';

const StatSection = () => {
  const stats = [
    { value: '10+', label: 'Cities Connected' },
    { value: '500+', label: 'Active Users' },
  ];

  return (
    <div className="bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-4xl font-extrabold text-brand-blue">{stat.value}</p>
              <p className="mt-2 text-base font-medium text-gray-500">{stat.label}</p>
            </div>
          ))}
          
          <div className="text-center p-4 bg-gray-50 rounded-lg shadow-sm">
            <div className="flex justify-center mb-2">
              <Car className="w-8 h-8 text-brand-blue" />
            </div>
            <p className="text-xl font-bold text-gray-800">Car Pooling</p>
            <p className="mt-2 text-sm text-gray-600">
              Share your car journey with others heading in the same direction. 
              Save costs and reduce your carbon footprint.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatSection;
