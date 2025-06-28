
import React from 'react';
import Select from 'react-select';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

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

const cityOptions = maharashtraCities.map(city => ({
  value: city,
  label: city
}));

interface AutocompleteInputProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  'aria-label'?: string;
}

export const AutocompleteInput: React.FC<AutocompleteInputProps> = ({
  placeholder = "Search location...",
  value,
  onChange,
  className,
  'aria-label': ariaLabel
}) => {
  const isMobile = useIsMobile();
  
  // Ensure we find the correct selected option
  const selectedOption = value ? cityOptions.find(option => option.value === value) : null;

  const handleChange = (selectedOption: any) => {
    onChange(selectedOption ? selectedOption.value : '');
  };

  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      borderColor: state.isFocused ? 'hsl(var(--ring))' : 'hsl(var(--border))',
      boxShadow: state.isFocused ? '0 0 0 2px hsl(var(--ring) / 0.2)' : 'none',
      '&:hover': {
        borderColor: state.isFocused ? 'hsl(var(--ring))' : 'hsl(var(--border))'
      },
      minHeight: isMobile ? '48px' : '40px',
      background: 'white',
      borderRadius: isMobile ? '12px' : '8px',
      fontSize: isMobile ? '16px' : '14px',
      fontWeight: '500',
      borderWidth: '2px',
      cursor: 'text',
      transition: 'all 0.2s ease-in-out'
    }),
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: 'white',
      zIndex: 9999,
      border: '2px solid hsl(var(--border))',
      borderRadius: isMobile ? '16px' : '12px',
      boxShadow: isMobile 
        ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
        : '0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      overflow: 'hidden',
      maxHeight: isMobile ? '60vh' : '300px',
      marginTop: '4px'
    }),
    menuList: (provided: any) => ({
      ...provided,
      padding: isMobile ? '12px' : '8px',
      maxHeight: isMobile ? 'calc(60vh - 24px)' : '280px',
      overflowY: 'auto',
      WebkitOverflowScrolling: 'touch'
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
      padding: isMobile ? '16px 20px' : '12px 16px',
      borderRadius: isMobile ? '10px' : '6px',
      margin: '2px 0',
      fontSize: isMobile ? '16px' : '14px',
      fontWeight: state.isSelected ? '600' : '500',
      '&:active': {
        backgroundColor: state.isSelected ? 'hsl(var(--primary))' : 'hsl(var(--accent))'
      },
      transition: 'all 0.15s ease',
      minHeight: isMobile ? '48px' : 'auto',
      display: 'flex',
      alignItems: 'center'
    }),
    input: (provided: any) => ({
      ...provided,
      color: 'hsl(var(--foreground))',
      fontSize: isMobile ? '16px' : '14px'
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: 'hsl(var(--foreground))',
      fontSize: isMobile ? '16px' : '14px',
      fontWeight: '600'
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: 'hsl(var(--muted-foreground))',
      fontSize: isMobile ? '16px' : '14px',
      fontWeight: '400'
    }),
    dropdownIndicator: (provided: any) => ({
      ...provided,
      color: 'hsl(var(--muted-foreground))',
      padding: isMobile ? '12px 16px' : '8px 12px',
      '&:hover': {
        color: 'hsl(var(--foreground))'
      }
    }),
    clearIndicator: (provided: any) => ({
      ...provided,
      color: 'hsl(var(--muted-foreground))',
      padding: isMobile ? '12px 8px' : '8px 4px',
      cursor: 'pointer',
      '&:hover': {
        color: 'hsl(var(--foreground))'
      }
    }),
    valueContainer: (provided: any) => ({
      ...provided,
      padding: isMobile ? '8px 20px' : '8px 16px'
    })
  };

  return (
    <Select
      className={cn("text-base touch-manipulation", className)}
      classNamePrefix="city-select"
      value={selectedOption}
      onChange={handleChange}
      options={cityOptions}
      placeholder={placeholder}
      isClearable
      isSearchable
      styles={customStyles}
      menuPlacement="auto"
      menuPosition={isMobile ? "fixed" : "absolute"}
      menuPortalTarget={isMobile && typeof document !== 'undefined' ? document.body : null}
      aria-label={ariaLabel}
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
        IndicatorSeparator: () => null
      }}
      noOptionsMessage={({ inputValue }) => 
        inputValue ? `No cities found matching "${inputValue}"` : "Start typing to search cities"
      }
      filterOption={(option, inputValue) =>
        option.label.toLowerCase().includes(inputValue.toLowerCase())
      }
    />
  );
};
