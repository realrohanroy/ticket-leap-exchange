// Common utility types
export type Status = 'active' | 'sold' | 'expired' | 'suspended';
export type TravelMode = 'rail' | 'bus' | 'car';
export type AlertVariant = 'default' | 'destructive' | 'warning';

// Form state types
export interface FormErrors {
  [key: string]: string | boolean;
}

export interface ValidationResult {
  isValid: boolean;
  errors: FormErrors;
}

// API Response types
export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// Component prop types
export interface BaseComponentProps {
  className?: string;
  id?: string;
  'aria-label'?: string;
  'aria-describedby'?: string;
  'aria-invalid'?: boolean;
}

export interface FormFieldProps extends BaseComponentProps {
  label?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
}