
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
import { CalendarIcon, Bus, RailSymbol, Car } from "lucide-react";
import { supabase } from "../../integrations/supabase/client";
import { AutocompleteInput } from "../../components/ui/autocomplete-input";

interface TicketFormData {
  mode: "rail" | "bus" | "car";
  fromCity: string;
  toCity: string;
  travelDate: string;
  departureTime: string;
  ticketType: string;
  trainOrBusName: string;
  contactInfo: string;
  countryCode: string;
  additionalInfo: string;
  carModel?: string;
  seatsAvailable?: number;
}

const TicketForm: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Partial<TicketFormData>>({
    mode: "rail",
    ticketType: "Sleeper",
    countryCode: "+91" // Default to India
  });
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isSubmitting, setIsSubmitting] = useState(false);

  const ticketTypes = {
    rail: ["Sleeper", "3AC", "2AC", "1AC", "Chair Car", "General"],
    bus: ["Seater", "Semi-Sleeper", "Sleeper", "AC", "Non-AC"],
    car: ["Economy", "Sedan", "SUV", "Luxury", "Mini-Van"]
  };

  const countryCodes = [
    { code: "+1", country: "US/Canada" },
    { code: "+44", country: "UK" },
    { code: "+91", country: "India" },
    { code: "+61", country: "Australia" },
    { code: "+65", country: "Singapore" },
    { code: "+971", country: "UAE" },
    { code: "+49", country: "Germany" },
    { code: "+33", country: "France" },
    { code: "+81", country: "Japan" },
    { code: "+86", country: "China" },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const numValue = value === "" ? undefined : parseInt(value, 10);
    setFormData((prev) => ({ ...prev, [name]: numValue }));
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

    // Form validation
    if (!formData.fromCity || !formData.toCity || !formData.travelDate || !formData.contactInfo) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (formData.fromCity === formData.toCity) {
      toast.error("From and To cities cannot be the same");
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

      const fullContactInfo = `${formData.countryCode || "+91"}${formData.contactInfo || ""}`;
      
      const ticketWithDefaults: TicketFormData = {
        mode: formData.mode || "rail",
        fromCity: formData.fromCity || "",
        toCity: formData.toCity || "",
        travelDate: formData.travelDate || format(new Date(), "yyyy-MM-dd"),
        departureTime: formData.departureTime || "",
        ticketType: formData.ticketType || "",
        trainOrBusName: formData.mode === "car" ? formData.carModel || "" : formData.trainOrBusName || "",
        contactInfo: fullContactInfo,
        countryCode: formData.countryCode || "+91",
        additionalInfo: formData.additionalInfo || "",
        carModel: formData.mode === "car" ? formData.carModel : undefined,
        seatsAvailable: formData.mode === "car" ? formData.seatsAvailable : undefined,
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
        status: 'active',
        car_model: ticketWithDefaults.carModel,
        seats_available: ticketWithDefaults.seatsAvailable
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
        <h2 className="text-2xl font-bold">Post Your Seat</h2>
        <p className="text-muted-foreground">
          Fill in the details of the ticket you want to post.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label className="text-lg mb-2 font-medium">Mode of Travel</Label>
          <div className="flex flex-wrap gap-4 mt-3">
            <RadioGroup
              value={formData.mode}
              onValueChange={(value) => handleSelectChange("mode", value)}
              className="flex flex-wrap gap-4"
            >
              <div className="flex-1 min-w-[120px]">
                <div 
                  className={cn(
                    "border rounded-lg p-4 cursor-pointer transition-all flex flex-col items-center justify-center gap-2",
                    formData.mode === "rail" ? "border-primary bg-primary/10" : "hover:bg-accent"
                  )}
                  onClick={() => handleSelectChange("mode", "rail")}
                >
                  <RailSymbol className={cn("h-8 w-8", formData.mode === "rail" ? "text-primary" : "text-muted-foreground")} />
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="rail" id="rail" className="sr-only" />
                    <Label htmlFor="rail" className="font-medium cursor-pointer">Rail</Label>
                  </div>
                </div>
              </div>
              <div className="flex-1 min-w-[120px]">
                <div 
                  className={cn(
                    "border rounded-lg p-4 cursor-pointer transition-all flex flex-col items-center justify-center gap-2",
                    formData.mode === "bus" ? "border-primary bg-primary/10" : "hover:bg-accent"
                  )}
                  onClick={() => handleSelectChange("mode", "bus")}
                >
                  <Bus className={cn("h-8 w-8", formData.mode === "bus" ? "text-primary" : "text-muted-foreground")} />
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="bus" id="bus" className="sr-only" />
                    <Label htmlFor="bus" className="font-medium cursor-pointer">Bus</Label>
                  </div>
                </div>
              </div>
              <div className="flex-1 min-w-[120px]">
                <div 
                  className={cn(
                    "border rounded-lg p-4 cursor-pointer transition-all flex flex-col items-center justify-center gap-2",
                    formData.mode === "car" ? "border-primary bg-primary/10" : "hover:bg-accent"
                  )}
                  onClick={() => handleSelectChange("mode", "car")}
                >
                  <Car className={cn("h-8 w-8", formData.mode === "car" ? "text-primary" : "text-muted-foreground")} />
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="car" id="car" className="sr-only" />
                    <Label htmlFor="car" className="font-medium cursor-pointer">Car Pool</Label>
                  </div>
                </div>
              </div>
            </RadioGroup>
          </div>
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
                  className="pointer-events-auto"
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
            <Label htmlFor="ticketType">
              {formData.mode === "car" ? "Car Type *" : "Ticket Type *"}
            </Label>
            <Select
              value={formData.ticketType}
              onValueChange={(value) => handleSelectChange("ticketType", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder={formData.mode === "car" ? "Select car type" : "Select ticket type"} />
              </SelectTrigger>
              <SelectContent>
                {formData.mode === "rail"
                  ? ticketTypes.rail.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))
                  : formData.mode === "bus"
                    ? ticketTypes.bus.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))
                    : ticketTypes.car.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))
                }
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="trainOrBusName">
              {formData.mode === "rail"
                ? "Train Name & Number *"
                : formData.mode === "bus"
                  ? "Bus Company Name *"
                  : "Car Model *"}
            </Label>
            {formData.mode === "car" ? (
              <Input
                id="carModel"
                name="carModel"
                placeholder="e.g. Honda Civic, Toyota Innova"
                required
                value={formData.carModel || ""}
                onChange={handleChange}
              />
            ) : (
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
            )}
          </div>
        </div>

        {formData.mode === "car" && (
          <div className="space-y-2">
            <Label htmlFor="seatsAvailable">Number of Seats Available *</Label>
            <Input
              id="seatsAvailable"
              name="seatsAvailable"
              type="number"
              placeholder="Enter number of available seats"
              required
              min={1}
              max={8}
              value={formData.seatsAvailable || ""}
              onChange={handleNumberChange}
            />
          </div>
        )}

        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <Label htmlFor="contactInfo">WhatsApp Number *</Label>
            <div className="flex items-center gap-2">
              <Select
                value={formData.countryCode || "+91"}
                onValueChange={(value) => handleSelectChange("countryCode", value)}
              >
                <SelectTrigger className="w-[110px] flex-shrink-0">
                  <SelectValue placeholder="+91" />
                </SelectTrigger>
                <SelectContent>
                  {countryCodes.map((country) => (
                    <SelectItem key={country.code} value={country.code}>
                      {country.code} {country.country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                id="contactInfo"
                name="contactInfo"
                placeholder="WhatsApp number without country code"
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
            </div>
            <p className="text-xs text-muted-foreground">
              Please enter your WhatsApp number
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
