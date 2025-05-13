
import React from 'react';

const StatSection = () => {
  const stats = [
    { value: '30+', label: 'Cities Connected' },
    { value: '5K+', label: 'Active Users' },
    { value: '12K+', label: 'Journeys Shared' },
    { value: '98%', label: 'Satisfaction Rate' },
  ];

  return (
    <div className="bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-4xl font-extrabold text-brand-blue">{stat.value}</p>
              <p className="mt-2 text-base font-medium text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatSection;
