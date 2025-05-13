
import React from 'react';
import { Fingerprint, ShieldCheck, MessageSquare, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

const TrustSection = () => {
  const trustItems = [
    {
      icon: Fingerprint,
      title: 'Verified Users Only',
      description: 'All users go through our verification process. We check mobile numbers, emails, and government IDs to ensure everyone on our platform is genuine.'
    },
    {
      icon: ShieldCheck,
      title: 'Information Platform Only',
      description: 'We are not a ticket reseller or transfer service. We simply connect travelers with each other, allowing them to share information about available seats.'
    },
    {
      icon: MessageSquare,
      title: 'Community Reviews',
      description: 'Our rating system helps maintain quality interactions. Users review each other after travel completion, building a trusted community of travelers.'
    },
    {
      icon: AlertTriangle,
      title: 'Safety Guidelines',
      description: 'We provide detailed safety guidelines for all users. Always verify identity and details before arranging any meeting for your safety.'
    }
  ];

  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="lg:text-center">
          <h2 className="text-base text-brand-blue font-semibold tracking-wide uppercase">Trust & Safety</h2>
          <p className="mt-2 text-3xl leading-8 font-bold tracking-tight text-gray-900 sm:text-4xl">
            Your Security is Our Priority
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            We've built ShareMySeat with safety at its core. Connecting with fellow travelers should be worry-free.
          </p>
        </div>

        <div className="mt-16">
          <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {trustItems.map((item, index) => (
              <div key={index} className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-brand-blue text-white">
                    <item.icon className="h-6 w-6" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">{item.title}</h3>
                  <p className="mt-2 text-base text-gray-500">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-10 text-center">
            <Link 
              to="/terms" 
              className="inline-flex items-center px-4 py-2 rounded-md shadow-sm text-sm font-medium text-white bg-brand-blue hover:bg-blue-600"
            >
              <ShieldCheck className="mr-2 h-4 w-4" />
              Read Our Safety Guidelines
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustSection;
