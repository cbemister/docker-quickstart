
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-secondary/20 px-4">
      <motion.div 
        className="text-center max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="text-9xl font-bold text-primary/20 mb-4"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 10, stiffness: 100 }}
        >
          404
        </motion.div>
        
        <h1 className="text-3xl font-bold mb-4">Page not found</h1>
        
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <Button asChild className="transition-all hover:scale-105 active:scale-95">
          <Link to="/">Return to Home</Link>
        </Button>
      </motion.div>
    </div>
  );
};

export default NotFound;
