
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import TicketForm from '@/components/tickets/TicketForm';
import { useAuth } from '@/context/AuthContext';
import AuthModal from '@/components/auth/AuthModal';
import { Bus, RailSymbol } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const PostTicket = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [authModalOpen, setAuthModalOpen] = React.useState(false);

  // Check for Supabase auth session on component mount
  useEffect(() => {
    const checkAuthSession = async () => {
      const { data } = await supabase.auth.getSession();
      console.log("Current Supabase auth session:", data.session);
      
      if (!data.session && isAuthenticated) {
        console.log("Local auth exists but no Supabase session, attempting demo login");
        try {
          // Sign in with demo account for development purposes
          await supabase.auth.signInWithPassword({
            email: 'demo@example.com',
            password: 'password123'
          });
        } catch (error) {
          console.error("Failed to establish Supabase session:", error);
        }
      }
    };
    
    checkAuthSession();
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) {
      setAuthModalOpen(true);
    }
  }, [isAuthenticated]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-10">
        <div className="container max-w-3xl">
          {isAuthenticated ? (
            <TicketForm />
          ) : (
            <div className="flex flex-col items-center justify-center h-full py-16 text-center">
              <div className="flex items-center mb-6">
                <RailSymbol className="w-12 h-12 text-brand-blue" />
                <Bus className="w-12 h-12 text-brand-orange -ml-2" />
              </div>
              <h1 className="text-3xl font-bold mb-4">Log in to Post Tickets</h1>
              <p className="text-muted-foreground mb-6 max-w-md">
                You need to be logged in to post tickets. This helps us ensure quality listings and prevent spam.
              </p>
            </div>
          )}
        </div>
      </main>
      
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => {
          setAuthModalOpen(false);
          if (!isAuthenticated) {
            navigate('/');
          }
        }}
      />
    </div>
  );
};

export default PostTicket;
