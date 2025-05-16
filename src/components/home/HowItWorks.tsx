
import React from 'react';

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      title: 'Create Account',
      description: 'Sign up and complete our verification process to join our trusted community.',
      color: 'bg-blue-500'
    },
    {
      number: 2,
      title: 'Search or Post',
      description: 'Look for available seats or post your unused ticket information for others.',
      color: 'bg-green-500'
    },
    {
      number: 3,
      title: 'Connect on WhatsApp',
      description: 'Contact verified travelers directly through WhatsApp to arrange your journey.',
      color: 'bg-orange-500'
    }
  ];

  return (
    <div className="py-10 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 sm:text-4xl">How ShareMySeat Works</h2>
          <p className="mt-3 md:mt-4 max-w-2xl mx-auto text-base md:text-xl text-gray-600">
            Simple steps to connect with fellow travelers
          </p>
        </div>

        <div className="mt-8 md:mt-16">
          <div className="relative">
            {/* Connection Line - only visible on desktop */}
            <div className="hidden absolute top-16 w-full h-1 bg-gray-200 lg:block" aria-hidden="true"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-x-8">
              {steps.map((step) => (
                <div key={step.number} className="mb-8 md:mb-0">
                  <div className="flex flex-col items-center">
                    <div className={`flex items-center justify-center h-12 w-12 md:h-14 md:w-14 rounded-full ${step.color} text-white font-bold text-lg md:text-xl shadow-lg`}>
                      {step.number}
                    </div>
                    <h3 className="mt-4 md:mt-6 text-lg font-medium text-gray-900 text-center">{step.title}</h3>
                    <p className="mt-2 text-sm md:text-base text-gray-600 text-center max-w-xs mx-auto">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
