
import React from 'react';
import { Star } from 'lucide-react';

const TestimonialSection = () => {
  const testimonials = [
    {
      initials: 'RK',
      name: 'Rahul K.',
      rating: 5,
      text: '"ShareMySeat was a lifesaver when I needed to travel urgently from Mumbai to Pune. All regular tickets were sold out, but I found a fellow traveler with an extra seat. The verification process gave me confidence, and the journey was pleasant and safe."'
    },
    {
      initials: 'PD',
      name: 'Priya D.',
      rating: 5,
      text: '"As a regular traveler between Nashik and Mumbai, I often have an extra seat in my car. ShareMySeat helps me connect with verified travelers, making my journeys more economical while helping others. The platform is intuitive and secure."'
    },
    {
      initials: 'AJ',
      name: 'Amit J.',
      rating: 4,
      text: '"What I appreciate most about ShareMySeat is the focus on safety. The verification process is thorough, and the safety guidelines are helpful. I\'ve used the platform multiple times for my Aurangabad-Pune travels and always had positive experiences."'
    }
  ];

  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">What Travelers Say</h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Join thousands of satisfied travelers across Maharashtra
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-8 shadow-sm">
              <div className="flex items-center mb-6">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-brand-blue font-bold text-lg">{item.initials}</span>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">{item.name}</h4>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i}
                        className={`h-5 w-5 ${i < item.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-700">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;
