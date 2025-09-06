
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";

// Import refactored components
import TravelModeSelector from "./formSections/TravelModeSelector";
import LocationFields from "./formSections/LocationFields";
import DateTimeFields from "./formSections/DateTimeFields";
import TicketTypeFields from "./formSections/TicketTypeFields";
import ContactFields from "./formSections/ContactFields";

// Import new validation and error handling
import { useFormValidation } from "@/hooks/useFormValidation";
import { useAsyncOperation } from "@/hooks/useAsyncOperation";
import { ticketFormSchema, type TicketFormData } from "@/schemas/ticketSchema";
import { LoadingButton } from "@/components/common/LoadingButton";
import { ErrorAlert } from "@/components/common/ErrorAlert";

// Use schema type instead of duplicate interface

const TicketForm: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const initialValues: TicketFormData = {
    mode: "rail",
    fromCity: "",
    toCity: "",
    travelDate: format(new Date(), "yyyy-MM-dd"),
    departureTime: "",
    ticketType: "Sleeper",
    trainOrBusName: "",
    contactInfo: "",
    countryCode: "+91",
    additionalInfo: "",
    carModel: "",
    seatsAvailable: 1
  };
  
  const [formData, setFormData] = useState<TicketFormData>(initialValues);
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  const {
    errors,
    hasErrors,
    validateForm,
    validateField,
    clearFieldError,
    setFieldError
  } = useFormValidation(ticketFormSchema, initialValues);
  
  const {
    execute: submitForm,
    isLoading: isSubmitting,
    error: submitError,
    reset: resetSubmitError
  } = useAsyncOperation({
    showSuccessToast: true,
    showErrorToast: true,
    successMessage: "Ticket posted successfully!",
    onSuccess: () => navigate("/my-tickets")
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      clearFieldError(name as keyof TicketFormData);
    }
  };

  const handleNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const numValue = value === "" ? 1 : parseInt(value, 10);
    setFormData((prev) => ({ ...prev, [name]: numValue }));
    if (errors[name]) {
      clearFieldError(name as keyof TicketFormData);
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      clearFieldError(name as keyof TicketFormData);
    }
  };

  const handleCityChange = (field: "fromCity" | "toCity", value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      clearFieldError(field);
    }
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate) {
      setFormData((prev) => ({
        ...prev,
        travelDate: format(selectedDate, "yyyy-MM-dd"),
      }));
      if (errors.travelDate) {
        clearFieldError('travelDate');
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
    resetSubmitError();
    
    if (!user) {
      setFieldError('contactInfo', 'You must be logged in to post a ticket');
      return;
    }

    // Form validation
    const isValid = await validateForm(formData);
    if (!isValid) {
      return;
    }

    await submitForm(async () => {
      const { data: sessionData } = await supabase.auth.getSession();

      if (!sessionData.session) {
        throw new Error("Authentication session expired. Please log in again.");
      }

      const { data: activeTickets, error: countError } = await supabase
        .from('tickets')
        .select('id')
        .eq('user_id', user.id)
        .eq('status', 'active');
        
      if (countError) throw countError;
      
      if (activeTickets && activeTickets.length >= 2) {
        throw new Error("You can only have up to 2 active tickets at a time. Please delete an existing ticket to post a new one.");
      }

      const fullContactInfo = `${formData.countryCode}${formData.contactInfo}`;
      
      const ticketData = {
        user_id: user.id,
        mode: formData.mode,
        from_city: formData.fromCity,
        to_city: formData.toCity,
        travel_date: formData.travelDate,
        departure_time: formData.departureTime || null,
        ticket_type: formData.ticketType,
        train_or_bus_name: formData.mode === "car" ? formData.carModel : formData.trainOrBusName,
        contact_info: fullContactInfo,
        view_count: 0,
        status: 'active',
        car_model: formData.mode === "car" ? formData.carModel : null,
        seats_available: formData.mode === "car" ? formData.seatsAvailable : null
      };

      const { data, error } = await supabase
        .from("tickets")
        .insert(ticketData)
        .select();

      if (error) throw error;
      return data;
    });
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
          fromCity={formData.fromCity}
          toCity={formData.toCity}
          onFromCityChange={(value) => handleCityChange("fromCity", value)}
          onToCityChange={(value) => handleCityChange("toCity", value)}
          formErrors={{ fromCity: !!errors.fromCity, toCity: !!errors.toCity }}
        />

        <DateTimeFields
          date={date}
          departureTime={formData.departureTime}
          onDateSelect={handleDateSelect}
          onTimeChange={handleChange}
          onTimeToggle={handleTimeToggle}
          formErrors={{ travelDate: !!errors.travelDate }}
        />

        <TicketTypeFields
          mode={formData.mode}
          ticketType={formData.ticketType}
          trainOrBusName={formData.trainOrBusName}
          carModel={formData.carModel}
          seatsAvailable={formData.seatsAvailable}
          onTicketTypeChange={(value) => handleSelectChange("ticketType", value)}
          onTrainBusNameChange={handleChange}
          onCarModelChange={handleChange}
          onSeatsChange={handleNumberChange}
          formErrors={{ 
            ticketType: !!errors.ticketType,
            trainOrBusName: !!errors.trainOrBusName,
            carModel: !!errors.carModel,
            seatsAvailable: !!errors.seatsAvailable
          }}
        />

        <ContactFields
          contactInfo={formData.contactInfo}
          countryCode={formData.countryCode}
          additionalInfo={formData.additionalInfo}
          onContactInfoChange={(value) => setFormData((prev) => ({ ...prev, contactInfo: value }))}
          onCountryCodeChange={(value) => handleSelectChange("countryCode", value)}
          onAdditionalInfoChange={handleChange}
          formErrors={{ contactInfo: !!errors.contactInfo }}
        />
      </div>

      {submitError && (
        <ErrorAlert 
          message={submitError}
          onRetry={() => handleSubmit({ preventDefault: () => {} } as React.FormEvent)}
          onDismiss={resetSubmitError}
        />
      )}

      <LoadingButton 
        type="submit" 
        className="w-full" 
        isLoading={isSubmitting}
        loadingText="Posting..."
        disabled={hasErrors}
      >
        Post Ticket
      </LoadingButton>
    </form>
  );
};

export default TicketForm;
