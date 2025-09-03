
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
      borderColor: state.isFocused ? 'hsl(var(--primary))' : value ? 'hsl(var(--primary) / 0.4)' : 'hsl(var(--border))',
      boxShadow: state.isFocused ? '0 0 0 3px hsl(var(--primary) / 0.15)' : value ? '0 0 0 2px hsl(var(--primary) / 0.1)' : 'none',
      '&:hover': {
        borderColor: state.isFocused ? 'hsl(var(--primary))' : 'hsl(var(--primary) / 0.3)'
      },
      minHeight: isMobile ? '56px' : '44px',
      background: value ? 'hsl(var(--primary) / 0.02)' : 'hsl(var(--background))',
      borderRadius: isMobile ? '16px' : '12px',
      fontSize: isMobile ? '16px' : '14px',
      fontWeight: value ? '600' : '500',
      borderWidth: '2px',
      cursor: 'text',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      backdropFilter: 'blur(8px)'
    }),
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: 'hsl(var(--background))',
      zIndex: 9999,
      border: '2px solid hsl(var(--primary) / 0.2)',
      borderRadius: isMobile ? '20px' : '16px',
      boxShadow: isMobile 
        ? '0 25px 50px -12px hsl(var(--primary) / 0.25), 0 0 0 1px hsl(var(--primary) / 0.05)'
        : '0 20px 25px -5px hsl(var(--primary) / 0.1), 0 10px 10px -5px hsl(var(--primary) / 0.04)',
      overflow: 'hidden',
      maxHeight: isMobile ? '65vh' : '320px',
      marginTop: '8px',
      backdropFilter: 'blur(16px)'
    }),
    menuList: (provided: any) => ({
      ...provided,
      padding: isMobile ? '16px' : '12px',
      maxHeight: isMobile ? 'calc(65vh - 32px)' : '300px',
      overflowY: 'auto',
      WebkitOverflowScrolling: 'touch',
      '&::-webkit-scrollbar': {
        width: '8px'
      },
      '&::-webkit-scrollbar-track': {
        background: 'hsl(var(--muted))',
        borderRadius: '4px'
      },
      '&::-webkit-scrollbar-thumb': {
        background: 'hsl(var(--primary) / 0.3)',
        borderRadius: '4px'
      }
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected 
        ? 'hsl(var(--primary))' 
        : state.isFocused 
          ? 'hsl(var(--primary) / 0.1)' 
          : 'transparent',
      color: state.isSelected 
        ? 'hsl(var(--primary-foreground))' 
        : 'hsl(var(--foreground))',
      cursor: 'pointer',
      padding: isMobile ? '18px 24px' : '14px 18px',
      borderRadius: isMobile ? '14px' : '10px',
      margin: isMobile ? '4px 0' : '2px 0',
      fontSize: isMobile ? '16px' : '14px',
      fontWeight: state.isSelected ? '700' : state.isFocused ? '600' : '500',
      '&:active': {
        backgroundColor: state.isSelected ? 'hsl(var(--primary))' : 'hsl(var(--primary) / 0.15)',
        transform: 'scale(0.98)'
      },
      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      minHeight: isMobile ? '52px' : 'auto',
      display: 'flex',
      alignItems: 'center',
      border: state.isFocused ? '1px solid hsl(var(--primary) / 0.3)' : '1px solid transparent'
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
      padding: isMobile ? '12px 24px' : '10px 18px'
    }),
    indicatorsContainer: (provided: any) => ({
      ...provided,
      padding: isMobile ? '12px 16px' : '8px 12px'
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
