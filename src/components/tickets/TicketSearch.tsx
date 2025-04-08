
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Search } from 'lucide-react';
import { SearchFilters } from '@/types';
import { AutocompleteInput } from '@/components/ui/autocomplete-input';

type TicketSearchProps = {
  onSearch: (filters: SearchFilters) => void;
  className?: string;
};

const TicketSearch: React.FC<TicketSearchProps> = ({ onSearch, className }) => {
  const navigate = useNavigate();
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [date, setDate] = useState<Date | undefined>(undefined);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    const filters: SearchFilters = {
      fromCity: fromCity || undefined,
      toCity: toCity || undefined,
      travelDate: date ? format(date, 'yyyy-MM-dd') : undefined,
    };
    
    onSearch(filters);
    navigate('/search', { state: { filters } });
  };

  return (
    <form 
      onSubmit={handleSearch}
      className={cn("bg-white rounded-lg shadow-lg p-6", className)}
    >
      <div className="grid grid-cols-1 sm:grid-cols-6 gap-4">
        <div className="sm:col-span-2">
          <AutocompleteInput
            placeholder="From City"
            value={fromCity}
            onChange={setFromCity}
            className="w-full"
          />
        </div>
        
        <div className="sm:col-span-2">
          <AutocompleteInput
            placeholder="To City"
            value={toCity}
            onChange={setToCity}
            className="w-full"
          />
        </div>
        
        <div className="sm:col-span-1">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "MMM d, yyyy") : <span>Travel Date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="sm:col-span-1">
          <Button type="submit" className="w-full">
            <Search className="mr-2 h-4 w-4" /> Search
          </Button>
        </div>
      </div>
    </form>
  );
};

export default TicketSearch;
