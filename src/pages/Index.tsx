
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import TicketSearch from '@/components/tickets/TicketSearch';
import HeroSection from '@/components/home/HeroSection';
import StatSection from '@/components/home/StatSection';
import FeatureSection from '@/components/home/FeatureSection';
import TrustSection from '@/components/home/TrustSection';
import HowItWorks from '@/components/home/HowItWorks';
import TestimonialSection from '@/components/home/TestimonialSection';
import CTASection from '@/components/home/CTASection';
import { SearchFilters } from '@/types';
import { useAuth } from '@/context/AuthContext';

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleSearch = (filters: SearchFilters) => {
    navigate('/search', { state: { filters } });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <HeroSection>
        <TicketSearch 
          onSearch={handleSearch} 
          className="w-full max-w-3xl mx-auto mt-12" 
          navigateOnSearch={true}
        />
      </HeroSection>
      
      <StatSection />
      
      <FeatureSection />
      
      <TrustSection />
      
      <HowItWorks />
      
      <TestimonialSection />
      
      <CTASection isAuthenticated={isAuthenticated} />
      
      <Footer />
    </div>
  );
};

export default Index;
