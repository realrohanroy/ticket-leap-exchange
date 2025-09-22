
import React, { useState, useEffect } from 'react';
import { format, parse } from 'date-fns';
import { cn } from '@/lib/utils';
import { SearchFilters } from '@/types';
import { toast } from '@/components/ui/use-toast';
import { useNavigateWithFallback } from '@/hooks/use-navigate-with-fallback';
import { AutocompleteInput } from '@/components/ui/autocomplete-input';
import DatePickerField from './DatePickerField';
import { Button } from '@/components/ui/button';

type TicketSearchProps = {
  onSearch: (filters: SearchFilters) => void;
  className?: string;
  navigateOnSearch?: boolean;
  initialFilters?: SearchFilters;
};

const TicketSearch: React.FC<TicketSearchProps> = ({ 
  onSearch, 
  className,
  navigateOnSearch = false,
  initialFilters
}) => {
  const navigate = navigateOnSearch ? useNavigateWithFallback() : undefined;
  const [fromCity, setFromCity] = useState(initialFilters?.fromCity || '');
  const [toCity, setToCity] = useState(initialFilters?.toCity || '');
  const [date, setDate] = useState<Date | undefined>(
    initialFilters?.travelDate 
      ? parse(initialFilters.travelDate, 'yyyy-MM-dd', new Date()) 
      : undefined
  );

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
  };

  // Update state when initialFilters change
  useEffect(() => {
    setFromCity(initialFilters?.fromCity || '');
    setToCity(initialFilters?.toCity || '');
    setDate(initialFilters?.travelDate 
      ? parse(initialFilters.travelDate, 'yyyy-MM-dd', new Date())
      : undefined);
  }, [initialFilters?.fromCity, initialFilters?.toCity, initialFilters?.travelDate]);

  // Update fromCity and prevent same city selection
  const handleFromCityChange = (value: string) => {
    const normalized = (value || '').trim();
    setFromCity(normalized);
    if (normalized && normalized.toLowerCase() === toCity.toLowerCase()) {
      setToCity('');
      toast({
        title: "Same city selected",
        description: "Departure and destination cities cannot be the same",
        variant: "destructive"
      });
    }
  };

  // Update toCity and prevent same city selection
  const handleToCityChange = (value: string) => {
    const normalized = (value || '').trim();
    if (normalized && normalized.toLowerCase() === fromCity.toLowerCase()) {
      toast({
        title: "Same city selected",
        description: "Departure and destination cities cannot be the same",
        variant: "destructive"
      });
      return;
    }
    setToCity(normalized);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prevent search with same cities
    if (fromCity && toCity && fromCity.toLowerCase() === toCity.toLowerCase()) {
      toast({
        title: "Invalid search",
        description: "Departure and destination cities cannot be the same",
        variant: "destructive"
      });
      return;
    }
    
    const filters: SearchFilters = {
      fromCity: fromCity || undefined,
      toCity: toCity || undefined,
      travelDate: date ? format(date, 'yyyy-MM-dd') : undefined,
    };
    
    onSearch(filters);
    
    if (navigateOnSearch && navigate) {
      // Convert filters to search params
      const params = new URLSearchParams();
      if (filters.fromCity) params.set('from', filters.fromCity);
      if (filters.toCity) params.set('to', filters.toCity);
      if (filters.travelDate) params.set('date', filters.travelDate);
      
      // Use replace instead of push to avoid navigation issues
      navigate(`/search?${params.toString()}`, { 
        state: { filters },
        replace: true 
      });
    }
  };

  return (
    <div className="w-full">
      <form 
        onSubmit={handleSearch}
        className={cn(
          "bg-white rounded-lg shadow-lg p-3 md:p-6 w-full",
          className
        )}
      >
        <div className={"grid grid-cols-1 sm:grid-cols-6 gap-4 w-full"}>
          <div className="sm:col-span-2">
            <AutocompleteInput
              placeholder="From City"
              value={fromCity}
              onChange={handleFromCityChange}
              className="w-full"
              aria-label="From City"
            />
          </div>

          <div className="sm:col-span-2">
            <AutocompleteInput
              placeholder="To City"
              value={toCity}
              onChange={handleToCityChange}
              className="w-full"
              aria-label="To City"
            />
          </div>

          <div className="sm:col-span-1">
            <DatePickerField 
              date={date} 
              onSelect={handleDateSelect}
            />
          </div>

          <div className="sm:col-span-1">
            <Button type="submit" className="w-full">
              Search
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TicketSearch;
