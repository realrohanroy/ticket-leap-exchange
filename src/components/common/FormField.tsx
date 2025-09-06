import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface FormFieldProps {
  id: string;
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  error?: string;
  type?: 'text' | 'number' | 'email' | 'tel';
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  description?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  value,
  onChange,
  error,
  type = 'text',
  placeholder,
  required = false,
  disabled = false,
  className,
  description
}) => {
  return (
    <div className={cn('space-y-2', className)}>
      <Label 
        htmlFor={id}
        className={cn(
          'text-sm font-medium',
          error && 'text-destructive',
          required && 'after:content-["*"] after:ml-0.5 after:text-destructive'
        )}
      >
        {label}
      </Label>
      
      <Input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(
          'w-full',
          error && 'border-destructive focus-visible:ring-destructive'
        )}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : description ? `${id}-description` : undefined}
      />
      
      {description && !error && (
        <p id={`${id}-description`} className="text-sm text-muted-foreground">
          {description}
        </p>
      )}
      
      {error && (
        <p id={`${id}-error`} className="text-sm font-medium text-destructive">
          {error}
        </p>
      )}
    </div>
  );
};