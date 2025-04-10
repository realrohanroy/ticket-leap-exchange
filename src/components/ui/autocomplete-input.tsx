
import React, { useState } from 'react';
import Select from 'react-select';
import { cn } from '@/lib/utils';

// Maharashtra cities as specified
const maharashtraCities = [
  'Mumbai', 'Thane', 'Kalyan', 'Murbad', 'Igatpuri', 'Nashik', 'Malegaon', 
  'Dhule', 'Jalgaon', 'Malkapur', 'Khamgaon', 'Akola', 'Amravati', 'Badnera', 
  'Wardha', 'Nagpur', 'Pune', 'Ahmednagar', 'Aurangabad', 'Jalna', 'Solapur', 
  'Chandrapur', 'Ballarshah', 'Latur', 'Nanded'
];

// Format cities for react-select
const cityOptions = maharashtraCities.map(city => ({
  value: city,
  label: city
}));

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
  const selectedOption = cityOptions.find(option => option.value === value) || null;

  const handleChange = (selectedOption: any) => {
    onChange(selectedOption ? selectedOption.value : '');
  };

  // Custom styles to match our design
  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      borderColor: state.isFocused ? 'hsl(var(--ring))' : 'hsl(var(--border))',
      boxShadow: state.isFocused ? '0 0 0 1px hsl(var(--ring))' : 'none',
      '&:hover': {
        borderColor: state.isFocused ? 'hsl(var(--ring))' : 'hsl(var(--border))'
      },
      minHeight: '40px',
      background: 'hsl(var(--background))'
    }),
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: 'hsl(var(--background))',
      zIndex: 50,
      border: '1px solid hsl(var(--border))',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected 
        ? 'hsl(var(--primary))' 
        : state.isFocused 
          ? 'hsl(var(--accent))' 
          : 'transparent',
      color: state.isSelected ? 'hsl(var(--primary-foreground))' : 'inherit',
      cursor: 'pointer',
      '&:active': {
        backgroundColor: state.isSelected ? 'hsl(var(--primary))' : 'hsl(var(--accent))'
      }
    }),
    input: (provided: any) => ({
      ...provided,
      color: 'hsl(var(--foreground))'
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: 'hsl(var(--foreground))'
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: 'hsl(var(--muted-foreground))'
    })
  };

  return (
    <Select
      className={cn("", className)}
      classNamePrefix="city-select"
      value={selectedOption}
      onChange={handleChange}
      options={cityOptions}
      placeholder={placeholder}
      isClearable
      isSearchable
      styles={customStyles}
      menuPlacement="auto"
    />
  );
};
