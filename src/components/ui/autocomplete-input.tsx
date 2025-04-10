
import React, { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { MapPin, Loader2, Search, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Location {
  name: string;
  displayName: string;
}

// Pre-populated list of popular cities for faster suggestions
const popularCities: Location[] = [
  { name: 'Mumbai', displayName: 'Mumbai, Maharashtra, India' },
  { name: 'Delhi', displayName: 'Delhi, India' },
  { name: 'Bangalore', displayName: 'Bangalore, Karnataka, India' },
  { name: 'Chennai', displayName: 'Chennai, Tamil Nadu, India' },
  { name: 'Kolkata', displayName: 'Kolkata, West Bengal, India' },
  { name: 'Hyderabad', displayName: 'Hyderabad, Telangana, India' },
  { name: 'Ahmedabad', displayName: 'Ahmedabad, Gujarat, India' },
  { name: 'Pune', displayName: 'Pune, Maharashtra, India' },
  { name: 'Jaipur', displayName: 'Jaipur, Rajasthan, India' },
  { name: 'Lucknow', displayName: 'Lucknow, Uttar Pradesh, India' },
  { name: 'Kanpur', displayName: 'Kanpur, Uttar Pradesh, India' },
  { name: 'Nagpur', displayName: 'Nagpur, Maharashtra, India' },
  { name: 'Indore', displayName: 'Indore, Madhya Pradesh, India' },
  { name: 'Thane', displayName: 'Thane, Maharashtra, India' },
  { name: 'Bhopal', displayName: 'Bhopal, Madhya Pradesh, India' },
];

// For security, we'll only use popular cities and not rely on the API
// until a proper token is set up
const USE_LOCAL_DATA_ONLY = true;

interface AutocompleteInputProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const AutocompleteInput: React.FC<AutocompleteInputProps> = ({
  placeholder = "Search location...",
  value,
  onChange,
  className
}) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value || '');
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<Location[]>([]);
  const [error, setError] = useState<string | null>(null);
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    setInputValue(value);
  }, [value]);
  
  // Show popular cities when input is focused but empty
  useEffect(() => {
    if (open && inputValue.trim().length === 0) {
      setSuggestions(popularCities);
      setLoading(false);
      setError(null);
    }
  }, [open, inputValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue); // Update parent state immediately with raw input
    setError(null);

    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }
    
    if (newValue.trim().length === 0) {
      setSuggestions(popularCities);
      setLoading(false);
      return;
    }
    
    // Filter from popular cities for immediate feedback
    const filteredPopular = popularCities.filter(city => 
      city.name.toLowerCase().includes(newValue.toLowerCase()) || 
      city.displayName.toLowerCase().includes(newValue.toLowerCase())
    );
    
    setSuggestions(filteredPopular);
    
    // Since the Mapbox API token is not valid, we'll only use local data
    if (!USE_LOCAL_DATA_ONLY && newValue.trim().length >= 2) {
      setLoading(true);
      searchTimeout.current = setTimeout(() => {
        fetchSuggestions(newValue);
      }, 150);
    }
  };

  const fetchSuggestions = async (query: string) => {
    // This function is not used until a valid API token is provided
    setLoading(false);
  };

  const handleSelectSuggestion = (location: Location) => {
    setInputValue(location.name);
    onChange(location.name);
    setOpen(false);
  };

  const handleClear = () => {
    setInputValue('');
    onChange('');
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="relative w-full">
          <Input
            value={inputValue}
            onChange={handleInputChange}
            placeholder={placeholder}
            className={cn("w-full pr-8", className)} 
            onFocus={() => setOpen(true)}
          />
          {inputValue && (
            <button 
              type="button"
              onClick={handleClear}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              <XCircle className="h-4 w-4" />
            </button>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" align="start" side="bottom">
        <Command className="rounded-lg border shadow-md">
          <CommandInput 
            placeholder="Search city..." 
            value={inputValue}
            onValueChange={(value) => {
              setInputValue(value);
              onChange(value);
              
              if (value.trim().length === 0) {
                setSuggestions(popularCities);
                setError(null);
                setLoading(false);
                return;
              }

              if (searchTimeout.current) {
                clearTimeout(searchTimeout.current);
              }
              
              // Filter from popular cities
              const filteredPopular = popularCities.filter(city => 
                city.name.toLowerCase().includes(value.toLowerCase()) || 
                city.displayName.toLowerCase().includes(value.toLowerCase())
              );
              
              setSuggestions(filteredPopular);
              
              // Since the Mapbox API token is not valid, we'll only use local data
              if (!USE_LOCAL_DATA_ONLY && value.trim().length >= 2) {
                setLoading(true);
                searchTimeout.current = setTimeout(() => fetchSuggestions(value), 150);
              }
            }} 
          />
          <CommandList>
            {loading && (
              <div className="flex items-center justify-center p-4 text-sm text-muted-foreground">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Searching cities...
              </div>
            )}
            
            {error && (
              <div className="flex items-center justify-center p-4 text-sm text-destructive">
                <XCircle className="mr-2 h-4 w-4" />
                {error}
              </div>
            )}
            
            {!loading && !error && suggestions.length === 0 && (
              <CommandEmpty>
                {inputValue.trim().length < 2 
                  ? <div className="flex items-center p-2 text-sm">
                      <Search className="mr-2 h-4 w-4 text-muted-foreground" />
                      Type at least 2 characters to search
                    </div>
                  : <div className="flex items-center p-2 text-sm">
                      <XCircle className="mr-2 h-4 w-4 text-muted-foreground" />
                      No cities found
                    </div>
                }
              </CommandEmpty>
            )}
            
            {!loading && suggestions.length > 0 && (
              <CommandGroup heading="Suggestions">
                {suggestions.map((location, index) => (
                  <CommandItem
                    key={`${location.name}-${index}`}
                    onSelect={() => handleSelectSuggestion(location)}
                    className="flex cursor-pointer items-center py-2"
                  >
                    <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{location.name}</span>
                      {location.displayName !== location.name && (
                        <span className="text-xs text-muted-foreground">
                          {location.displayName}
                        </span>
                      )}
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
