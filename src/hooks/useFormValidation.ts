import { useState, useCallback } from 'react';
import { z } from 'zod';

export interface ValidationError {
  field: string;
  message: string;
}

export interface FormValidationReturn<T> {
  values: T;
  errors: Record<string, string>;
  hasErrors: boolean;
  isValidating: boolean;
  validateField: (field: keyof T, value: any) => Promise<boolean>;
  validateForm: (data: T) => Promise<boolean>;
  clearFieldError: (field: keyof T) => void;
  clearAllErrors: () => void;
  setFieldError: (field: keyof T, message: string) => void;
}

export function useFormValidation<T extends Record<string, any>>(
  schema: z.ZodSchema<T>,
  initialValues: T
): FormValidationReturn<T> {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isValidating, setIsValidating] = useState(false);

  const validateField = useCallback(async (field: keyof T, value: any): Promise<boolean> => {
    try {
      setIsValidating(true);
      
      // Validate single field by creating partial data object
      const partialData = { [field]: value } as Partial<T>;
      await schema.parseAsync({ ...initialValues, ...partialData });
      
      // Clear error if validation passes
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field as string];
        return newErrors;
      });
      
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldError = error.errors.find(err => err.path[0] === field);
        if (fieldError) {
          setErrors(prev => ({
            ...prev,
            [field as string]: fieldError.message
          }));
        }
      }
      return false;
    } finally {
      setIsValidating(false);
    }
  }, [schema]);

  const validateForm = useCallback(async (data: T): Promise<boolean> => {
    try {
      setIsValidating(true);
      await schema.parseAsync(data);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach(err => {
          if (err.path.length > 0) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    } finally {
      setIsValidating(false);
    }
  }, [schema]);

  const clearFieldError = useCallback((field: keyof T) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field as string];
      return newErrors;
    });
  }, []);

  const clearAllErrors = useCallback(() => {
    setErrors({});
  }, []);

  const setFieldError = useCallback((field: keyof T, message: string) => {
    setErrors(prev => ({
      ...prev,
      [field as string]: message
    }));
  }, []);

  const hasErrors = Object.keys(errors).length > 0;

  return {
    values,
    errors,
    hasErrors,
    isValidating,
    validateField,
    validateForm,
    clearFieldError,
    clearAllErrors,
    setFieldError
  };
}