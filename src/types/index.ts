
export type User = {
  id: string;
  email: string;
  name?: string;
};

export type Ticket = {
  id: string;
  userId: string;
  mode: 'rail' | 'bus';
  fromCity: string;
  toCity: string;
  travelDate: string;
  departureTime?: string;
  ticketType: string;
  trainOrBusName: string;
  price: number | 'Free';
  contactInfo: string;
  viewCount: number;
  createdAt: string;
  additionalInfo?: string;
};

export type TicketFormData = Omit<Ticket, 'id' | 'userId' | 'viewCount' | 'createdAt'>;

export type SearchFilters = {
  fromCity?: string;
  toCity?: string;
  travelDate?: string;
  mode?: 'rail' | 'bus' | 'all';
  ticketType?: string;
};
