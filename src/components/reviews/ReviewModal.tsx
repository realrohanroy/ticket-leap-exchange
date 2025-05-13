
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Ticket, ReviewFormData } from '@/types';
import { format, parseISO } from 'date-fns';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import ReviewForm from './ReviewForm';
import { useAuth } from '@/context/AuthContext';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticket: Ticket;
}

const ReviewModal: React.FC<ReviewModalProps> = ({ 
  isOpen,
  onClose,
  ticket
}) => {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitReview = async (data: ReviewFormData) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "You need to be logged in to leave a review",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('reviews').insert({
        reviewer_id: user.id,
        reviewed_user_id: data.reviewedUserId,
        ticket_id: data.ticketId,
        rating: data.rating,
        comment: data.comment
      });

      if (error) {
        if (error.code === '23505') {
          toast({
            title: "Review already exists",
            description: "You have already reviewed this user for this ticket",
            variant: "destructive"
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: "Review submitted",
          description: "Thank you for your feedback!"
        });
        onClose();
      }
    } catch (error: any) {
      console.error('Error submitting review:', error);
      toast({
        title: "Failed to submit review",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Format the travel date nicely
  const formattedDate = ticket ? format(parseISO(ticket.travelDate), 'MMMM d, yyyy') : '';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Rate Your Experience</DialogTitle>
          <DialogDescription>
            {`Leave a review for your journey from ${ticket.fromCity} to ${ticket.toCity} on ${formattedDate}`}
          </DialogDescription>
        </DialogHeader>

        <ReviewForm
          ticketId={ticket.id}
          reviewedUserId={ticket.userId}
          onSubmit={handleSubmitReview}
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ReviewModal;
