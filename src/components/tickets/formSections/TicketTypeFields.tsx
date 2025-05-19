
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { ticketTypes } from '../utils/ticketTypes';

interface TicketTypeFieldsProps {
  mode: "rail" | "bus" | "car";
  ticketType: string;
  trainOrBusName?: string;
  carModel?: string;
  seatsAvailable?: number;
  onTicketTypeChange: (value: string) => void;
  onTrainBusNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCarModelChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSeatsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formErrors: {[key: string]: boolean};
}

const TicketTypeFields: React.FC<TicketTypeFieldsProps> = ({
  mode,
  ticketType,
  trainOrBusName,
  carModel,
  seatsAvailable,
  onTicketTypeChange,
  onTrainBusNameChange,
  onCarModelChange,
  onSeatsChange,
  formErrors
}) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="ticketType" className={cn(formErrors.ticketType && "text-destructive")}>
            {mode === "car" ? "Car Type *" : "Ticket Type *"}
          </Label>
          <Select
            value={ticketType}
            onValueChange={onTicketTypeChange}
          >
            <SelectTrigger className={cn(formErrors.ticketType && "border-destructive")}>
              <SelectValue placeholder={mode === "car" ? "Select car type" : "Select ticket type"} />
            </SelectTrigger>
            <SelectContent>
              {mode === "rail"
                ? ticketTypes.rail.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))
                : mode === "bus"
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
          {formErrors.ticketType && <p className="text-xs text-destructive">Ticket type is required</p>}
        </div>

        <div className="space-y-2">
          <Label 
            htmlFor={mode === "car" ? "carModel" : "trainOrBusName"}
            className={cn((formErrors.trainOrBusName || formErrors.carModel) && "text-destructive")}
          >
            {mode === "rail"
              ? "Train Name & Number *"
              : mode === "bus"
                ? "Bus Company Name *"
                : "Car Model *"}
          </Label>
          {mode === "car" ? (
            <>
              <Input
                id="carModel"
                name="carModel"
                placeholder="e.g. Honda Civic, Toyota Innova"
                required
                value={carModel || ""}
                onChange={onCarModelChange}
                className={cn(formErrors.carModel && "border-destructive")}
                aria-invalid={formErrors.carModel}
              />
              {formErrors.carModel && <p className="text-xs text-destructive">Car model is required</p>}
            </>
          ) : (
            <>
              <Input
                id="trainOrBusName"
                name="trainOrBusName"
                placeholder={
                  mode === "rail"
                    ? "e.g. Rajdhani Express 12951"
                    : "e.g. KSRTC Airavat"
                }
                required
                value={trainOrBusName || ""}
                onChange={onTrainBusNameChange}
                className={cn(formErrors.trainOrBusName && "border-destructive")}
                aria-invalid={formErrors.trainOrBusName}
              />
              {formErrors.trainOrBusName && <p className="text-xs text-destructive">This field is required</p>}
            </>
          )}
        </div>
      </div>

      {mode === "car" && (
        <div className="space-y-2">
          <Label htmlFor="seatsAvailable" className={cn(formErrors.seatsAvailable && "text-destructive")}>Number of Seats Available *</Label>
          <Input
            id="seatsAvailable"
            name="seatsAvailable"
            type="number"
            placeholder="Enter number of available seats"
            required
            min={1}
            max={8}
            value={seatsAvailable || ""}
            onChange={onSeatsChange}
            className={cn(formErrors.seatsAvailable && "border-destructive")}
            aria-invalid={formErrors.seatsAvailable}
          />
          {formErrors.seatsAvailable && <p className="text-xs text-destructive">Number of seats is required</p>}
        </div>
      )}
    </>
  );
};

export default TicketTypeFields;
