
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import AuthModal from '@/components/auth/AuthModal';

interface CTASectionProps {
  isAuthenticated: boolean;
}

const CTASection: React.FC<CTASectionProps> = ({ isAuthenticated }) => {
  const [authModalOpen, setAuthModalOpen] = React.useState(false);
  const isMobile = useIsMobile();

  const handleSignUpClick = () => {
    if (!isAuthenticated) {
      setAuthModalOpen(true);
    }
  };

  return (
    <div className="bg-gradient-to-b from-brand-blue to-blue-700 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Ready to Travel Smarter?
          </h2>
          <p className="mt-4 text-lg leading-6 text-blue-100">
            Join travelers across Maharashtra. Find seats or share your journey today.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {!isAuthenticated ? (
              <Button 
                onClick={handleSignUpClick}
                className="bg-white text-brand-blue hover:bg-blue-50"
                size={isMobile ? "default" : "lg"}
              >
                Sign up for free
              </Button>
            ) : (
              <Button 
                asChild
                className="bg-white text-brand-blue hover:bg-blue-50"
                size={isMobile ? "default" : "lg"}
              >
                <Link to="/post-ticket">Post Your Seat</Link>
              </Button>
            )}
            
            <Button 
              asChild
              variant="outline" 
              className="border-white text-white hover:bg-blue-800/60"
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
