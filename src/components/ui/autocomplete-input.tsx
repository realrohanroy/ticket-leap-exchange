
import React from 'react';
import Select from 'react-select';
import { cn } from '@/lib/utils';

const maharashtraCities = [
  'Mumbai', 'Thane', 'Kalyan', 'Murbad', 'Igatpuri', 'Nashik', 'Malegaon',
  'Dhule', 'Jalgaon', 'Malkapur', 'Khamgaon', 'Akola', 'Amravati', 'Badnera',
  'Wardha', 'Nagpur', 'Pune', 'Ahmednagar', 'Aurangabad', 'Jalna', 'Solapur',
  'Chandrapur', 'Ballarshah', 'Latur', 'Nanded', 'Delhi', 'Bengaluru', 
  'Chennai', 'Kolkata', 'Hyderabad', 'Ahmedabad', 'Surat', 'Indore', 
  'Bhopal', 'Lucknow', 'Kanpur', 'Jaipur', 'Goa', 'Shimla', 'Manali'
  ].sort((a, b) => a.localeCompare(b));
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

  // Custom styles to match our design and ensure text visibility
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
      backgroundColor: 'white',  // Explicit white background for the dropdown
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
          : 'white',   // White background for non-selected/non-focused options
      color: state.isSelected 
        ? 'hsl(var(--primary-foreground))' 
        : 'black',   // Black text for options
      cursor: 'pointer',
      '&:active': {
        backgroundColor: state.isSelected ? 'hsl(var(--primary))' : 'hsl(var(--accent))'
      }
    }),
    input: (provided: any) => ({
      ...provided,
      color: 'black'  // Black text for input
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: 'hsl(var(--foreground))'
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: 'hsl(var(--muted-foreground))'
    }),
    dropdownIndicator: (provided: any) => ({
      ...provided,
      color: 'hsl(var(--muted-foreground))'
    }),
    clearIndicator: (provided: any) => ({
      ...provided,
      color: 'hsl(var(--muted-foreground))'
    }),
    // Ensure the multi-value display has proper contrast
    multiValue: (provided: any) => ({
      ...provided,
      backgroundColor: 'hsl(var(--secondary))'
    }),
    multiValueLabel: (provided: any) => ({
      ...provided,
      color: 'black'
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
      theme={(theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary: 'hsl(var(--primary))',
          primary75: 'hsl(var(--primary) / 0.75)',
          primary50: 'hsl(var(--primary) / 0.5)',
          primary25: 'hsl(var(--primary) / 0.25)',
          neutral0: 'white',       // Background color
          neutral5: '#f9f9f9',
          neutral10: '#f3f3f3',
          neutral20: '#e0e0e0',    // Border
          neutral30: '#cccccc',
          neutral40: '#999999',    // Placeholder text
          neutral50: '#808080',
          neutral60: '#666666',
          neutral70: '#4d4d4d',
          neutral80: '#333333',    // Text
          neutral90: '#1a1a1a',
        },
      })}
    />
  );
};
