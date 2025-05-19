
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
    <div className="py-8 md:py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2">How ShareMySeat Works</h2>
          <p className="mt-2 md:mt-4 max-w-2xl mx-auto text-sm md:text-base lg:text-lg text-gray-600">
            Simple steps to connect with fellow travelers
          </p>
        </div>

        <div className="mt-8 md:mt-12">
          <div className="relative">
            {/* Connection Line - only visible on desktop */}
            <div className="hidden absolute top-16 w-full h-1 bg-gray-200 lg:block" aria-hidden="true"></div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {steps.map((step) => (
                <div key={step.number} className="mb-6 md:mb-0 touch-manipulation">
                  <div className="flex flex-col items-center">
                    <div className={`flex items-center justify-center h-12 w-12 md:h-14 md:w-14 rounded-full ${step.color} text-white font-bold text-lg md:text-xl shadow-lg`}>
                      {step.number}
                    </div>
                    <h3 className="mt-4 text-base md:text-lg font-medium text-gray-900 text-center">{step.title}</h3>
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
