
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

// Import refactored components
import TravelModeSelector from "./formSections/TravelModeSelector";
import LocationFields from "./formSections/LocationFields";
import DateTimeFields from "./formSections/DateTimeFields";
import TicketTypeFields from "./formSections/TicketTypeFields";
import ContactFields from "./formSections/ContactFields";
import { validateTicketForm } from "./utils/formValidation";

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
  const [formErrors, setFormErrors] = useState<{[key: string]: boolean}>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: false }));
    }
  };

  const handleNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const numValue = value === "" ? undefined : parseInt(value, 10);
    setFormData((prev) => ({ ...prev, [name]: numValue }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: false }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: false }));
    }
  };

  const handleCityChange = (field: "fromCity" | "toCity", value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: false }));
    }
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate) {
      setFormData((prev) => ({
        ...prev,
        travelDate: format(selectedDate, "yyyy-MM-dd"),
      }));
      if (formErrors.travelDate) {
        setFormErrors(prev => ({ ...prev, travelDate: false }));
      }
    }
  };

  const handleTimeToggle = () => {
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
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("You must be logged in to post a ticket");
      return;
    }

    // Form validation
    const { errors, hasErrors } = validateTicketForm(formData);
    if (hasErrors) {
      setFormErrors(errors);
      toast.error("Please fill in all required fields");
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
        <TravelModeSelector 
          mode={formData.mode as "rail" | "bus" | "car"}
          onModeChange={(mode) => handleSelectChange("mode", mode)}
        />

        <LocationFields
          fromCity={formData.fromCity || ""}
          toCity={formData.toCity || ""}
          onFromCityChange={(value) => handleCityChange("fromCity", value)}
          onToCityChange={(value) => handleCityChange("toCity", value)}
          formErrors={formErrors}
        />

        <DateTimeFields
          date={date}
          departureTime={formData.departureTime}
          onDateSelect={handleDateSelect}
          onTimeChange={handleChange}
          onTimeToggle={handleTimeToggle}
          formErrors={formErrors}
        />

        <TicketTypeFields
          mode={formData.mode as "rail" | "bus" | "car"}
          ticketType={formData.ticketType || ""}
          trainOrBusName={formData.trainOrBusName}
          carModel={formData.carModel}
          seatsAvailable={formData.seatsAvailable}
          onTicketTypeChange={(value) => handleSelectChange("ticketType", value)}
          onTrainBusNameChange={handleChange}
          onCarModelChange={handleChange}
          onSeatsChange={handleNumberChange}
          formErrors={formErrors}
        />

        <ContactFields
          contactInfo={formData.contactInfo || ""}
          countryCode={formData.countryCode || "+91"}
          additionalInfo={formData.additionalInfo}
          onContactInfoChange={(value) => setFormData((prev) => ({ ...prev, contactInfo: value }))}
          onCountryCodeChange={(value) => handleSelectChange("countryCode", value)}
          onAdditionalInfoChange={handleChange}
          formErrors={formErrors}
        />
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Posting..." : "Post Ticket"}
      </Button>
    </form>
  );
};

export default TicketForm;
