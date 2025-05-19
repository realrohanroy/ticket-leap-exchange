
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
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.4 } }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <motion.div 
        className="w-full max-w-md text-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="flex items-center justify-center mb-6 md:mb-8">
          <div className="relative">
            <RailSymbol className="w-14 h-14 sm:w-16 sm:h-16 text-brand-blue animate-pulse" />
            <Bus className="w-14 h-14 sm:w-16 sm:h-16 text-brand-orange animate-bounce absolute -right-4 top-0" />
          </div>
        </motion.div>
        
        <motion.h1 variants={itemVariants} className="text-5xl sm:text-6xl font-bold mb-4 text-brand-dark">
          404
        </motion.h1>
        
        <motion.div 
          variants={itemVariants}
          className="mb-6 rounded-2xl bg-white p-5 sm:p-6 shadow-lg border border-gray-100"
        >
          <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-brand-dark">
            Oops! This page has left the station
          </h2>
          <p className="text-muted-foreground mb-6 text-sm sm:text-base">
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <div className="space-y-3 sm:space-y-0 sm:space-x-3 flex flex-col sm:flex-row justify-center">
            <Button asChild size="lg" className="gap-2 h-12 text-base">
              <Link to="/">
                <Home className="h-5 w-5" />
                Return Home
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="gap-2 h-12 text-base"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="h-5 w-5" />
              Go Back
            </Button>
            <Button 
              variant="ghost" 
              size="lg" 
              className="gap-2 h-12 text-base"
              onClick={() => window.location.reload()}
            >
              <RotateCcw className="h-5 w-5" />
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
