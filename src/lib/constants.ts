// City data for autocomplete
export const maharashtraCities = [
  'Mumbai', 'Pune', 'Nagpur', 'Thane', 'Nashik', 
  'Aurangabad', 'Solapur', 'Kolhapur', 'Amravati', 'Nanded',
  'Sangli', 'Latur', 'Dhule', 'Ahmednagar', 'Jalgaon',
  'Malegaon', 'Akola', 'Chandrapur', 'Parbhani', 'Ichalkaranji',
  'Jalna', 'Bhusawal', 'Panvel', 'Beed', 'Yavatmal',
  'Wardha', 'Satara', 'Gondia', 'Barshi', 'Washim',
  'Osmanabad', 'Hinganghat', 'Bhiwandi', 'Sailu', 'Wani',
  'Lonar', 'Mahad', 'Mira-Bhayandar', 'Ulhasnagar', 'Khed', 'Baramati'
].sort((a, b) => a.localeCompare(b));

export const cityOptions = maharashtraCities.map(city => ({
  value: city,
  label: city
}));

// Ticket types by travel mode
export const ticketTypes = {
  rail: ["Sleeper", "3AC", "2AC", "1AC", "Chair Car", "General"],
  bus: ["Seater", "Semi-Sleeper", "Sleeper", "AC", "Non-AC"],
  car: ["Economy", "Sedan", "SUV", "Luxury", "Mini-Van"]
};

// Country codes for contact fields
export const countryCodes = [
  { code: "+1", country: "US/Canada" },
  { code: "+44", country: "UK" },
  { code: "+91", country: "India" },
  { code: "+61", country: "Australia" },
  { code: "+33", country: "France" },
  { code: "+49", country: "Germany" },
  { code: "+81", country: "Japan" },
  { code: "+86", country: "China" },
  { code: "+7", country: "Russia" },
  { code: "+55", country: "Brazil" },
  { code: "+27", country: "South Africa" },
  { code: "+39", country: "Italy" },
  { code: "+34", country: "Spain" },
  { code: "+31", country: "Netherlands" },
  { code: "+46", country: "Sweden" },
  { code: "+47", country: "Norway" },
  { code: "+45", country: "Denmark" },
  { code: "+41", country: "Switzerland" },
  { code: "+43", country: "Austria" },
  { code: "+32", country: "Belgium" }
];

// Form validation messages
export const ValidationMessages = {
  SAME_CITIES: "Departure and destination cities cannot be the same",
  SAME_CITIES_TITLE: "Same city selected",
  INVALID_SEARCH_TITLE: "Invalid search",
  REQUIRED_FIELD: "This field is required",
  INVALID_PHONE: "Please enter a valid phone number",
  INVALID_DATE: "Please select a valid date"
} as const;

// UI Text constants
export const UIText = {
  SEARCH_PLACEHOLDER: "Start typing to search cities",
  NO_CITIES_FOUND: (query: string) => `No cities found matching "${query}"`,
  SWAP_CITIES_LABEL: "Swap departure and destination cities",
  LOADING: "Loading...",
  RETRY: "Try Again",
  SUBMIT: "Submit",
  CANCEL: "Cancel"
} as const;