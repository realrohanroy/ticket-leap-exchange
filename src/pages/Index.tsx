
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import TicketSearch from '@/components/tickets/TicketSearch';
import { SearchFilters } from '@/types';
import { RailSymbol, Bus, Calendar, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
      
      <div 
        className="relative flex-1 bg-gradient-to-b from-brand-blue to-blue-700 text-white"
      >
        <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10"></div>
        
        <div className="container relative pt-16 pb-24 flex flex-col items-center text-center z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Connect with Travelers, Find Your Ticket
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mb-10 opacity-90">
            Find last-minute confirmed tickets for bus and rail travel, 
            or help fellow travelers by posting tickets you can't use.
          </p>
          
          <TicketSearch 
            onSearch={handleSearch} 
            className="w-full max-w-4xl" 
            navigateOnSearch={true} 
          />
          
          <div className="mt-16 flex flex-wrap justify-center gap-8">
            <div className="bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-lg max-w-xs">
              <div className="mb-4 text-accent bg-white bg-opacity-20 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                <Search className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Search Tickets</h3>
              <p className="text-sm opacity-80">
                Find available tickets by city, route, and travel date from fellow travelers.
              </p>
            </div>
            
            <div className="bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-lg max-w-xs">
              <div className="mb-4 text-accent bg-white bg-opacity-20 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                <Calendar className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Last-Minute Travel</h3>
              <p className="text-sm opacity-80">
                Find confirmed tickets when regular options are sold out or waitlisted.
              </p>
            </div>
            
            <div className="bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-lg max-w-xs">
              <div className="mb-4 text-accent bg-white bg-opacity-20 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                <div className="flex">
                  <RailSymbol className="h-5 w-5" />
                  <Bus className="h-5 w-5 -ml-1" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Rail & Bus Options</h3>
              <p className="text-sm opacity-80">
                Browse tickets for both train and bus journeys across all routes.
              </p>
            </div>
          </div>
          
          {isAuthenticated ? (
            <Button 
              onClick={() => navigate('/post-ticket')} 
              className="mt-10 bg-accent hover:bg-accent/90 text-white"
              size="lg"
            >
              Post Your Ticket Now
            </Button>
          ) : (
            <div className="mt-10">
              <p className="mb-2 text-sm">Have a ticket you can't use?</p>
              <Button 
                onClick={() => navigate('/post-ticket')} 
                className="bg-accent hover:bg-accent/90 text-white"
                size="lg"
              >
                Post Your Ticket Now
              </Button>
            </div>
          )}
        </div>
      </div>
      
      <footer className="bg-gray-900 text-white py-6">
        <div className="container text-center text-sm">
          <p>© 2025 TicketLeap Exchange. All rights reserved.</p>
          <p className="mt-2 text-gray-400">A simple platform to help travelers find tickets.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
