
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

// Mapbox access token - this is a frontend public token, so it's safe to include in the code
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoibG92YWJsZS1haSIsImEiOiJjbGYzcWt4c2QwYzZtM3FxdXBpNjZwZmR6In0.DXpq_TN0zZPz_lJQftr0Xg';

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
    
    // Filter from popular cities first for immediate feedback
    const filteredPopular = popularCities.filter(city => 
      city.name.toLowerCase().includes(newValue.toLowerCase()) || 
      city.displayName.toLowerCase().includes(newValue.toLowerCase())
    );
    
    setSuggestions(filteredPopular);
    
    // Only trigger API search if we have at least 2 characters
    if (newValue.trim().length >= 2) {
      setLoading(true);
      searchTimeout.current = setTimeout(() => {
        fetchSuggestions(newValue);
      }, 200); // Reduced delay for better responsiveness
    }
  };

  const fetchSuggestions = async (query: string) => {
    try {
      // Use Mapbox Places API
      const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${MAPBOX_ACCESS_TOKEN}&types=place&limit=5&language=en`;
      
      const response = await fetch(endpoint);
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      
      // Process and extract city information from Mapbox response
      if (data.features && Array.isArray(data.features)) {
        const locations: Location[] = data.features.map((feature: any) => {
          // Extract the city name (usually the first part of the place_name)
          const name = feature.text;
          // Use the full place name as display name for context
          const displayName = feature.place_name;
          
          return { name, displayName };
        });
        
        // Combine with popular city matches for better results
        const filteredPopular = popularCities.filter(city => 
          city.name.toLowerCase().includes(query.toLowerCase()) || 
          city.displayName.toLowerCase().includes(query.toLowerCase())
        );
        
        // Remove duplicates when combining results
        const names = new Set(locations.map(loc => loc.name.toLowerCase()));
        const combinedResults = [...locations];
        
        filteredPopular.forEach(city => {
          if (!names.has(city.name.toLowerCase())) {
            names.add(city.name.toLowerCase());
            combinedResults.push(city);
          }
        });
        
        setSuggestions(combinedResults);
      }
    } catch (error) {
      console.error('Error fetching location suggestions:', error);
      setError('Failed to fetch suggestions. Please try again.');
      // Still show popular cities as fallback
      const filteredPopular = popularCities.filter(city => 
        city.name.toLowerCase().includes(query.toLowerCase()) || 
        city.displayName.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filteredPopular);
    } finally {
      setLoading(false);
    }
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
              
              // Filter from popular cities first
              const filteredPopular = popularCities.filter(city => 
                city.name.toLowerCase().includes(value.toLowerCase()) || 
                city.displayName.toLowerCase().includes(value.toLowerCase())
              );
              
              setSuggestions(filteredPopular);
              
              if (value.trim().length >= 2) {
                setLoading(true);
                searchTimeout.current = setTimeout(() => fetchSuggestions(value), 200);
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
