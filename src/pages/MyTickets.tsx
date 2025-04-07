
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import TicketList from '@/components/tickets/TicketList';
import { useAuth } from '@/context/AuthContext';
import { Ticket } from '@/types';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const MyTickets = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
      return;
    }

    fetchUserTickets();
  }, [isAuthenticated, user]);

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
    additionalInfo: dbTicket.additional_info || ""
  });

  const fetchUserTickets = async () => {
    if (!user) return;
    
    setLoading(true);
    console.log('Fetching tickets for user:', user.id);
    
    try {
      const { data, error } = await supabase
        .from('tickets')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      console.log('Fetched tickets:', data);
      const mappedTickets = data.map(mapTicket);
      setTickets(mappedTickets);
    } catch (error) {
      console.error('Error fetching tickets:', error);
      toast.error("Failed to load tickets");
      setTickets([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTicket = async (ticketId: string) => {
    try {
      console.log('Deleting ticket:', ticketId);
      const { error } = await supabase
        .from('tickets')
        .delete()
        .eq('id', ticketId);
      
      if (error) {
        throw error;
      }
      
      // Update state with filtered tickets
      setTickets(tickets.filter(ticket => ticket.id !== ticketId));
      toast.success("Ticket deleted successfully");
    } catch (error) {
      console.error('Error deleting ticket:', error);
      toast.error("Failed to delete ticket");
    }
  };

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">My Tickets</h1>
            <Button onClick={() => navigate('/post-ticket')}>Post New Ticket</Button>
          </div>
          
          {loading ? (
            <div className="text-center py-8">
              <p>Loading your tickets...</p>
            </div>
          ) : tickets.length > 0 ? (
            <TicketList tickets={tickets} onDeleteTicket={handleDeleteTicket} />
          ) : (
            <div className="text-center py-16 bg-gray-50 rounded-lg border border-gray-200">
              <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold mb-2">No tickets posted yet</h2>
              <p className="text-muted-foreground max-w-md mx-auto mb-6">
                You haven't posted any tickets yet. When you post tickets, they will appear here.
              </p>
              <Button onClick={() => navigate('/post-ticket')}>Post Your First Ticket</Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default MyTickets;
