
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format, parseISO } from 'date-fns';
import { Ticket } from '@/types';
import { RailSymbol, Bus, Calendar, Eye, Flag, Car } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import AuthModal from '../auth/AuthModal';
import ReportTicketModal from './ReportTicketModal';

type TicketCardProps = {
  ticket: Ticket;
  onDelete?: (ticketId: string) => void;
};

const TicketCard: React.FC<TicketCardProps> = ({ ticket, onDelete }) => {
  const { isAuthenticated } = useAuth();
  const [authModalOpen, setAuthModalOpen] = React.useState(false);
  const [reportModalOpen, setReportModalOpen] = React.useState(false);
  
  const formattedDate = format(parseISO(ticket.travelDate), 'MMM dd, yyyy');
  const isOwner = onDelete !== undefined;

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
            {ticket.status && ticket.status !== 'active' && (
              <Badge variant="destructive" className="ml-2">
                {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
              </Badge>
            )}
          </div>
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
          <p className="text-sm font-medium mt-1">
            {ticket.mode === 'car' ? `${ticket.carModel} (${ticket.seatsAvailable} seats)` : ticket.trainOrBusName}
          </p>
          
          {isAuthenticated ? (
            <div className="mt-2">
              <a 
                href={`https://wa.me/${ticket.contactInfo}?text=${encodeURIComponent(
                  `Hi, I'm interested in your ${ticket.mode} ticket from ${ticket.fromCity} to ${ticket.toCity} on ${formattedDate}. Is it still available?`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-[#25D366] hover:bg-[#128C7E] text-white">
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-6.29-3.61c.173.099.347.148.52.148.173 0 .347-.05.52-.148.297-.149.52-.446.644-.743.124-.297.124-.644-.025-.892-.149-.248-.421-.446-.717-.595-.297-.15-.644-.2-.99-.15-.347.05-.644.248-.842.446-.198.198-.347.545-.297.892.05.347.248.694.545.842h.001zM12 0a12 12 0 00-9.364 19.527L0 24l4.473-2.636A12 12 0 1012 0zm0 21.43a9.43 9.43 0 01-5.11-1.49l-.364-.216-3.75.99 1-3.645-.24-.38a9.43 9.43 0 1114.99-7.69 9.43 9.43 0 01-6.53 12.43z"/>
                  </svg>
                  Message on WhatsApp
                </Button>
              </a>
              
              {!isOwner && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2 text-red-600 border-red-200 hover:bg-red-50"
                  onClick={() => setReportModalOpen(true)}
                >
                  <Flag className="h-4 w-4 mr-1" /> Report Ticket
                </Button>
              )}
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

      <ReportTicketModal 
        isOpen={reportModalOpen} 
        onClose={() => setReportModalOpen(false)} 
        ticketId={ticket.id}
      />
    </Card>
  );
};

export default TicketCard;
