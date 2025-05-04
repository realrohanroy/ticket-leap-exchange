
import React from 'react';
import { Bus, RailSymbol, Calendar as CalendarIcon, Car } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format, parseISO } from 'date-fns';
import { Ticket as TicketType } from '@/types';

type TicketProps = {
  ticket: TicketType;
};

const Ticket: React.FC<TicketProps> = ({ ticket }) => {
  const formattedDate = format(parseISO(ticket.travelDate), 'MMM dd, yyyy');
  
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <Badge className={
              ticket.mode === 'rail' ? 'bg-brand-blue' : 
              ticket.mode === 'bus' ? 'bg-brand-orange' : 
              'bg-green-600'
            }>
              {ticket.mode === 'rail' ? (
                <RailSymbol className="mr-1 h-4 w-4" />
              ) : ticket.mode === 'bus' ? (
                <Bus className="mr-1 h-4 w-4" />
              ) : (
                <Car className="mr-1 h-4 w-4" />
              )}
              {ticket.mode === 'rail' ? 'Rail' : ticket.mode === 'bus' ? 'Bus' : 'Car Pool'}
            </Badge>
            <Badge variant="outline" className="ml-2">
              {ticket.ticketType}
            </Badge>
          </div>
          <Badge variant={ticket.price === 'Free' ? 'outline' : 'secondary'}>
            {ticket.price === 'Free' ? 'Free' : `₹${ticket.price}`}
          </Badge>
        </div>
        <CardTitle className="text-xl mt-2 font-bold">
          {ticket.fromCity} → {ticket.toCity}
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="grid gap-1">
          <div className="flex items-center text-sm">
            <CalendarIcon className="h-4 w-4 mr-1 text-muted-foreground" />
            <span>{formattedDate}</span>
            {ticket.departureTime && (
              <span className="ml-2">at {ticket.departureTime}</span>
            )}
          </div>
          <p className="text-sm font-medium mt-1">
            {ticket.mode === 'car' 
              ? `${ticket.carModel}${ticket.seatsAvailable ? ` (${ticket.seatsAvailable} seats)` : ''}`
              : ticket.trainOrBusName}
          </p>
          <p className="text-sm mt-1">{ticket.contactInfo}</p>
          {ticket.additionalInfo && (
            <p className="text-sm text-muted-foreground mt-1">{ticket.additionalInfo}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Ticket;
