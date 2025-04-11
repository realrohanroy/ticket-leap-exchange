
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import TicketForm from '@/components/tickets/TicketForm';
import { useAuth } from '@/context/AuthContext';
import AuthModal from '@/components/auth/AuthModal';
import Disclaimer from '@/components/layout/Disclaimer';
import { Bus, RailSymbol } from 'lucide-react';

const PostTicket = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const [authModalOpen, setAuthModalOpen] = React.useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      setAuthModalOpen(true);
    }
  }, [isAuthenticated, isLoading]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-10">
        <div className="container max-w-3xl">
          {isAuthenticated ? (
            <>
              <Disclaimer className="mb-6" />
              <TicketForm />
            </>
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
      
      <Footer />
      
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
