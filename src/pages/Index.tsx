
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import TicketSearch from '@/components/tickets/TicketSearch';
import HeroSection from '@/components/home/HeroSection';
import FeatureSection from '@/components/home/FeatureSection';
import HowItWorks from '@/components/home/HowItWorks';
import TestimonialSection from '@/components/home/TestimonialSection';
import CTASection from '@/components/home/CTASection';
import { SearchFilters } from '@/types';
import { useAuth } from '@/context/AuthContext';
import { useNavigateWithFallback } from '@/hooks/use-navigate-with-fallback';

const Index = () => {
  const navigate = useNavigateWithFallback();
  const { isAuthenticated } = useAuth();

  const handleSearch = (filters: SearchFilters) => {
    if (navigate) {
      navigate('/search', { state: { filters } });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <HeroSection>
        <TicketSearch 
          onSearch={handleSearch} 
          className="w-full max-w-3xl mx-auto" 
          navigateOnSearch={true}
        />
      </HeroSection>
      
      <FeatureSection />
      
      <HowItWorks />
      
      <TestimonialSection />
      
      <CTASection isAuthenticated={isAuthenticated} />
      
      <Footer />
    </div>
  );
};

export default Index;
