import { toast } from 'sonner';
import { ValidationMessages } from './constants';

/**
 * Validates that two cities are different
 */
export const validateDifferentCities = (fromCity: string, toCity: string): boolean => {
  return fromCity !== toCity;
};

/**
 * Shows a toast error for same cities selection
 */
export const showSameCitiesError = () => {
  toast.error(ValidationMessages.SAME_CITIES, {
    description: ValidationMessages.SAME_CITIES_TITLE
  });
};

/**
 * Validates and shows error for same cities if applicable
 * @returns true if validation passes, false if cities are the same
 */
export const validateAndShowCitiesError = (fromCity: string | undefined, toCity: string | undefined): boolean => {
  if (fromCity && toCity && !validateDifferentCities(fromCity, toCity)) {
    showSameCitiesError();
    return false;
  }
  return true;
};

/**
 * Format phone number for display
 */
export const formatPhoneNumber = (countryCode: string, phoneNumber: string): string => {
  return `${countryCode} ${phoneNumber}`;
};

/**
 * Validate phone number format (basic validation)
 */
export const isValidPhoneNumber = (phoneNumber: string): boolean => {
  return /^\d{10,15}$/.test(phoneNumber);
};

/**
 * Format date for display
 */
export const formatDisplayDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

/**
 * Check if date is in the future
 */
export const isFutureDate = (date: string): boolean => {
  const selectedDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return selectedDate >= today;
};