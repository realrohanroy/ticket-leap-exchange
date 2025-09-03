import React from 'react';
import { Ticket } from '@/types';
import TicketCard from './TicketCard';

type MemoizedTicketCardProps = {
  ticket: Ticket;
  onDelete?: (ticketId: string) => void;
};

const MemoizedTicketCard: React.FC<MemoizedTicketCardProps> = React.memo(({ ticket, onDelete }) => {
  return <TicketCard ticket={ticket} onDelete={onDelete} />;
}, (prevProps, nextProps) => {
  // Custom comparison function to optimize re-renders
  return (
    prevProps.ticket.id === nextProps.ticket.id &&
    prevProps.ticket.viewCount === nextProps.ticket.viewCount &&
    prevProps.ticket.status === nextProps.ticket.status &&
    prevProps.onDelete === nextProps.onDelete
  );
});

MemoizedTicketCard.displayName = 'MemoizedTicketCard';

export default MemoizedTicketCard;