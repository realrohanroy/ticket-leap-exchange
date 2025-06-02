
import React from 'react';
import Select from 'react-select';
import { cn } from '@/lib/utils';

const maharashtraCities = [
  'Mumbai', 'Pune', 'Nagpur', 'Thane', 'Nashik', 
  'Aurangabad', 'Solapur', 'Kolhapur', 'Amravati', 'Nanded',
  'Sangli', 'Latur', 'Dhule', 'Ahmednagar', 'Jalgaon',
  'Akola', 'Chandrapur', 'Parbhani', 'Satara', 'Yavatmal',
  'Ratnagiri', 'Osmanabad', 'Beed', 'Wardha', 'Gondia', 
  'Buldhana', 'Jalna', 'Hingoli', 'Washim', 'Gadchiroli',
  'Bhandara', 'Sindhudurg', 'Kalyan', 'Vasai-Virar', 'Malegaon',
  'Bhiwandi', 'Navi Mumbai', 'Panvel', 'Lonavala', 'Alibaug',
  'Shirdi', 'Palghar', 'Karjat', 'Ambarnath', 'Badlapur', 
  'Mira-Bhayandar', 'Ulhasnagar', 'Khed', 'Baramati'
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

  // Enhanced mobile-first styles
  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      borderColor: state.isFocused ? 'hsl(var(--ring))' : 'hsl(var(--border))',
      boxShadow: state.isFocused ? '0 0 0 2px hsl(var(--ring) / 0.2)' : 'none',
      '&:hover': {
        borderColor: state.isFocused ? 'hsl(var(--ring))' : 'hsl(var(--border))'
      },
      minHeight: '48px',
      background: 'white',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: '500',
      borderWidth: '2px',
      cursor: 'text'
    }),
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: 'white',
      zIndex: 50,
      border: '2px solid hsl(var(--border))',
      borderRadius: '12px',
      boxShadow: '0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      overflow: 'hidden',
      maxHeight: '300px'
    }),
    menuList: (provided: any) => ({
      ...provided,
      padding: '8px',
      maxHeight: '280px'
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected 
        ? 'hsl(var(--primary))' 
        : state.isFocused 
          ? 'hsl(var(--accent))' 
          : 'white',
      color: state.isSelected 
        ? 'hsl(var(--primary-foreground))' 
        : 'hsl(var(--foreground))',
      cursor: 'pointer',
      padding: '12px 16px',
      borderRadius: '6px',
      margin: '2px 0',
      fontSize: '16px',
      fontWeight: state.isSelected ? '600' : '500',
      '&:active': {
        backgroundColor: state.isSelected ? 'hsl(var(--primary))' : 'hsl(var(--accent))'
      },
      transition: 'all 0.15s ease'
    }),
    input: (provided: any) => ({
      ...provided,
      color: 'hsl(var(--foreground))',
      fontSize: '16px'
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: 'hsl(var(--foreground))',
      fontSize: '16px',
      fontWeight: '500'
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: 'hsl(var(--muted-foreground))',
      fontSize: '16px',
      fontWeight: '400'
    }),
    dropdownIndicator: (provided: any) => ({
      ...provided,
      color: 'hsl(var(--muted-foreground))',
      padding: '8px 12px'
    }),
    clearIndicator: (provided: any) => ({
      ...provided,
      color: 'hsl(var(--muted-foreground))',
      padding: '8px 4px',
      cursor: 'pointer',
      '&:hover': {
        color: 'hsl(var(--foreground))'
      }
    }),
    indicatorSeparator: (provided: any) => ({
      ...provided,
      backgroundColor: 'hsl(var(--border))',
      margin: '8px 4px'
    }),
    valueContainer: (provided: any) => ({
      ...provided,
      padding: '8px 16px'
    })
  };

  return (
    <Select
      className={cn("text-base", className)}
      classNamePrefix="city-select"
      value={selectedOption}
      onChange={handleChange}
      options={cityOptions}
      placeholder={placeholder}
      isClearable
      isSearchable
      styles={customStyles}
      menuPlacement="auto"
      menuPosition="fixed"
      menuPortalTarget={typeof document !== 'undefined' ? document.body : null}
      theme={(theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary: 'hsl(var(--primary))',
          primary75: 'hsl(var(--primary) / 0.75)',
          primary50: 'hsl(var(--primary) / 0.5)',
          primary25: 'hsl(var(--primary) / 0.25)',
          neutral0: 'white',
          neutral5: '#f9f9f9',
          neutral10: '#f3f3f3',
          neutral20: 'hsl(var(--border))',
          neutral30: '#cccccc',
          neutral40: 'hsl(var(--muted-foreground))',
          neutral50: '#808080',
          neutral60: '#666666',
          neutral70: '#4d4d4d',
          neutral80: 'hsl(var(--foreground))',
          neutral90: '#1a1a1a',
        },
      })}
      components={{
        IndicatorSeparator: () => null // Remove separator for cleaner look
      }}
    />
  );
};
