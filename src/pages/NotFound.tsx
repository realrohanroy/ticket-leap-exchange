
import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from '@/components/ui/button';
import { RailSymbol, Bus } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="flex items-center mb-6">
        <RailSymbol className="w-10 h-10 text-brand-blue" />
        <Bus className="w-10 h-10 text-brand-orange -ml-1" />
      </div>
      
      <h1 className="text-5xl font-bold mb-2 text-brand-dark">404</h1>
      <p className="text-xl text-muted-foreground mb-6">
        Oops! This page has left the station
      </p>

      <div className="max-w-md text-center mb-8">
        <p>The page you're looking for doesn't exist or has been moved.</p>
      </div>
      
      <Button asChild size="lg">
        <Link to="/">Return Home</Link>
      </Button>
    </div>
  );
};

export default NotFound;
