
import React from 'react';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { AutocompleteInput } from '@/components/ui/autocomplete-input';
import DatePickerField from './DatePickerField';

interface DesktopSearchFormProps {
  fromCity: string;
  toCity: string;
  date: Date | undefined;
  onFromCityChange: (value: string) => void;
  onToCityChange: (value: string) => void;
  onDateSelect: (date: Date | undefined) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const DesktopSearchForm: React.FC<DesktopSearchFormProps> = ({
  fromCity,
  toCity,
  date,
  onFromCityChange,
  onToCityChange,
  onDateSelect,
  onSubmit
}) => {
  return (
    <>
      <div className="sm:col-span-2">
        <AutocompleteInput
          placeholder="From City"
          value={fromCity}
          onChange={onFromCityChange}
          className="w-full"
        />
      </div>
      
      <div className="sm:col-span-2">
        <AutocompleteInput
          placeholder="To City"
          value={toCity}
          onChange={onToCityChange}
          className="w-full"
        />
      </div>
      
      <div className="sm:col-span-1">
        <DatePickerField 
          date={date} 
          onSelect={onDateSelect}
        />
      </div>
      
      <div className="sm:col-span-1">
        <Button type="submit" className="w-full" onClick={onSubmit}>
          <Search className="mr-2 h-4 w-4" /> Search
        </Button>
      </div>
    </>
  );
};

export default DesktopSearchForm;
