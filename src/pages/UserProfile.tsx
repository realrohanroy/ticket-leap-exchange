
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Ticket, User } from '@/types';
import { supabase } from '@/integrations/supabase/client';
import UserReviews from '@/components/reviews/UserReviews';
import UserRatingBadge from '@/components/reviews/UserRatingBadge';
import TicketList from '@/components/tickets/TicketList';

const UserProfile = () => {
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [userTickets, setUserTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!userId) return;
      
      try {
        // Fetch user profile
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single();
        
        if (profileError) throw profileError;
        
        if (profileData) {
          setUser({
            id: profileData.id,
            name: profileData.name || 'User',
            email: '', // We don't expose email
            avgRating: profileData.avg_rating,
            reviewCount: profileData.review_count || 0
          });
        }
        
        // Fetch user's active tickets
        const { data: ticketsData, error: ticketsError } = await supabase
          .from('tickets')
          .select('*')
          .eq('user_id', userId)
          .eq('status', 'active')
          .order('created_at', { ascending: false });
        
        if (ticketsError) throw ticketsError;
        
        if (ticketsData) {
          const formattedTickets: Ticket[] = ticketsData.map((ticket: any) => ({
            id: ticket.id,
            userId: ticket.user_id,
            mode: ticket.mode,
            fromCity: ticket.from_city,
            toCity: ticket.to_city,
            travelDate: ticket.travel_date,
            departureTime: ticket.departure_time,
            ticketType: ticket.ticket_type,
            trainOrBusName: ticket.train_or_bus_name,
            price: ticket.price,
            contactInfo: ticket.contact_info,
            viewCount: ticket.view_count,
            createdAt: ticket.created_at,
            additionalInfo: ticket.additional_info || "",
            carModel: ticket.car_model,
            seatsAvailable: ticket.seats_available,
            status: ticket.status
          }));
          
          setUserTickets(formattedTickets);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId]);
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 py-8">
          <div className="container">
            <p className="text-center py-8">Loading profile...</p>
          </div>
        </main>
      </div>
    );
  }
  
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 py-8">
          <div className="container">
            <p className="text-center py-8">User not found</p>
          </div>
        </main>
      </div>
    );
  }

  const initials = user.name ? user.name.split(' ')
    .map(n => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase() : '??';

  // Fix for the type error: parse the hexadecimal substring from user ID to a number
  const memberSinceYear = user.id ? new Date(parseInt(user.id.substring(0, 8), 16) * 1000).getFullYear() : new Date().getFullYear();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-8">
        <div className="container max-w-5xl">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <Avatar className="h-20 w-20 text-lg">
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-center md:items-start gap-2">
                  <div className="flex flex-col md:flex-row items-center gap-2">
                    <h1 className="text-2xl font-bold">{user.name}</h1>
                    <UserRatingBadge 
                      rating={user.avgRating || null} 
                      reviewCount={user.reviewCount || 0}
                    />
                  </div>
                  <p className="text-muted-foreground">Member since {memberSinceYear}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Tabs defaultValue="reviews" className="mt-8">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="tickets">Active Tickets</TabsTrigger>
            </TabsList>
            <TabsContent value="reviews" className="mt-6">
              <UserReviews userId={userId || ''} />
            </TabsContent>
            <TabsContent value="tickets" className="mt-6">
              {userTickets.length > 0 ? (
                <TicketList tickets={userTickets} />
              ) : (
                <div className="py-6 text-center text-muted-foreground border rounded-md bg-muted/10">
                  No active tickets found
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default UserProfile;
