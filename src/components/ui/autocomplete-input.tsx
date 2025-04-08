
import React, { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { MapPin, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Location {
  name: string;
  displayName: string;
}

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
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    setInputValue(value);
  }, [value]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue); // Update parent state immediately with raw input

    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }
    
    // Only trigger the search if we have at least 2 characters
    if (newValue.length >= 2) {
      setLoading(true);
      searchTimeout.current = setTimeout(() => {
        fetchSuggestions(newValue);
      }, 500);
    } else {
      setSuggestions([]);
    }
  };

  const fetchSuggestions = async (query: string) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&city=${encodeURIComponent(query)}&limit=5`,
        { headers: { 'Accept-Language': 'en' } }
      );
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      
      // Process and extract city/state information
      const processedData = data.map((item: any) => {
        // Try to extract meaningful location data
        const address = item.address || {};
        let name = address.city || address.town || address.village || address.state || item.name || '';
        
        // For the display name, include the state/country for better context
        let displayName = name;
        if (address.state && address.state !== name) {
          displayName += `, ${address.state}`;
        }
        if (address.country) {
          displayName += `, ${address.country}`;
        }
        
        return {
          name: name,
          displayName: displayName
        };
      });
      
      // Filter out duplicates based on name
      const uniqueLocations: Location[] = [];
      const names = new Set();
      
      processedData.forEach((location: Location) => {
        if (!names.has(location.name.toLowerCase())) {
          names.add(location.name.toLowerCase());
          uniqueLocations.push(location);
        }
      });
      
      setSuggestions(uniqueLocations);
    } catch (error) {
      console.error('Error fetching location suggestions:', error);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectSuggestion = (location: Location) => {
    setInputValue(location.name);
    onChange(location.name);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="relative w-full">
          <Input
            value={inputValue}
            onChange={handleInputChange}
            placeholder={placeholder}
            className={cn("w-full", className)}
            onFocus={() => setOpen(true)}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <CommandList>
            {loading ? (
              <div className="flex items-center justify-center p-4 text-sm text-muted-foreground">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Searching locations...
              </div>
            ) : (
              <>
                {suggestions.length === 0 ? (
                  <CommandEmpty>
                    {inputValue.length < 2 
                      ? "Type at least 2 characters to search" 
                      : "No locations found"}
                  </CommandEmpty>
                ) : (
                  <CommandGroup heading="Suggestions">
                    {suggestions.map((location, index) => (
                      <CommandItem
                        key={`${location.name}-${index}`}
                        onSelect={() => handleSelectSuggestion(location)}
                        className="flex cursor-pointer items-center py-2"
                      >
                        <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                        <div className="flex flex-col">
                          <span className="text-sm">{location.name}</span>
                          <span className="text-xs text-muted-foreground">
                            {location.displayName !== location.name ? location.displayName : null}
                          </span>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
