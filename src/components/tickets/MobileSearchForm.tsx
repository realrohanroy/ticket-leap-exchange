
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
    <div className="space-y-6 w-full">
      {/* From City */}
      <div className="w-full relative">
        <label htmlFor="fromCity" className="block text-sm font-semibold text-gray-700 mb-2 px-1">
          From City
        </label>
        <AutocompleteInput
          placeholder="From City"
          value={fromCity}
          onChange={onFromCityChange}
          className="w-full"
          aria-label="From City"
        />
      </div>
      
      {/* Swap Button */}
      <div className="w-full flex justify-center -my-3 z-10 relative">
        <Button 
          type="button" 
          variant="outline" 
          size="icon" 
          className="h-12 w-12 rounded-full bg-white shadow-lg border-2 touch-manipulation hover:bg-accent hover:text-accent-foreground transition-all duration-200 focus:ring-2 focus:ring-ring focus:ring-offset-2" 
          onClick={handleSwapCities}
          aria-label="Swap departure and destination cities"
          style={{ WebkitTapHighlightColor: 'transparent' }}
        >
          <ArrowDownUp className="h-6 w-6 text-black" />
        </Button>
      </div>
      
      {/* To City */}
      <div className="w-full">
        <label htmlFor="toCity" className="block text-sm font-semibold text-gray-700 mb-2 px-1">
          To City
        </label>
        <AutocompleteInput
          placeholder="To City"
          value={toCity}
          onChange={onToCityChange}
          className="w-full"
          aria-label="To City"
        />
      </div>
      
      {/* Date Picker */}
      <div className="w-full">
        <label htmlFor="travelDate" className="block text-sm font-semibold text-gray-700 mb-2 px-1">
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
      </div>
      
      {/* Search Button */}
      <div className="w-full pt-4">
        <Button 
          type="submit" 
          className="w-full h-14 text-lg font-semibold touch-manipulation bg-primary hover:bg-primary/90 focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all duration-200 rounded-xl shadow-lg" 
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
