
import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from '@/components/ui/button';
import { RailSymbol, Bus, Home, RotateCcw, ArrowLeft, MapPin, Map, CloudRain, Umbrella, Sun } from 'lucide-react';
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

  const iconVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1, 
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  // Random motivational messages with travel theme
  const messages = [
    "Looks like your journey took an unexpected detour!",
    "This stop isn't on our route map, but your adventure continues!",
    "You've reached the end of the line, but not the end of your journey!",
    "Even the best travelers sometimes take a wrong turn!",
    "This platform doesn't exist, but many exciting destinations await you!",
    "Every great journey includes a few unexpected stops along the way!",
    "Sometimes the best stories come from getting a little lost!",
    "This path is under construction, but there are many others to explore!"
  ];
  
  // Weather-themed icons to add more visual interest
  const WeatherIcon = () => {
    const icons = [
      <Sun className="text-yellow-500 animate-pulse" />,
      <CloudRain className="text-blue-400" />,
      <Umbrella className="text-purple-500" />
    ];
    
    return icons[Math.floor(Math.random() * icons.length)];
  };
  
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-sky-50 to-blue-100 p-4">
      <motion.div 
        className="w-full max-w-md text-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div 
          variants={iconVariants} 
          className="flex items-center justify-center mb-6 md:mb-8 relative"
        >
          <div className="relative">
            <motion.div
              animate={{
                rotate: [0, -5, 5, -5, 0],
                y: [0, -3, 3, -3, 0]
              }}
              transition={{ repeat: Infinity, duration: 4 }}
            >
              <RailSymbol className="w-14 h-14 sm:w-16 sm:h-16 text-brand-blue" />
            </motion.div>
            
            <motion.div
              className="absolute -right-4 top-0"
              animate={{
                y: [0, -8, 0],
                x: [0, 3, 0]
              }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <Bus className="w-14 h-14 sm:w-16 sm:h-16 text-brand-orange" />
            </motion.div>
            
            <motion.div 
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2"
              initial={{ y: 0 }}
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <MapPin className="w-8 h-8 text-red-500" />
            </motion.div>
            
            <motion.div 
              className="absolute -top-6 right-0"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
            >
              <div className="w-8 h-8">
                <WeatherIcon />
              </div>
            </motion.div>
          </div>
        </motion.div>
        
        <motion.h1 
          variants={itemVariants} 
          className="text-5xl sm:text-6xl font-bold mb-4 text-brand-dark"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1, rotate: [0, -5, 5, -5, 0] }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          404
        </motion.h1>
        
        <motion.div 
          variants={itemVariants}
          className="mb-6 rounded-2xl bg-white p-5 sm:p-6 shadow-lg border border-gray-100"
        >
          <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-brand-dark">
            {randomMessage}
          </h2>
          <p className="text-muted-foreground mb-6 text-sm sm:text-base">
            The page you're looking for seems to have vanished into thin air! Let's get you back on track to your destination.
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
        
        <motion.div 
          variants={itemVariants} 
          className="text-sm text-muted-foreground bg-white p-4 rounded-lg shadow-md"
        >
          <Map className="inline-block mr-2 h-4 w-4 text-brand-blue" />
          Need directions? <Link to="/search" className="text-brand-blue hover:underline">Search for tickets</Link> or <Link to="/post-ticket" className="text-brand-blue hover:underline">post your seat</Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;
