
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import TicketSearch from '@/components/tickets/TicketSearch';
import TicketList from '@/components/tickets/TicketList';
import Disclaimer from '@/components/layout/Disclaimer';
import { SearchFilters, Ticket } from '@/types';
import { format, parseISO, isAfter, startOfDay } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';
import { TriangleAlert } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

const Search = () => {
  const location = useLocation();
  const initialFilters = location.state?.filters || {};
  
  const [filters, setFilters] = useState<SearchFilters>(initialFilters);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  const mapTicket = (dbTicket: any): Ticket => ({
    id: dbTicket.id,
    userId: dbTicket.user_id,
    mode: dbTicket.mode,
    fromCity: dbTicket.from_city,
    toCity: dbTicket.to_city,
    travelDate: dbTicket.travel_date,
    departureTime: dbTicket.departure_time,
    ticketType: dbTicket.ticket_type,
    trainOrBusName: dbTicket.train_or_bus_name,
    price: dbTicket.price,
    contactInfo: dbTicket.contact_info,
    viewCount: dbTicket.view_count,
    createdAt: dbTicket.created_at,
    additionalInfo: dbTicket.additional_info || "",
    status: dbTicket.status || "active",
    carModel: dbTicket.car_model,
    seatsAvailable: dbTicket.seats_available
  });

  const fetchTickets = async () => {
    setLoading(true);
    
    try {
      // Start with base query
      let query = supabase
        .from('tickets')
        .select('*')
        .eq('status', 'active'); // Only show active tickets
      
      // Apply filters
      if (filters.fromCity) {
        query = query.ilike('from_city', `%${filters.fromCity}%`);
      }
      
      if (filters.toCity) {
        query = query.ilike('to_city', `%${filters.toCity}%`);
      }
      
      if (filters.travelDate) {
        query = query.eq('travel_date', filters.travelDate);
      }
      
      if (filters.mode && filters.mode !== 'all') {
        query = query.eq('mode', filters.mode);
      }
      
      if (filters.ticketType) {
        query = query.eq('ticket_type', filters.ticketType);
      }
      
      // Order by recently added
      query = query.order('created_at', { ascending: false });
      
      const { data, error } = await query;
      
      if (error) {
        throw error;
      }
      
      const mappedTickets = data.map(mapTicket);
      
      // Update view counts
      for (const ticket of data) {
        await supabase
          .from('tickets')
          .update({ view_count: ticket.view_count + 1 })
          .eq('id', ticket.id);
      }
      
      setTickets(mappedTickets);
    } catch (error) {
      console.error('Error fetching tickets:', error);
      setTickets([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Validate that from and to cities are not the same
    if (filters.fromCity && filters.toCity && filters.fromCity === filters.toCity) {
      toast({
        title: "Invalid search",
        description: "Departure and destination cities cannot be the same",
        variant: "destructive"
      });
      // Reset toCity to prevent the search
      setFilters({...filters, toCity: undefined});
      return;
    }
    
    fetchTickets();
  }, [filters]);

  const handleSearch = (newFilters: SearchFilters) => {
    // Check if from and to cities are the same
    if (newFilters.fromCity && newFilters.toCity && newFilters.fromCity === newFilters.toCity) {
      toast({
        title: "Invalid search",
        description: "Departure and destination cities cannot be the same",
        variant: "destructive"
      });
      return;
    }
    
    setFilters({...filters, ...newFilters});
  };

  function getSearchSummary() {
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
      parts.push(`(${filters.mode === 'rail' ? 'Train' : filters.mode === 'bus' ? 'Bus' : 'Car Pool'})`);
    }
    
    return parts.length > 0 ? parts.join(' ') : 'All tickets';
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container">
          <div className="mb-8">
            <TicketSearch 
              onSearch={handleSearch} 
              navigateOnSearch={false} 
            />
          </div>
          
          <Disclaimer className="mb-6" />
          
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
