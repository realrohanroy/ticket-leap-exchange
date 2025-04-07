
import React from 'react';
import { Ticket } from '@/types';
import TicketCard from './TicketCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RailSymbol, Bus, Ticket as TicketIcon } from 'lucide-react';

type TicketListProps = {
  tickets: Ticket[];
  onDeleteTicket?: (ticketId: string) => void;
};

const TicketList: React.FC<TicketListProps> = ({ tickets, onDeleteTicket }) => {
  if (tickets.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No tickets found</p>
      </div>
    );
  }

  const railTickets = tickets.filter(ticket => ticket.mode === 'rail');
  const busTickets = tickets.filter(ticket => ticket.mode === 'bus');

  return (
    <div>
      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all" className="flex items-center">
            <TicketIcon className="mr-1 h-4 w-4" /> All ({tickets.length})
          </TabsTrigger>
          <TabsTrigger value="rail" className="flex items-center">
            <RailSymbol className="mr-1 h-4 w-4" /> Rail ({railTickets.length})
          </TabsTrigger>
          <TabsTrigger value="bus" className="flex items-center">
            <Bus className="mr-1 h-4 w-4" /> Bus ({busTickets.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tickets.map(ticket => (
              <TicketCard 
                key={ticket.id} 
                ticket={ticket} 
                onDelete={onDeleteTicket}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="rail" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {railTickets.map(ticket => (
              <TicketCard 
                key={ticket.id} 
                ticket={ticket} 
                onDelete={onDeleteTicket}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="bus" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {busTickets.map(ticket => (
              <TicketCard 
                key={ticket.id} 
                ticket={ticket} 
                onDelete={onDeleteTicket}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TicketList;
