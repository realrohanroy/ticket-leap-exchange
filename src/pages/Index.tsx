
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import TicketSearch from '@/components/tickets/TicketSearch';
import { SearchFilters } from '@/types';
import { Armchair, Calendar, Search, Shield, Info, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const isMobile = useIsMobile();

  const handleSearch = (filters: SearchFilters) => {
    navigate('/search', { state: { filters } });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div 
        className="relative flex-1 bg-gradient-to-b from-brand-blue to-blue-700 text-white"
      >
        <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10"></div>
        
        <div className="container relative pt-6 md:pt-16 pb-12 md:pb-24 flex flex-col items-center text-center z-10 px-4">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4 leading-tight">
            Travel Smarter, Together
          </h1>
          <p className="text-base md:text-xl max-w-2xl mb-6 md:mb-10 opacity-90">
            Only place to share or find valid intercity travel tickets.
            <br className="hidden md:block" />
            We connect verified users who want to help other travelers.
          </p>
          
          <TicketSearch 
            onSearch={handleSearch} 
            className="w-full max-w-4xl" 
            navigateOnSearch={true} 
          />
          
          <div className="mt-10 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            <div className="bg-white bg-opacity-10 backdrop-blur-md p-4 md:p-6 rounded-lg max-w-xs mx-auto w-full">
              <div className="mb-3 md:mb-4 text-accent bg-white bg-opacity-20 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mx-auto">
                <Search className="h-5 w-5 md:h-6 md:w-6" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">Search Tickets</h3>
              <p className="text-xs md:text-sm opacity-80">
                Find available tickets by city, route, and travel date from fellow travelers.
              </p>
            </div>
            
            <div className="bg-white bg-opacity-10 backdrop-blur-md p-4 md:p-6 rounded-lg max-w-xs mx-auto w-full">
              <div className="mb-3 md:mb-4 text-accent bg-white bg-opacity-20 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mx-auto">
                <Calendar className="h-5 w-5 md:h-6 md:w-6" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">Last-Minute Travel</h3>
              <p className="text-xs md:text-sm opacity-80">
                Find confirmed tickets when regular options are sold out or waitlisted.
              </p>
            </div>
            
            <div className="bg-white bg-opacity-10 backdrop-blur-md p-4 md:p-6 rounded-lg max-w-xs mx-auto w-full sm:col-span-2 lg:col-span-1">
              <div className="mb-3 md:mb-4 text-accent bg-white bg-opacity-20 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mx-auto">
                <Armchair className="h-5 w-5 md:h-6 md:w-6" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">Rail & Bus Options</h3>
              <p className="text-xs md:text-sm opacity-80">
                Browse tickets for both train and bus journeys across all routes.
              </p>
            </div>
          </div>
          
          <div className="mt-10 md:mt-16 w-full max-w-4xl mx-auto">
            <div className="bg-white bg-opacity-10 backdrop-blur-md p-4 md:p-6 rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-3 md:mb-4">
                <Info className="h-5 w-5 md:h-6 md:w-6 text-accent" />
                <h2 className="text-xl md:text-2xl font-semibold">Important Information</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-4 md:mt-6">
                <div className="bg-white bg-opacity-5 p-3 md:p-4 rounded-md flex items-start gap-3">
                  <div className="bg-white bg-opacity-10 p-1.5 md:p-2 rounded-full text-accent flex-shrink-0">
                    <AlertTriangle className="h-4 w-4 md:h-5 md:w-5" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium text-sm md:text-base">Not a Ticket Broker</h3>
                    <p className="text-xs md:text-sm opacity-80">We don't facilitate ticket transfers or guarantee validity of tickets.</p>
                  </div>
                </div>
                
                <div className="bg-white bg-opacity-5 p-3 md:p-4 rounded-md flex items-start gap-3">
                  <div className="bg-white bg-opacity-10 p-1.5 md:p-2 rounded-full text-accent flex-shrink-0">
                    <Shield className="h-4 w-4 md:h-5 md:w-5" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium text-sm md:text-base">Verify Before Meeting</h3>
                    <p className="text-xs md:text-sm opacity-80">Always verify ticket validity before arranging any transaction.</p>
                  </div>
                </div>
              </div>
              
              <Button 
                asChild
                variant="default"
                className="mt-4 md:mt-6 bg-accent hover:bg-accent/90 text-white shadow-lg hover:shadow-accent/30 transition-all text-xs md:text-sm py-1.5 md:py-2 h-auto"
              >
                <Link to="/terms" className="flex items-center gap-1.5">
                  <Shield className="h-3.5 w-3.5 md:h-4 md:w-4" />
                  <span>Read Full Terms of Use</span>
                </Link>
              </Button>
            </div>
          </div>
          
          {isAuthenticated ? (
            <Button 
              onClick={() => navigate('/post-ticket')} 
              className="mt-8 md:mt-10 bg-accent hover:bg-accent/90 text-white"
              size={isMobile ? "default" : "lg"}
            >
              Post Your Ticket Now
            </Button>
          ) : (
            <div className="mt-8 md:mt-10">
              <p className="mb-2 text-xs md:text-sm">Have a ticket you can't use?</p>
              <Button 
                onClick={() => navigate('/post-ticket')} 
                className="bg-accent hover:bg-accent/90 text-white"
                size={isMobile ? "default" : "lg"}
              >
                Post Your Ticket Now
              </Button>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
