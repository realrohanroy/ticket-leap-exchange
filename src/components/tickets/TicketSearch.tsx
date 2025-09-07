
import React, { useState, useEffect } from 'react';
import { format, parse } from 'date-fns';
import { cn } from '@/lib/utils';
import { SearchFilters } from '@/types';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from '@/components/ui/use-toast';
import MobileSearchForm from './MobileSearchForm';
import DesktopSearchForm from './DesktopSearchForm';
import { useNavigateWithFallback } from '@/hooks/use-navigate-with-fallback';

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
  initialFilters = {}
}) => {
  const navigate = navigateOnSearch ? useNavigateWithFallback() : undefined;
  const [fromCity, setFromCity] = useState(initialFilters.fromCity || '');
  const [toCity, setToCity] = useState(initialFilters.toCity || '');
  const [date, setDate] = useState<Date | undefined>(
    initialFilters.travelDate 
      ? parse(initialFilters.travelDate, 'yyyy-MM-dd', new Date()) 
      : undefined
  );

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
  };
  const isMobile = useIsMobile();

  // Update state when initialFilters change
  useEffect(() => {
    setFromCity(initialFilters.fromCity || '');
    setToCity(initialFilters.toCity || '');
    setDate(initialFilters.travelDate 
      ? parse(initialFilters.travelDate, 'yyyy-MM-dd', new Date())
      : undefined);
  }, [initialFilters]);

  // Update fromCity and prevent same city selection
  const handleFromCityChange = (value: string) => {
    setFromCity(value);
    if (value && value === toCity) {
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
    if (value && value === fromCity) {
      toast({
        title: "Same city selected",
        description: "Departure and destination cities cannot be the same",
        variant: "destructive"
      });
      return;
    }
    setToCity(value);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prevent search with same cities
    if (fromCity && toCity && fromCity === toCity) {
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
        <div className={`${isMobile ? 'space-y-3' : 'grid grid-cols-1 sm:grid-cols-6 gap-4'} w-full`}>
          {isMobile ? (
            <MobileSearchForm 
              fromCity={fromCity}
              toCity={toCity}
              date={date}
              onFromCityChange={handleFromCityChange}
              onToCityChange={handleToCityChange}
              onDateSelect={handleDateSelect}
              onSubmit={handleSearch}
            />
          ) : (
            <DesktopSearchForm 
              fromCity={fromCity}
              toCity={toCity}
              date={date}
              onFromCityChange={handleFromCityChange}
              onToCityChange={handleToCityChange}
              onDateSelect={handleDateSelect}
              onSubmit={handleSearch}
            />
          )}
        </div>
      </form>
    </div>
  );
};

export default TicketSearch;
