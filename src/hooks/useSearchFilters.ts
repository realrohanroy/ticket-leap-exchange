import { useState, useCallback, useEffect } from 'react';
import { SearchFilters } from '@/types';
import { validateAndShowCitiesError } from '@/lib/validation-utils';

export function useSearchFilters(initialFilters: SearchFilters = {}) {
  const [filters, setFilters] = useState<SearchFilters>(initialFilters);

  // Validate cities whenever filters change
  useEffect(() => {
    if (filters.fromCity && filters.toCity && filters.fromCity === filters.toCity) {
      // Reset toCity to prevent invalid state
      setFilters(prev => ({ ...prev, toCity: '' }));
    }
  }, [filters.fromCity, filters.toCity]);

  const updateFilter = useCallback(<K extends keyof SearchFilters>(
    key: K, 
    value: SearchFilters[K]
  ) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const handleSearch = useCallback((newFilters: SearchFilters) => {
    if (!validateAndShowCitiesError(newFilters.fromCity, newFilters.toCity)) {
      return false;
    }
    
    setFilters(newFilters);
    return true;
  }, []);

  const swapCities = useCallback(() => {
    setFilters(prev => ({
      ...prev,
      fromCity: prev.toCity,
      toCity: prev.fromCity
    }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({});
  }, []);

  return {
    filters,
    updateFilter,
    handleSearch,
    swapCities,
    resetFilters
  };
}