
import React from 'react';
import { Search, Clock, Bus, CheckCircle } from 'lucide-react';

const FeatureSection = () => {
  const features = [
    {
      icon: Search,
      title: 'Find Verified Seats',
      description: 'Search for available seats by city, route, and travel date. All listings come from verified travelers across Maharashtra.',
      benefits: [
        'Real-time availability',
        'Transparent communication'
      ]
    },
    {
      icon: Clock,
      title: 'Last-Minute Solutions',
      description: 'Connect with travelers when regular options are sold out or waitlisted. Find alternatives even for same-day travel.',
      benefits: [
        'Emergency travel options',
        'Quick response times'
      ]
    },
    {
      icon: Bus,
      title: 'Multiple Travel Modes',
      description: 'Connect with travelers using trains, buses, and carpools across Maharashtra. Choose the mode that works best for you.',
      benefits: [
        'Trains, buses & carpools',
        'Flexible travel options'
      ]
    }
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Smart Travel Options
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Find the perfect travel companion for your next journey across Maharashtra.
          </p>
        </div>
        
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="p-8">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-brand-blue text-white">
                  <feature.icon className="h-6 w-6" />
                </div>
                
                <h3 className="mt-6 text-xl font-semibold text-gray-900">{feature.title}</h3>
                
                <p className="mt-4 text-base text-gray-500">
                  {feature.description}
                </p>
                
                <div className="mt-6">
                  {feature.benefits.map((benefit, i) => (
                    <div key={i} className={i > 0 ? "mt-2 flex items-center" : "flex items-center"}>
                      <CheckCircle className="flex-shrink-0 h-5 w-5 text-green-500" />
                      <span className="ml-2 text-sm text-gray-500">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
