
import React, { useState } from 'react';
import { format } from 'date-fns';
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
};

const TicketSearch: React.FC<TicketSearchProps> = ({ 
  onSearch, 
  className,
  navigateOnSearch = false
}) => {
  const navigate = navigateOnSearch ? useNavigateWithFallback() : undefined;
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [date, setDate] = useState<Date | undefined>(undefined);
  const isMobile = useIsMobile();

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
      navigate('/search', { state: { filters } });
    }
  };

  return (
    <form 
      onSubmit={handleSearch}
      className={cn(
        "bg-white rounded-lg shadow-lg p-4 md:p-6",
        className
      )}
    >
      <div className={`${isMobile ? 'space-y-3' : 'grid grid-cols-1 sm:grid-cols-6 gap-4'}`}>
        {isMobile ? (
          <MobileSearchForm 
            fromCity={fromCity}
            toCity={toCity}
            date={date}
            onFromCityChange={handleFromCityChange}
            onToCityChange={handleToCityChange}
            onDateSelect={setDate}
            onSubmit={handleSearch}
          />
        ) : (
          <DesktopSearchForm 
            fromCity={fromCity}
            toCity={toCity}
            date={date}
            onFromCityChange={handleFromCityChange}
            onToCityChange={handleToCityChange}
            onDateSelect={setDate}
            onSubmit={handleSearch}
          />
        )}
      </div>
    </form>
  );
};

export default TicketSearch;
