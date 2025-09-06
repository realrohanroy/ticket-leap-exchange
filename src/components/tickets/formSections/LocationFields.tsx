
import React from 'react';
import { Label } from "@/components/ui/label";
import { AutocompleteInput } from "@/components/ui/autocomplete-input";
import { SelectedValueDisplay } from "@/components/common/SelectedValueDisplay";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { ArrowRight } from "lucide-react";

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
  const isMobile = useIsMobile();
  
  // Create selected values for display
  const selectedValues = [];
  if (fromCity) {
    selectedValues.push({
      label: `From: ${fromCity}`,
      value: fromCity,
      variant: 'outline' as const,
      onRemove: () => onFromCityChange('')
    });
  }
  if (toCity) {
    selectedValues.push({
      label: `To: ${toCity}`,
      value: toCity,
      variant: 'secondary' as const,
      onRemove: () => onToCityChange('')
    });
  }

  return (
    <div className="space-y-4 form-fade-in">
      {/* Route visualization */}
      {fromCity && toCity && (
        <div className="flex items-center justify-center p-4 bg-muted/30 rounded-lg border border-primary/20">
          <div className="flex items-center gap-3 text-sm font-medium text-primary">
            <span className="bg-primary/10 px-3 py-1 rounded-full">{fromCity}</span>
            <ArrowRight className="h-4 w-4" />
            <span className="bg-accent/80 px-3 py-1 rounded-full">{toCity}</span>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label 
            htmlFor="fromCity" 
            className={cn(
              "text-sm font-medium transition-colors",
              formErrors.fromCity && "text-destructive",
              "after:content-['*'] after:ml-0.5 after:text-destructive"
            )}
          >
            From City
          </Label>
          <AutocompleteInput
            id="fromCity"
            placeholder="e.g. Mumbai"
            value={fromCity}
            onChange={onFromCityChange}
            className={cn(
              "transition-all duration-200 focus-ring",
              formErrors.fromCity && "border-destructive focus-visible:ring-destructive",
              isMobile && "min-h-[48px] text-base"
            )}
            aria-invalid={!!formErrors.fromCity}
            aria-describedby={formErrors.fromCity ? "fromCity-error" : undefined}
          />
          {formErrors.fromCity && (
            <p id="fromCity-error" className="text-xs text-destructive animate-fade-in">
              From City is required
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label 
            htmlFor="toCity" 
            className={cn(
              "text-sm font-medium transition-colors",
              formErrors.toCity && "text-destructive",
              "after:content-['*'] after:ml-0.5 after:text-destructive"
            )}
          >
            To City
          </Label>
          <AutocompleteInput
            id="toCity"
            placeholder="e.g. Delhi"
            value={toCity}
            onChange={onToCityChange}
            className={cn(
              "transition-all duration-200 focus-ring",
              formErrors.toCity && "border-destructive focus-visible:ring-destructive",
              isMobile && "min-h-[48px] text-base"
            )}
            aria-invalid={!!formErrors.toCity}
            aria-describedby={formErrors.toCity ? "toCity-error" : undefined}
          />
          {formErrors.toCity && (
            <p id="toCity-error" className="text-xs text-destructive animate-fade-in">
              To City is required
            </p>
          )}
        </div>
      </div>

      {/* Selected values display */}
      <SelectedValueDisplay 
        values={selectedValues}
        title="Selected Route"
        className="mt-4"
      />
    </div>
  );
};

export default LocationFields;
