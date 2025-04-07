
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import TicketSearch from '@/components/tickets/TicketSearch';
import TicketList from '@/components/tickets/TicketList';
import { SearchFilters, Ticket } from '@/types';
import { format, parseISO, isAfter, startOfDay } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';
import { TriangleAlert } from 'lucide-react';

const Search = () => {
  const location = useLocation();
  const initialFilters = location.state?.filters || {};
  
  const [filters, setFilters] = useState<SearchFilters>(initialFilters);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTickets = () => {
    setLoading(true);
    
    // In a real app, this would be an API call
    // For demo purposes, we'll use localStorage
    setTimeout(() => {
      try {
        const storedTickets = JSON.parse(localStorage.getItem('tickets') || '[]');
        
        // Filter expired tickets (past travel date)
        const today = startOfDay(new Date());
        const validTickets = storedTickets.filter((ticket: Ticket) => {
          const ticketDate = parseISO(ticket.travelDate);
          return isAfter(ticketDate, today);
        });
        
        // Apply search filters
        let filteredTickets = [...validTickets];
        
        if (filters.fromCity) {
          filteredTickets = filteredTickets.filter(ticket => 
            ticket.fromCity.toLowerCase().includes(filters.fromCity!.toLowerCase())
          );
        }
        
        if (filters.toCity) {
          filteredTickets = filteredTickets.filter(ticket => 
            ticket.toCity.toLowerCase().includes(filters.toCity!.toLowerCase())
          );
        }
        
        if (filters.travelDate) {
          const searchDate = filters.travelDate;
          filteredTickets = filteredTickets.filter(ticket => 
            ticket.travelDate === searchDate
          );
        }
        
        if (filters.mode && filters.mode !== 'all') {
          filteredTickets = filteredTickets.filter(ticket => 
            ticket.mode === filters.mode
          );
        }
        
        if (filters.ticketType) {
          filteredTickets = filteredTickets.filter(ticket => 
            ticket.ticketType === filters.ticketType
          );
        }
        
        // Update view counts (in a real app, this would be done via API)
        const updatedTickets = filteredTickets.map((ticket: Ticket) => ({
          ...ticket,
          viewCount: ticket.viewCount + 1
        }));
        
        // Save updated view counts
        const allTicketsWithUpdatedViews = storedTickets.map((ticket: Ticket) => {
          const updatedTicket = updatedTickets.find((t: Ticket) => t.id === ticket.id);
          return updatedTicket || ticket;
        });
        
        localStorage.setItem('tickets', JSON.stringify(allTicketsWithUpdatedViews));
        
        setTickets(updatedTickets);
      } catch (error) {
        console.error('Error fetching tickets:', error);
        setTickets([]);
      } finally {
        setLoading(false);
      }
    }, 1000);
  };

  useEffect(() => {
    fetchTickets();
  }, [filters]);

  const handleSearch = (newFilters: SearchFilters) => {
    setFilters({...filters, ...newFilters});
  };

  // Construct search summary text
  const getSearchSummary = () => {
    const parts = [];
    
    if (filters.fromCity && filters.toCity) {
      parts.push(`${filters.fromCity} to ${filters.toCity}`);
    } else if (filters.fromCity) {
      parts.push(`From ${filters.fromCity}`);
    } else if (filters.toCity) {
      parts.push(`To ${filters.toCity}`);
    }
    
    if (filters.travelDate) {
      const formattedDate = format(parseISO(filters.travelDate), 'MMM dd, yyyy');
      parts.push(`on ${formattedDate}`);
    }
    
    if (filters.mode && filters.mode !== 'all') {
      parts.push(`(${filters.mode === 'rail' ? 'Train' : 'Bus'})`);
    }
    
    return parts.length > 0 ? parts.join(' ') : 'All tickets';
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container">
          <div className="mb-8">
            <TicketSearch onSearch={handleSearch} />
          </div>
          
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Search Results</h1>
            <p className="text-muted-foreground">{getSearchSummary()}</p>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="rounded-lg border p-4">
                  <div className="flex justify-between">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-12" />
                  </div>
                  <Skeleton className="h-7 w-3/4 mt-3" />
                  <Skeleton className="h-5 w-1/2 mt-3" />
                  <Skeleton className="h-5 w-2/3 mt-3" />
                  <Skeleton className="h-12 w-full mt-3" />
                </div>
              ))}
            </div>
          ) : tickets.length > 0 ? (
            <TicketList tickets={tickets} />
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
              <TriangleAlert className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h2 className="text-2xl font-semibold mb-2">No tickets found</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                We couldn't find any tickets matching your search criteria. Try adjusting your search or check back later.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Search;
