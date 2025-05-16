
import React from 'react';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
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
  return (
    <div className="space-y-3">
      <div className="w-full">
        <AutocompleteInput
          placeholder="From City"
          value={fromCity}
          onChange={onFromCityChange}
          className="w-full"
        />
      </div>
      
      <div className="w-full">
        <AutocompleteInput
          placeholder="To City"
          value={toCity}
          onChange={onToCityChange}
          className="w-full"
        />
      </div>
      
      <div className="w-full">
        <DatePickerField 
          date={date} 
          onSelect={onDateSelect} 
          side="bottom" 
          sideOffset={8} 
          className="w-full" 
        />
      </div>
      
      <div className="w-full">
        <Button type="submit" className="w-full h-10" onClick={onSubmit}>
          <Search className="mr-2 h-4 w-4" /> Search
        </Button>
      </div>
    </div>
  );
};

export default MobileSearchForm;
