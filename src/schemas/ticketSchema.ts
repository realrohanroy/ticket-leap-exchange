import { z } from 'zod';

export const ticketFormSchema = z.object({
  mode: z.enum(['rail', 'bus', 'car'], {
    required_error: 'Please select a travel mode'
  }),
  fromCity: z.string()
    .min(1, 'From city is required')
    .max(100, 'City name is too long'),
  toCity: z.string()
    .min(1, 'To city is required')
    .max(100, 'City name is too long'),
  travelDate: z.string()
    .min(1, 'Travel date is required')
    .refine(val => {
      const date = new Date(val);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return date >= today;
    }, 'Travel date must be today or in the future'),
  departureTime: z.string().optional(),
  ticketType: z.string()
    .min(1, 'Ticket type is required'),
  trainOrBusName: z.string().optional(),
  contactInfo: z.string()
    .min(10, 'Contact number must be at least 10 digits')
    .max(15, 'Contact number is too long')
    .regex(/^\d+$/, 'Contact number must contain only digits'),
  countryCode: z.string()
    .min(1, 'Country code is required'),
  additionalInfo: z.string().optional(),
  carModel: z.string().optional(),
  seatsAvailable: z.number()
    .min(1, 'At least 1 seat must be available')
    .max(8, 'Maximum 8 seats allowed')
    .optional()
}).refine(data => {
  // From and to cities must be different
  return data.fromCity !== data.toCity;
}, {
  message: 'From and to cities must be different',
  path: ['toCity']
}).refine(data => {
  // For rail/bus mode, train/bus name is required
  if (data.mode === 'rail' || data.mode === 'bus') {
    return data.trainOrBusName && data.trainOrBusName.length > 0;
  }
  return true;
}, {
  message: 'Train/Bus name is required for rail and bus travel',
  path: ['trainOrBusName']
}).refine(data => {
  // For car mode, car model and seats are required
  if (data.mode === 'car') {
    return data.carModel && data.carModel.length > 0;
  }
  return true;
}, {
  message: 'Car model is required for car travel',
  path: ['carModel']
}).refine(data => {
  // For car mode, seats available is required
  if (data.mode === 'car') {
    return data.seatsAvailable && data.seatsAvailable > 0;
  }
  return true;
}, {
  message: 'Number of available seats is required for car travel',
  path: ['seatsAvailable']
});

export type TicketFormData = z.infer<typeof ticketFormSchema>;