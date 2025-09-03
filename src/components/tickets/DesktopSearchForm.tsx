
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
      <div className="sm:col-span-2 space-y-2">
        <AutocompleteInput
          placeholder="Select departure city"
          value={fromCity}
          onChange={onFromCityChange}
          className="w-full"
        />
        {fromCity && (
          <div className="px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-lg">
            <div className="text-xs font-medium text-muted-foreground">From:</div>
            <div className="text-sm font-bold text-primary">{fromCity}</div>
          </div>
        )}
      </div>
      
      <div className="sm:col-span-2 space-y-2">
        <AutocompleteInput
          placeholder="Select destination city"
          value={toCity}
          onChange={onToCityChange}
          className="w-full"
        />
        {toCity && (
          <div className="px-3 py-1.5 bg-secondary/10 border border-secondary/20 rounded-lg">
            <div className="text-xs font-medium text-muted-foreground">To:</div>
            <div className="text-sm font-bold text-secondary-foreground">{toCity}</div>
          </div>
        )}
      </div>
      
      <div className="sm:col-span-1 space-y-2">
        <DatePickerField 
          date={date} 
          onSelect={onDateSelect}
        />
        {date && (
          <div className="px-3 py-1.5 bg-accent/10 border border-accent/20 rounded-lg">
            <div className="text-xs font-medium text-muted-foreground">Date:</div>
            <div className="text-sm font-bold text-accent-foreground">
              {date.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </div>
          </div>
        )}
      </div>
      
      <div className="sm:col-span-1">
        <Button 
          type="submit" 
          className="w-full h-full min-h-[44px] bg-primary hover:bg-primary/90 focus:ring-4 focus:ring-primary/20 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl" 
          onClick={onSubmit}
        >
          <Search className="mr-2 h-5 w-5" /> Search Tickets
        </Button>
      </div>
    </>
  );
};

export default DesktopSearchForm;
