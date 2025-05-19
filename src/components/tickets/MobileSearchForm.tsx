
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
    <div className="space-y-4 w-full">
      <div className="w-full relative">
        <AutocompleteInput
          placeholder="From City"
          value={fromCity}
          onChange={onFromCityChange}
          className="w-full h-12 text-base"
          aria-label="From City"
        />
      </div>
      
      <div className="w-full flex justify-center -my-2 z-10">
        <Button 
          type="button" 
          variant="outline" 
          size="icon" 
          className="h-10 w-10 rounded-full bg-white shadow-md" 
          onClick={handleSwapCities}
          aria-label="Swap cities"
        >
          <ArrowDownUp className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="w-full">
        <AutocompleteInput
          placeholder="To City"
          value={toCity}
          onChange={onToCityChange}
          className="w-full h-12 text-base"
          aria-label="To City"
        />
      </div>
      
      <div className="w-full">
        <DatePickerField 
          date={date} 
          onSelect={onDateSelect} 
          side="bottom" 
          sideOffset={8} 
          className="w-full h-12" 
          aria-label="Select Date"
        />
      </div>
      
      <div className="w-full pt-2">
        <Button 
          type="submit" 
          className="w-full h-12 text-base" 
          onClick={onSubmit} 
          aria-label="Search Tickets"
        >
          <Search className="mr-2 h-5 w-5" /> Search
        </Button>
      </div>
    </div>
  );
};

export default MobileSearchForm;
