
import React from 'react';
import { Search, Clock, Bus, CheckCircle } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const FeatureSection = () => {
  const features = [
    {
      icon: Search,
      title: 'Find Verified Seats',
      description: 'Search for available seats by city, route, and travel date. All listings come from verified travelers across Maharashtra.',
      benefits: [
        'Real-time availability',
        'Transparent communication'
      ],
      imageBg: 'bg-blue-50'
    },
    {
      icon: Clock,
      title: 'Last-Minute Solutions',
      description: 'Connect with travelers when regular options are sold out or waitlisted. Find alternatives even for same-day travel.',
      benefits: [
        'Emergency travel options',
        'Quick response times'
      ],
      imageBg: 'bg-green-50'
    },
    {
      icon: Bus,
      title: 'Multiple Travel Modes',
      description: 'Connect with travelers using trains, buses, and carpools across Maharashtra. Choose the mode that works best for you.',
      benefits: [
        'Trains, buses & carpools',
        'Flexible travel options'
      ],
      imageBg: 'bg-orange-50'
    }
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Smart Travel Options
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Find the perfect travel companion for your next journey across Maharashtra.
          </p>
        </div>
        
        <div className="mt-16 grid gap-10 md:grid-cols-3">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-md border border-gray-100"
            >
              <AspectRatio ratio={16/9} className={`${feature.imageBg} flex items-center justify-center`}>
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-white shadow-sm">
                  <feature.icon className="h-8 w-8 text-brand-blue" />
                </div>
              </AspectRatio>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                
                <p className="mt-3 text-gray-600">
                  {feature.description}
                </p>
                
                <div className="mt-6 space-y-2">
                  {feature.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-center">
                      <CheckCircle className="flex-shrink-0 h-5 w-5 text-green-500" />
                      <span className="ml-2 text-gray-700">{benefit}</span>
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
