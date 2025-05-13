
import React from 'react';

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      title: 'Create Account',
      description: 'Sign up and complete our verification process to join our trusted community.'
    },
    {
      number: 2,
      title: 'Search or Post',
      description: 'Look for available seats or post your unused ticket information for others.'
    },
    {
      number: 3,
      title: 'Connect Directly',
      description: 'Contact verified travelers through our secure messaging system.'
    },
    {
      number: 4,
      title: 'Travel & Review',
      description: 'Travel together and leave reviews to help build our trusted community.'
    }
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">How ShareMySeat Works</h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Simple steps to connect with fellow travelers in Maharashtra
          </p>
        </div>

        <div className="mt-16">
          <div className="relative">
            {/* Connection Line */}
            <div className="hidden absolute top-12 w-full h-0.5 bg-gray-200 lg:block" aria-hidden="true"></div>
            
            <div className="relative lg:grid lg:grid-cols-4 lg:gap-x-8">
              {steps.map((step) => (
                <div key={step.number} className="lg:col-span-1 mb-10 lg:mb-0">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-brand-blue text-white font-bold text-xl">
                      {step.number}
                    </div>
                    <h3 className="mt-6 text-lg font-medium text-gray-900 text-center">{step.title}</h3>
                    <p className="mt-2 text-base text-gray-500 text-center">
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
