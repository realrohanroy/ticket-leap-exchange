
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import AuthModal from '@/components/auth/AuthModal';

interface CTASectionProps {
  isAuthenticated: boolean;
}

const CTASection: React.FC<CTASectionProps> = ({ isAuthenticated }) => {
  const [authModalOpen, setAuthModalOpen] = React.useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const handlePostTicketClick = () => {
    if (isAuthenticated) {
      navigate('/post-ticket');
    } else {
      setAuthModalOpen(true);
    }
  };

  return (
    <div className="bg-gradient-to-b from-brand-blue to-blue-700 py-8 md:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white sm:text-4xl">
            Ready to Travel Smarter?
          </h2>
          <p className="mt-3 md:mt-4 text-base md:text-lg leading-6 text-blue-100">
            Join travelers across the country. Find seats or share your journey today.
          </p>
          <div className="mt-6 md:mt-8 flex flex-wrap justify-center gap-3 md:gap-4">
            <Button 
              onClick={handlePostTicketClick}
              className="bg-white text-brand-blue hover:bg-blue-50 w-full md:w-auto"
              size={isMobile ? "default" : "lg"}
            >
              Post Ticket
            </Button>
            
            <Button 
              asChild
              className="bg-white text-brand-blue hover:bg-blue-50 w-full md:w-auto"
              size={isMobile ? "default" : "lg"}
            >
              <Link to="/search">Find Available Seats</Link>
            </Button>
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        afterLoginRedirectTo="/post-ticket"
      />
    </div>
  );
};

export default CTASection;
