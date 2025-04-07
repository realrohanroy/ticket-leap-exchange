
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
import { CalendarIcon, Bus, RailSymbol } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("You must be logged in to post a ticket");
      return;
    }

    setIsSubmitting(true);

    try {
      // First check if authenticated with Supabase
      const { data: sessionData } = await supabase.auth.getSession();
      console.log('Current Supabase session:', sessionData);
      
      if (!sessionData.session) {
        console.log('No Supabase session found, attempting to sign in with demo account');
        // Sign in with demo account for development purposes
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: 'demo@example.com',
          password: 'password123'
        });
        
        if (signInError) {
          console.error('Failed to sign in with demo account:', signInError);
          throw new Error('Authentication failed. Please try again.');
        }
        
        // Verify we got a session
        const { data: verifySession } = await supabase.auth.getSession();
        console.log('Verified Supabase session after sign-in:', verifySession);
        
        if (!verifySession.session) {
          throw new Error('Failed to establish a Supabase session');
        }
      }
      
      const ticketWithDefaults: TicketFormData = {
        mode: formData.mode || 'rail',
        fromCity: formData.fromCity || '',
        toCity: formData.toCity || '',
        travelDate: formData.travelDate || format(new Date(), 'yyyy-MM-dd'),
        departureTime: formData.departureTime || '',
        ticketType: formData.ticketType || '',
        trainOrBusName: formData.trainOrBusName || '',
        price: formData.price !== undefined ? Number(formData.price) : 0,
        contactInfo: formData.contactInfo || '',
        additionalInfo: formData.additionalInfo || '',
      };
      
      // Convert the form data to match the Supabase schema
      // Use the Supabase session user ID instead of the mock user ID
      const { data: { user: authUser } } = await supabase.auth.getUser();
      
      const ticketData = {
        user_id: authUser?.id || user.id, // Use auth user ID if available
        mode: ticketWithDefaults.mode,
        from_city: ticketWithDefaults.fromCity,
        to_city: ticketWithDefaults.toCity,
        travel_date: ticketWithDefaults.travelDate,
        departure_time: ticketWithDefaults.departureTime || null,
        ticket_type: ticketWithDefaults.ticketType,
        train_or_bus_name: ticketWithDefaults.trainOrBusName,
        price: Number(ticketWithDefaults.price),
        contact_info: ticketWithDefaults.contactInfo,
        view_count: 0
      };

      console.log('User ID:', authUser?.id || user.id);
      console.log('Submitting ticket data:', ticketData);
      
      // Insert ticket into Supabase
      const { data, error } = await supabase
        .from('tickets')
        .insert(ticketData)
        .select();
      
      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      console.log('Ticket posted successfully, response:', data);
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
