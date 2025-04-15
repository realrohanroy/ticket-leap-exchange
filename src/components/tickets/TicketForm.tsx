import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { Textarea } from "../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { useAuth } from "../../context/AuthContext";
import { toast } from "sonner";
import { cn } from "../../lib/utils";
import { format } from "date-fns";
import { Calendar } from "../../components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import { CalendarIcon, Bus, RailSymbol } from "lucide-react";
import { supabase } from "../../integrations/supabase/client";
import { AutocompleteInput } from "../../components/ui/autocomplete-input";

interface TicketFormData {
  mode: "rail" | "bus";
  fromCity: string;
  toCity: string;
  travelDate: string;
  departureTime: string;
  ticketType: string;
  trainOrBusName: string;
  contactInfo: string;
  additionalInfo: string;
}

const TicketForm: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Partial<TicketFormData>>({
    mode: "rail",
    ticketType: "Sleeper",
  });
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isSubmitting, setIsSubmitting] = useState(false);

  const ticketTypes = {
    rail: ["Sleeper", "3AC", "2AC", "1AC", "Chair Car", "General"],
    bus: ["Seater", "Semi-Sleeper", "Sleeper", "AC", "Non-AC"],
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCityChange = (field: "fromCity" | "toCity", value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate) {
      setFormData((prev) => ({
        ...prev,
        travelDate: format(selectedDate, "yyyy-MM-dd"),
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
      const { data: sessionData } = await supabase.auth.getSession();

      if (!sessionData.session) {
        toast.error("Authentication session expired. Please log in again.");
        throw new Error("No active session");
      }

      const { data: activeTickets, error: countError } = await supabase
        .from('tickets')
        .select('id')
        .eq('user_id', user.id)
        .eq('status', 'active');
        
      if (countError) throw countError;
      
      if (activeTickets && activeTickets.length >= 2) {
        toast.error("You can only have up to 2 active tickets at a time. Please delete an existing ticket to post a new one.");
        setIsSubmitting(false);
        return;
      }

      const ticketWithDefaults: TicketFormData = {
        mode: formData.mode || "rail",
        fromCity: formData.fromCity || "",
        toCity: formData.toCity || "",
        travelDate: formData.travelDate || format(new Date(), "yyyy-MM-dd"),
        departureTime: formData.departureTime || "",
        ticketType: formData.ticketType || "",
        trainOrBusName: formData.trainOrBusName || "",
        contactInfo: formData.contactInfo || "",
        additionalInfo: formData.additionalInfo || "",
      };

      const ticketData = {
        user_id: user.id,
        mode: ticketWithDefaults.mode,
        from_city: ticketWithDefaults.fromCity,
        to_city: ticketWithDefaults.toCity,
        travel_date: ticketWithDefaults.travelDate,
        departure_time: ticketWithDefaults.departureTime || null,
        ticket_type: ticketWithDefaults.ticketType,
        train_or_bus_name: ticketWithDefaults.trainOrBusName,
        contact_info: ticketWithDefaults.contactInfo,
        view_count: 0,
        status: 'active'
      };

      const { data, error } = await supabase
        .from("tickets")
        .insert(ticketData)
        .select();

      if (error) throw error;

      toast.success("Ticket posted successfully!");
      navigate("/my-tickets");
    } catch (error: any) {
      toast.error(error.message || "Failed to post ticket. Please try again.");
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
            onValueChange={(value) => handleSelectChange("mode", value)}
            className="flex space-x-4 mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="rail" id="rail" />
              <Label
                htmlFor="rail"
                className="cursor-pointer flex items-center"
              >
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
            <AutocompleteInput
              placeholder="e.g. Mumbai"
              value={formData.fromCity || ""}
              onChange={(value) => handleCityChange("fromCity", value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="toCity">To City *</Label>
            <AutocompleteInput
              placeholder="e.g. Delhi"
              value={formData.toCity || ""}
              onChange={(value) => handleCityChange("toCity", value)}
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
                      date ? "bg-white text-black" : "text-muted-foreground",
                      "transition-colors duration-200 ease-in-out"
                    )}
                    aria-label={date ? format(date, "PPP") : "Pick a date"}
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
                  disabled={(date) =>
                    date < new Date(new Date().setHours(0, 0, 0, 0))
                  }
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="departureTime">Departure Time (Optional)</Label>
            <div className="flex items-center gap-2">
              <Input
                id="departureTime"
                name="departureTime"
                type="time"
                value={formData.departureTime || ""}
                onChange={handleChange}
                className="w-full"
                placeholder="HH:MM"
                pattern="[0-9]{2}:[0-9]{2}"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  if (formData.departureTime) {
                    const [hours, minutes] = formData.departureTime.split(":");
                    const newHours =
                      parseInt(hours) >= 12
                        ? (parseInt(hours) - 12).toString().padStart(2, "0")
                        : (parseInt(hours) + 12).toString().padStart(2, "0");
                    setFormData((prev) => ({
                      ...prev,
                      departureTime: `${newHours}:${minutes}`,
                    }));
                  }
                }}
              >
                {formData.departureTime &&
                parseInt(formData.departureTime.split(":")[0]) >= 12
                  ? "PM"
                  : "AM"}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Format: HH:MM (24-hour) or use AM/PM toggle
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="ticketType">Ticket Type *</Label>
            <Select
              value={formData.ticketType}
              onValueChange={(value) => handleSelectChange("ticketType", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select ticket type" />
              </SelectTrigger>
              <SelectContent>
                {formData.mode === "rail"
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
              {formData.mode === "rail"
                ? "Train Name & Number *"
                : "Bus Company Name *"}
            </Label>
            <Input
              id="trainOrBusName"
              name="trainOrBusName"
              placeholder={
                formData.mode === "rail"
                  ? "e.g. Rajdhani Express 12951"
                  : "e.g. KSRTC Airavat"
              }
              required
              value={formData.trainOrBusName || ""}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
          <div className="space-y-2">
            <Label htmlFor="contactInfo">WhatsApp Number (10 digits) *</Label>
            <Input
              id="contactInfo"
              name="contactInfo"
              placeholder="Please enter your WhatsApp number"
              required
              value={formData.contactInfo || ""}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "").slice(0, 10);
                setFormData((prev) => ({ ...prev, contactInfo: value }));
              }}
              pattern="[0-9]{10}"
              minLength={10}
              maxLength={10}
              inputMode="tel"
              style={{ textSizeAdjust: "100%" }}
            />
            <p className="text-xs text-muted-foreground">
              Please enter your 10-digit WhatsApp number
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="additionalInfo">
            Additional Information (Optional)
          </Label>
          <Textarea
            id="additionalInfo"
            name="additionalInfo"
            placeholder="Any other details about the ticket"
            rows={3}
            value={formData.additionalInfo || ""}
            onChange={handleChange}
          />
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Posting..." : "Post Ticket"}
      </Button>
    </form>
  );
};

export default TicketForm;
