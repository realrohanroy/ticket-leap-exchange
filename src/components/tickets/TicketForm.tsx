
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import { TicketFormData } from '@/types';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';

const TicketForm: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Partial<TicketFormData>>({
    mode: 'rail',
    ticketType: 'Sleeper',
  });
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isSubmitting, setIsSubmitting] = useState(false);

  const ticketTypes = {
    rail: ['Sleeper', '3AC', '2AC', '1AC', 'Chair Car', 'General'],
    bus: ['Seater', 'Semi-Sleeper', 'Sleeper', 'AC', 'Non-AC'],
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate) {
      setFormData((prev) => ({
        ...prev,
        travelDate: format(selectedDate, 'yyyy-MM-dd'),
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("You must be logged in to post a ticket");
      return;
    }

    setIsSubmitting(true);

    try {
      // In a real app, this would call an API to save the ticket
      const ticketWithDefaults: TicketFormData = {
        mode: formData.mode || 'rail',
        fromCity: formData.fromCity || '',
        toCity: formData.toCity || '',
        travelDate: formData.travelDate || '',
        departureTime: formData.departureTime || '',
        ticketType: formData.ticketType || '',
        trainOrBusName: formData.trainOrBusName || '',
        price: formData.price !== undefined ? formData.price : 0,
        contactInfo: formData.contactInfo || '',
      };
      
      // Store in localStorage for demo purposes
      const storedTickets = JSON.parse(localStorage.getItem('tickets') || '[]');
      const newTicket = {
        ...ticketWithDefaults,
        id: `ticket-${Date.now()}`,
        userId: user.id,
        viewCount: 0,
        createdAt: new Date().toISOString(),
      };
      
      localStorage.setItem('tickets', JSON.stringify([...storedTickets, newTicket]));
      
      toast.success("Ticket posted successfully!");
      navigate('/my-tickets');
    } catch (error) {
      console.error('Failed to post ticket:', error);
      toast.error("Failed to post ticket. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Post Your Ticket</h2>
        <p className="text-muted-foreground">
          Fill in the details of the ticket you want to post.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Mode of Travel</Label>
          <RadioGroup
            value={formData.mode}
            onValueChange={(value) => handleSelectChange('mode', value)}
            className="flex space-x-4 mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="rail" id="rail" />
              <Label htmlFor="rail" className="cursor-pointer flex items-center">
                <RailSymbol className="mr-1 h-4 w-4" /> Rail
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="bus" id="bus" />
              <Label htmlFor="bus" className="cursor-pointer flex items-center">
                <Bus className="mr-1 h-4 w-4" /> Bus
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="fromCity">From City *</Label>
            <Input
              id="fromCity"
              name="fromCity"
              placeholder="e.g. Mumbai"
              required
              value={formData.fromCity || ''}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="toCity">To City *</Label>
            <Input
              id="toCity"
              name="toCity"
              placeholder="e.g. Delhi"
              required
              value={formData.toCity || ''}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="travelDate">Travel Date *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={handleDateSelect}
                  initialFocus
                  disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="departureTime">Departure Time (Optional)</Label>
            <Input
              id="departureTime"
              name="departureTime"
              type="time"
              value={formData.departureTime || ''}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="ticketType">Ticket Type *</Label>
            <Select
              value={formData.ticketType}
              onValueChange={(value) => handleSelectChange('ticketType', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select ticket type" />
              </SelectTrigger>
              <SelectContent>
                {formData.mode === 'rail'
                  ? ticketTypes.rail.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))
                  : ticketTypes.bus.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="trainOrBusName">
              {formData.mode === 'rail' ? 'Train Name & Number *' : 'Bus Company Name *'}
            </Label>
            <Input
              id="trainOrBusName"
              name="trainOrBusName"
              placeholder={formData.mode === 'rail' ? 'e.g. Rajdhani Express 12951' : 'e.g. KSRTC Airavat'}
              required
              value={formData.trainOrBusName || ''}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="price">Asking Price (₹) *</Label>
            <Input
              id="price"
              name="price"
              placeholder="e.g. 1200 or 0 for free"
              type="number"
              min="0"
              required
              value={formData.price !== undefined ? formData.price : ''}
              onChange={(e) => handleSelectChange('price', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contactInfo">Contact Information *</Label>
            <Input
              id="contactInfo"
              name="contactInfo"
              placeholder="e.g. Phone or WhatsApp number"
              required
              value={formData.contactInfo || ''}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="additionalInfo">Additional Information (Optional)</Label>
          <Textarea
            id="additionalInfo"
            name="additionalInfo"
            placeholder="Any other details about the ticket"
            rows={3}
            value={formData.additionalInfo || ''}
            onChange={handleChange}
          />
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Posting...' : 'Post Ticket'}
      </Button>
    </form>
  );
};

export default TicketForm;
