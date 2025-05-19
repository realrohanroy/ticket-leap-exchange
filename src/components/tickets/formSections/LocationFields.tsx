
import React from 'react';
import { Label } from "@/components/ui/label";
import { AutocompleteInput } from "@/components/ui/autocomplete-input";
import { cn } from "@/lib/utils";

interface LocationFieldsProps {
  fromCity: string;
  toCity: string;
  onFromCityChange: (value: string) => void;
  onToCityChange: (value: string) => void;
  formErrors: {[key: string]: boolean};
}

const LocationFields: React.FC<LocationFieldsProps> = ({ 
  fromCity, 
  toCity, 
  onFromCityChange, 
  onToCityChange, 
  formErrors 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="fromCity" className={cn(formErrors.fromCity && "text-destructive")}>From City *</Label>
        <AutocompleteInput
          placeholder="e.g. Mumbai"
          value={fromCity || ""}
          onChange={onFromCityChange}
          className={cn(formErrors.fromCity && "border-destructive")}
        />
        {formErrors.fromCity && <p className="text-xs text-destructive">From City is required</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="toCity" className={cn(formErrors.toCity && "text-destructive")}>To City *</Label>
        <AutocompleteInput
          placeholder="e.g. Delhi"
          value={toCity || ""}
          onChange={onToCityChange}
          className={cn(formErrors.toCity && "border-destructive")}
        />
        {formErrors.toCity && <p className="text-xs text-destructive">To City is required</p>}
      </div>
    </div>
  );
};

export default LocationFields;
