
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          name: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          name?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string | null;
          created_at?: string;
        };
      };
      tickets: {
        Row: {
          id: string;
          user_id: string;
          mode: 'rail' | 'bus';
          from_city: string;
          to_city: string;
          travel_date: string;
          departure_time: string | null;
          ticket_type: string;
          train_or_bus_name: string;
          price: number;
          contact_info: string;
          view_count: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          mode: 'rail' | 'bus';
          from_city: string;
          to_city: string;
          travel_date: string;
          departure_time?: string | null;
          ticket_type: string;
          train_or_bus_name: string;
          price: number;
          contact_info: string;
          view_count?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          mode?: 'rail' | 'bus';
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
        };
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
    CompositeTypes: {};
  };
};
