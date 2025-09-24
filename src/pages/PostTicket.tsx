
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import TicketForm from '@/components/tickets/TicketForm';
import { useAuth } from '@/context/AuthContext';
import AuthModal from '@/components/auth/AuthModal';
import Disclaimer from '@/components/layout/Disclaimer';
import { Bus, RailSymbol, Plus } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const PostTicket = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [authModalOpen, setAuthModalOpen] = React.useState(false);
  const isMobile = useIsMobile();
  
  // Dev-only bypass to test posting form without signing in: add ?debug=1
  const queryParams = new URLSearchParams(location.search);
  const bypassAuth = import.meta.env.DEV && queryParams.get('debug') === '1';
  const canAccess = isAuthenticated || bypassAuth;

  useEffect(() => {
    if (!isLoading && !canAccess) {
      setAuthModalOpen(true);
    }
  }, [canAccess, isLoading]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-1 py-4 md:py-10">
        <div className={`container ${isMobile ? 'px-4' : 'max-w-3xl'}`}>
          {canAccess ? (
            <>
              {/* Mobile-optimized header */}
              <div className={`mb-6 ${isMobile ? 'text-center' : ''}`}>
                <div className="flex items-center justify-center mb-4">
                  <div className="relative">
                    <div className="flex items-center">
                      <RailSymbol className={`${isMobile ? 'w-10 h-10' : 'w-12 h-12'} text-brand-blue`} />
                      <Bus className={`${isMobile ? 'w-10 h-10' : 'w-12 h-12'} text-brand-orange -ml-2`} />
                    </div>
                    <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1">
                      <Plus className="w-3 h-3 text-white" />
                    </div>
                  </div>
                </div>
                <h1 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold mb-2`}>
                  Post Your Seat
                </h1>
                <p className={`text-muted-foreground ${isMobile ? 'text-sm px-4' : ''}`}>
                  Share your available seat with fellow travelers and earn money while helping others
                </p>
              </div>

              <Disclaimer className="mb-6" />
              
              {/* Mobile-optimized form container */}
              <div className={`${isMobile ? 'bg-white rounded-xl shadow-sm border' : 'bg-white rounded-lg shadow-lg'} p-6`}>
                <TicketForm />
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full py-16 text-center">
              <div className="flex items-center mb-6">
                <RailSymbol className="w-12 h-12 text-brand-blue" />
                <Bus className="w-12 h-12 text-brand-orange -ml-2" />
              </div>
              <h1 className="text-3xl font-bold mb-4">Log in to Post Your Seat</h1>
              <p className="text-muted-foreground mb-6 max-w-md">
                You need to be logged in to post your travel seat. This helps us ensure quality listings and prevent spam.
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
