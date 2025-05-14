
import React from 'react';
import { Star } from 'lucide-react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
    },
    {
      initials: 'SM',
      name: 'Sanya M.',
      rating: 5,
      text: '"I love how easy it is to find travel companions for my weekly trips to Lonavala. The app has a very straightforward interface and I feel safe knowing everyone is verified."'
    }
  ];

  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">What Travelers Say</h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
            Join satisfied travelers across Maharashtra
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Carousel className="w-full">
            <CarouselContent>
              {testimonials.map((item, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
                  <div className="h-full bg-white rounded-xl p-8 shadow-sm border border-gray-100">
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
                              className={`h-4 w-4 ${i < item.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 italic">{item.text}</p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="mt-6 flex justify-center gap-2">
              <CarouselPrevious className="position-static" />
              <CarouselNext className="position-static" />
            </div>
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;
