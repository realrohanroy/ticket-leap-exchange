
import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from '@/components/ui/button';
import { RailSymbol, Bus, Home, RotateCcw, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <motion.div 
        className="w-full max-w-md text-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="flex items-center justify-center mb-8">
          <div className="relative">
            <RailSymbol className="w-16 h-16 text-brand-blue animate-pulse" />
            <Bus className="w-16 h-16 text-brand-orange animate-bounce absolute -right-4 top-0" />
          </div>
        </motion.div>
        
        <motion.h1 variants={itemVariants} className="text-6xl font-bold mb-4 text-brand-dark">
          404
        </motion.h1>
        
        <motion.div 
          variants={itemVariants}
          className="mb-6 rounded-2xl bg-white p-6 shadow-lg border border-gray-100"
        >
          <h2 className="text-2xl font-semibold mb-2 text-brand-dark">
            Oops! This page has left the station
          </h2>
          <p className="text-muted-foreground mb-6">
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <div className="space-y-3 md:space-y-0 md:space-x-3 flex flex-col md:flex-row justify-center">
            <Button asChild size="lg" className="gap-2">
              <Link to="/">
                <Home className="h-4 w-4" />
                Return Home
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="gap-2"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Button>
            <Button 
              variant="ghost" 
              size="lg" 
              className="gap-2"
              onClick={() => window.location.reload()}
            >
              <RotateCcw className="h-4 w-4" />
              Refresh
            </Button>
          </div>
        </motion.div>
        
        <motion.div variants={itemVariants} className="text-sm text-muted-foreground">
          Lost? <Link to="/search" className="text-brand-blue hover:underline">Search for tickets</Link> or <Link to="/post-ticket" className="text-brand-blue hover:underline">post your seat</Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;
