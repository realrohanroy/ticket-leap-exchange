
import React from 'react';
import { Link } from 'react-router-dom';
import { Bus, RailSymbol } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between mb-8">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="flex items-center space-x-2 mb-2">
              <div className="flex items-center">
                <RailSymbol className="w-6 h-6 text-brand-blue" />
                <Bus className="w-6 h-6 text-brand-orange -ml-1" />
              </div>
              <span className="text-xl font-bold">TicketLeap</span>
            </Link>
            <p className="text-gray-400 max-w-md">
              A platform for travelers to find and list unused intercity rail and bus tickets.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-3">Platform</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/search" className="text-gray-400 hover:text-white transition">
                    Search Tickets
                  </Link>
                </li>
                <li>
                  <Link to="/post-ticket" className="text-gray-400 hover:text-white transition">
                    Post a Ticket
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/terms" className="text-gray-400 hover:text-white transition">
                    Terms of Use
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-gray-400 hover:text-white transition">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <Separator className="bg-gray-700" />
        
        <div className="pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            © 2025 TicketLeap Exchange. All rights reserved.
          </p>
          <p className="text-xs text-gray-500 mt-2 md:mt-0">
            <span className="text-gray-400">Important: </span>
            We do not facilitate ticket transfers or guarantee validity of tickets.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
