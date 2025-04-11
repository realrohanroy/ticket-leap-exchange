
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

type ReportTicketModalProps = {
  isOpen: boolean;
  onClose: () => void;
  ticketId: string;
};

const ReportTicketModal = ({ isOpen, onClose, ticketId }: ReportTicketModalProps) => {
  const { user } = useAuth();
  const [reason, setReason] = useState<string>('fake');
  const [details, setDetails] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!user) {
      toast.error("You must be logged in to report a ticket");
      return;
    }

    setIsSubmitting(true);
    try {
      const reportDetails = `${reason}: ${details}`;
      
      const { error } = await supabase
        .from('tickets')
        .update({
          reported: true,
          report_reason: reportDetails,
          reported_by: user.id,
          report_date: new Date().toISOString()
        })
        .eq('id', ticketId);
      
      if (error) throw error;
      
      toast.success("Thank you for your report. We'll review it shortly.");
      onClose();
    } catch (error: any) {
      toast.error(error.message || "Failed to submit report");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Report Ticket</DialogTitle>
          <DialogDescription>
            Please provide details about why you're reporting this ticket.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Reason for reporting</Label>
            <RadioGroup value={reason} onValueChange={setReason} className="space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="fake" id="fake" />
                <Label htmlFor="fake">Fake or invalid ticket</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="duplicate" id="duplicate" />
                <Label htmlFor="duplicate">Duplicate listing</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="scam" id="scam" />
                <Label htmlFor="scam">Potential scam</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="other" />
                <Label htmlFor="other">Other reason</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="details">Additional details</Label>
            <Textarea 
              id="details"
              placeholder="Please provide more information about the issue"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button 
            onClick={handleSubmit} 
            disabled={isSubmitting || !details.trim()}
          >
            {isSubmitting ? "Submitting..." : "Submit Report"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReportTicketModal;
