
import React from 'react';
import { Link } from 'react-router-dom';
import { Bus, ExternalLink } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useIsMobile } from '@/hooks/use-mobile';

const Footer = () => {
  const isMobile = useIsMobile();
  
  return (
    <footer className="bg-gray-900 text-white py-6 md:py-8">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between mb-6 md:mb-8">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="flex items-center space-x-2 mb-3">
              <div className="p-1 rounded-lg">
                <Bus className="w-5 h-5 md:w-5 md:h-5 text-brand-blue" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col">
                <span className="text-lg md:text-xl font-serif tracking-wide">
                  <span className="font-light">Share</span>
                  <span className="font-medium">My</span>
                  <span className="text-brand-blue font-semibold">Seat</span>
                </span>
                <span className="text-[9px] md:text-[10px] text-brand-orange font-medium tracking-widest -mt-1">TRAVEL CONNECTED</span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm max-w-md">
              A platform for travelers to find and list unused intercity rail and bus tickets.
            </p>
          </div>
          
          <div className={`grid ${isMobile ? 'grid-cols-3' : 'grid-cols-3 gap-8'} gap-6`}>
            <div>
              <h3 className="font-semibold mb-2 md:mb-3 text-sm md:text-base">Platform</h3>
              <ul className="space-y-1 md:space-y-2">
                <li>
                  <Link to="/search" className="text-gray-400 hover:text-white transition text-sm">
                    Search Tickets
                  </Link>
                </li>
                <li>
                  <Link to="/post-ticket" className="text-gray-400 hover:text-white transition text-sm">
                    Post a Ticket
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2 md:mb-3 text-sm md:text-base">Legal</h3>
              <ul className="space-y-1 md:space-y-2">
                <li>
                  <Link to="/terms" className="text-gray-400 hover:text-white transition text-sm">
                    Terms of Use
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-gray-400 hover:text-white transition text-sm">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2 md:mb-3 text-sm md:text-base">Support</h3>
              <ul className="space-y-1 md:space-y-2">
                <li className="break-all">
                  <a href="mailto:support@sharemyseat.com" className="text-gray-400 hover:text-white transition text-sm">
                    support@sharemyseat.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <Separator className="bg-gray-700" />
        
        <div className="pt-4 md:pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs md:text-sm text-gray-400 text-center md:text-left">
            © 2025 ShareMySeat. All rights reserved.
          </p>
          <p className="text-xs text-gray-500 mt-2 md:mt-0 text-center md:text-left">
            <span className="text-gray-400">Important: </span>
            We do not facilitate ticket transfers or guarantee validity.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
