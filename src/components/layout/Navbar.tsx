
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import AuthModal from '../auth/AuthModal';
import { Bus, User, Menu, X } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleAuthClick = () => {
    setAuthModalOpen(true);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 w-full py-3 md:py-4 bg-white border-b shadow-sm">
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="p-1.5 rounded-lg">
            <Bus className="w-6 h-6 text-brand-blue" strokeWidth={2.5} />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-serif tracking-wide text-brand-dark">
              <span className="font-light">Share</span>
              <span className="font-medium">My</span>
              <span className="text-brand-blue font-semibold">Seat</span>
            </span>
            <span className="text-[10px] text-brand-orange font-medium tracking-widest -mt-1">TRAVEL CONNECTED</span>
          </div>
        </Link>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMobileMenu} className="relative">
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <Link to="/search">
                <Button variant="ghost">Search Seat</Button>
              </Link>
              <Link to="/post-ticket">
                <Button variant="outline">Post Seat</Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => navigate(`/user/${user?.id}`)}>
                    {user?.name || user?.email}
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/my-tickets" className="w-full">My Tickets</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link to="/search">
                <Button variant="ghost">Search Seat</Button>
              </Link>
              <Button onClick={handleAuthClick}>
                Post Seat
              </Button>
            </>
          )}
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white pt-2 pb-4 px-4 border-t">
          <div className="flex flex-col space-y-3">
            <Link to="/search" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start">Search Seat</Button>
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link to="/post-ticket" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full justify-start">Post Seat</Button>
                </Link>
                <Link to="/my-tickets" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">My Tickets</Button>
                </Link>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start"
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button 
                className="w-full" 
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleAuthClick();
                }}
              >
                Post Seat
              </Button>
            )}
          </div>
        </div>
      )}
      
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        afterLoginRedirectTo="/post-ticket"
      />
    </nav>
  );
};

export default Navbar;
