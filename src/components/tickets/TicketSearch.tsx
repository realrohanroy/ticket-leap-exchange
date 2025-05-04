
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Search } from 'lucide-react';
import { SearchFilters } from '@/types';
import { AutocompleteInput } from '@/components/ui/autocomplete-input';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from '@/hooks/use-toast';

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

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
  };
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
          <>
            <div className="w-full">
              <AutocompleteInput
                placeholder="From City"
                value={fromCity}
                onChange={handleFromCityChange}
                className="w-full"
              />
            </div>
            
            <div className="w-full">
              <AutocompleteInput
                placeholder="To City"
                value={toCity}
                onChange={handleToCityChange}
                className="w-full"
              />
            </div>
            
            <div className="w-full">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-medium overflow-hidden",
                      !date ? "text-muted-foreground" : "bg-white text-black"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 flex-shrink-0" />
                    {date ? (
                      <span className="truncate">
                        {format(date, "EEE, MMM d, yyyy")}
                      </span>
                    ) : (
                      <span className="truncate">Select Travel Date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent 
                  className="w-auto p-0 bg-white shadow-lg rounded-lg"
                  align="start"
                  side={isMobile ? "bottom" : "right"}
                  sideOffset={isMobile ? 8 : 12}
                >
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    className="border-0 pointer-events-auto"
                    modifiersClassNames={{
                      selected: "bg-primary text-white",
                      today: "font-bold"
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="w-full">
              <Button type="submit" className="w-full">
                <Search className="mr-2 h-4 w-4" /> Search
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="sm:col-span-2">
              <AutocompleteInput
                placeholder="From City"
                value={fromCity}
                onChange={handleFromCityChange}
                className="w-full"
              />
            </div>
            
            <div className="sm:col-span-2">
              <AutocompleteInput
                placeholder="To City"
                value={toCity}
                onChange={handleToCityChange}
                className="w-full"
              />
            </div>
            
            <div className="sm:col-span-1">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-medium overflow-hidden",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 flex-shrink-0" />
                    {date ? (
                      <span className="truncate">
                        {format(date, "EEE, MMM d, yyyy")}
                      </span>
                    ) : (
                      <span className="truncate">Select Travel Date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent 
                  className="w-auto p-0 bg-white shadow-lg rounded-lg"
                  align="start"
                  side="right"
                  sideOffset={12}
                >
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    className="border-0 pointer-events-auto"
                    modifiersClassNames={{
                      selected: "bg-primary text-white",
                      today: "font-bold"
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="sm:col-span-1">
              <Button type="submit" className="w-full">
                <Search className="mr-2 h-4 w-4" /> Search
              </Button>
            </div>
          </>
        )}
      </div>
    </form>
  );
};

// Helper function that wraps the useNavigate hook in a try-catch
function useNavigateWithFallback() {
  try {
    return useNavigate();
  } catch (e) {
    console.warn("Router context not available. Navigation will be disabled.");
    return undefined;
  }
}

export default TicketSearch;
