
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format, parseISO } from 'date-fns';
import { Ticket } from '@/types';
import { RailSymbol, Bus, Calendar, Eye } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import AuthModal from '../auth/AuthModal';

type TicketCardProps = {
  ticket: Ticket;
  onDelete?: (ticketId: string) => void;
};

const TicketCard: React.FC<TicketCardProps> = ({ ticket, onDelete }) => {
  const { isAuthenticated } = useAuth();
  const [authModalOpen, setAuthModalOpen] = React.useState(false);
  
  const formattedDate = format(parseISO(ticket.travelDate), 'MMM dd, yyyy');
  const isOwner = onDelete !== undefined;

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <Badge className={ticket.mode === 'rail' ? 'bg-brand-blue' : 'bg-brand-orange'}>
              {ticket.mode === 'rail' ? (
                <RailSymbol className="mr-1 h-4 w-4" />
              ) : (
                <Bus className="mr-1 h-4 w-4" />
              )}
              {ticket.mode === 'rail' ? 'Rail' : 'Bus'}
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
            <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
            <span>{formattedDate}</span>
            {ticket.departureTime && (
              <span className="ml-2">at {ticket.departureTime}</span>
            )}
          </div>
          <p className="text-sm font-medium mt-1">{ticket.trainOrBusName}</p>
          
          {isAuthenticated ? (
            <div className="mt-2 p-2 bg-muted rounded-md">
              <p className="text-sm font-medium">Contact: {ticket.contactInfo}</p>
            </div>
          ) : (
            <div className="mt-2 p-2 bg-muted rounded-md">
              <p className="text-sm text-muted-foreground">
                <Button 
                  variant="link" 
                  className="p-0 h-auto" 
                  onClick={() => setAuthModalOpen(true)}
                >
                  Login/Register
                </Button> to view contact info
              </p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-2 flex justify-between">
        <div className="flex items-center text-xs text-muted-foreground">
          <Eye className="h-3 w-3 mr-1" />
          <span>{ticket.viewCount} views</span>
        </div>
        
        {isOwner && (
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete && onDelete(ticket.id)}
          >
            Delete
          </Button>
        )}
      </CardFooter>
      
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />
    </Card>
  );
};

export default TicketCard;
