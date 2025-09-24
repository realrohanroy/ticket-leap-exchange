
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          name: string | null;
          created_at: string;
          avg_rating: number | null;
          review_count: number;
        };
        Insert: {
          id: string;
          name?: string | null;
          created_at?: string;
          avg_rating?: number | null;
          review_count?: number;
        };
        Update: {
          id?: string;
          name?: string | null;
          created_at?: string;
          avg_rating?: number | null;
          review_count?: number;
        };
      };
      tickets: {
        Row: {
          id: string;
          user_id: string;
          mode: 'rail' | 'bus' | 'car';
          from_city: string;
          to_city: string;
          travel_date: string;
          departure_time: string | null;
          ticket_type?: string; // made optional to allow car mode without type
          train_or_bus_name: string;
          price: number;
          contact_info: string;
          view_count: number;
          created_at: string;
          car_model?: string;
          seats_available?: number;
          status?: 'active' | 'sold' | 'expired' | 'suspended';
          reported?: boolean;
          report_reason?: string;
          reported_by?: string;
          report_date?: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          mode: 'rail' | 'bus' | 'car';
          from_city: string;
          to_city: string;
          travel_date: string;
          departure_time?: string | null;
          ticket_type?: string; // made optional to allow car mode without type
          train_or_bus_name: string;
          price?: number;
          contact_info: string;
          view_count?: number;
          created_at?: string;
          car_model?: string;
          seats_available?: number;
          status?: 'active' | 'sold' | 'expired' | 'suspended';
          reported?: boolean;
          report_reason?: string;
          reported_by?: string;
          report_date?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          mode?: 'rail' | 'bus' | 'car';
          from_city?: string;
          to_city?: string;
          travel_date?: string;
          departure_time?: string | null;
          ticket_type?: string;
          train_or_bus_name?: string;
          price?: number;
          contact_info?: string;
          view_count?: number;
          created_at?: string;
          car_model?: string;
          seats_available?: number;
          status?: 'active' | 'sold' | 'expired' | 'suspended';
          reported?: boolean;
          report_reason?: string;
          reported_by?: string;
          report_date?: string;
        };
      };
      reviews: {
        Row: {
          id: string;
          reviewer_id: string;
          reviewed_user_id: string;
          ticket_id: string;
          rating: number;
          comment: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          reviewer_id: string;
          reviewed_user_id: string;
          ticket_id: string;
          rating: number;
          comment?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          reviewer_id?: string;
          reviewed_user_id?: string;
          ticket_id?: string;
          rating?: number;
          comment?: string | null;
          created_at?: string;
        };
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
    CompositeTypes: {};
  };
};
