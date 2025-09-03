
import React from 'react';
import { Button } from '@/components/ui/button';
import { Search, ArrowDownUp } from 'lucide-react';
import { AutocompleteInput } from '@/components/ui/autocomplete-input';
import DatePickerField from './DatePickerField';

interface MobileSearchFormProps {
  fromCity: string;
  toCity: string;
  date: Date | undefined;
  onFromCityChange: (value: string) => void;
  onToCityChange: (value: string) => void;
  onDateSelect: (date: Date | undefined) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const MobileSearchForm: React.FC<MobileSearchFormProps> = ({
  fromCity,
  toCity,
  date,
  onFromCityChange,
  onToCityChange,
  onDateSelect,
  onSubmit
}) => {
  const handleSwapCities = () => {
    const tempFromCity = fromCity;
    onFromCityChange(toCity);
    onToCityChange(tempFromCity);
  };

  return (
    <div className="space-y-5 w-full">
      {/* From City */}
      <div className="w-full relative">
        <label htmlFor="fromCity" className="block text-sm font-bold text-foreground mb-3 px-1">
          From City
        </label>
        <AutocompleteInput
          placeholder="Select departure city"
          value={fromCity}
          onChange={onFromCityChange}
          className="w-full"
          aria-label="From City"
        />
        {fromCity && (
          <div className="mt-2 px-3 py-2 bg-primary/10 border border-primary/20 rounded-lg">
            <div className="text-xs font-medium text-muted-foreground">Departure from:</div>
            <div className="text-base font-bold text-primary">{fromCity}</div>
          </div>
        )}
      </div>
      
      {/* Swap Button */}
      <div className="w-full flex justify-center -my-2 z-20 relative">
        <Button 
          type="button" 
          variant="outline" 
          size="icon" 
          className="h-14 w-14 rounded-full bg-background shadow-xl border-2 border-primary/20 touch-manipulation hover:bg-primary hover:text-primary-foreground transition-all duration-300 focus:ring-4 focus:ring-primary/20 focus:ring-offset-2" 
          onClick={handleSwapCities}
          aria-label="Swap departure and destination cities"
          style={{ WebkitTapHighlightColor: 'transparent' }}
        >
          <ArrowDownUp className="h-7 w-7" />
        </Button>
      </div>
      
      {/* To City */}
      <div className="w-full">
        <label htmlFor="toCity" className="block text-sm font-bold text-foreground mb-3 px-1">
          To City
        </label>
        <AutocompleteInput
          placeholder="Select destination city"
          value={toCity}
          onChange={onToCityChange}
          className="w-full"
          aria-label="To City"
        />
        {toCity && (
          <div className="mt-2 px-3 py-2 bg-secondary/10 border border-secondary/20 rounded-lg">
            <div className="text-xs font-medium text-muted-foreground">Destination to:</div>
            <div className="text-base font-bold text-secondary-foreground">{toCity}</div>
          </div>
        )}
      </div>
      
      {/* Date Picker */}
      <div className="w-full">
        <label htmlFor="travelDate" className="block text-sm font-bold text-foreground mb-3 px-1">
          Travel Date
        </label>
        <DatePickerField 
          date={date} 
          onSelect={onDateSelect} 
          side="bottom" 
          sideOffset={8} 
          className="w-full" 
          aria-label="Select Travel Date"
        />
        {date && (
          <div className="mt-2 px-3 py-2 bg-accent/10 border border-accent/20 rounded-lg">
            <div className="text-xs font-medium text-muted-foreground">Travel date:</div>
            <div className="text-base font-bold text-accent-foreground">
              {date.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </div>
        )}
      </div>
      
      {/* Search Button */}
      <div className="w-full pt-6">
        <Button 
          type="submit" 
          className="w-full h-16 text-lg font-bold touch-manipulation bg-primary hover:bg-primary/90 focus:ring-4 focus:ring-primary/20 focus:ring-offset-2 transition-all duration-300 rounded-2xl shadow-xl hover:shadow-2xl" 
          onClick={onSubmit} 
          aria-label="Search Available Seats"
          style={{ WebkitTapHighlightColor: 'transparent' }}
        >
          <Search className="mr-3 h-6 w-6" /> 
          Search Available Seats
        </Button>
      </div>
    </div>
  );
};

export default MobileSearchForm;
