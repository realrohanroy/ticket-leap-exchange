
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import AuthModal from '../auth/AuthModal';
import { Bus, RailSymbol, User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full py-4 bg-white border-b shadow-sm">
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="flex items-center justify-center bg-gradient-to-r from-brand-blue to-brand-orange p-1.5 rounded-lg shadow-md">
            <div className="relative">
              <RailSymbol className="w-5 h-5 text-white" />
              <Bus className="w-5 h-5 text-white absolute -bottom-1 -right-1" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-brand-dark leading-tight">ShareMy<span className="text-brand-blue">Seat</span></span>
            <span className="text-[10px] text-brand-orange font-medium tracking-wider -mt-1">TRAVEL CONNECTED</span>
          </div>
        </Link>

        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <Link to="/post-ticket">
                <Button variant="outline">Post Ticket</Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="font-medium">
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
            <Button onClick={() => setAuthModalOpen(true)}>
              Login / Register
            </Button>
          )}
        </div>
      </div>
      
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />
    </nav>
  );
};

export default Navbar;
