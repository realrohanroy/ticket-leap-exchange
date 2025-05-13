
export type User = {
  id: string;
  email: string;
  name?: string;
  avgRating?: number;
  reviewCount?: number;
};

export type Ticket = {
  id: string;
  userId: string;
  mode: 'rail' | 'bus' | 'car';
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
  status?: 'active' | 'sold' | 'expired' | 'suspended';
  reported?: boolean;
  reportReason?: string;
  reportedBy?: string;
  reportDate?: string;
  // Car-specific fields
  carModel?: string;
  seatsAvailable?: number;
};

export type TicketFormData = Omit<Ticket, 'id' | 'userId' | 'viewCount' | 'createdAt' | 'status' | 'reported' | 'reportReason' | 'reportedBy' | 'reportDate'>;

export type SearchFilters = {
  fromCity?: string;
  toCity?: string;
  travelDate?: string;
  mode?: 'rail' | 'bus' | 'car' | 'all';
  ticketType?: string;
};

export type AlertVariant = 'default' | 'destructive' | 'warning';

// Terms of Use structure
export type TermSection = {
  id: string;
  title: string;
  content: string | string[];
};

export type KeyTakeaway = {
  icon: string;
  title: string;
  description: string;
};

// Review system types
export type Review = {
  id: string;
  reviewerId: string;
  reviewerName?: string;
  reviewedUserId: string;
  ticketId: string;
  rating: number;
  comment?: string;
  createdAt: string;
};

export type ReviewFormData = Omit<Review, 'id' | 'reviewerId' | 'reviewerName' | 'createdAt'>;
