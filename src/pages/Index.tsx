
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

const Index = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  
  // Check connection to Supabase
  useEffect(() => {
    const checkConnection = async () => {
      try {
        // Simple health check
        const { data, error } = await supabase.from('_db_health').select('*').limit(1);
        if (error) {
          console.error('Supabase connection error:', error);
          setIsConnected(false);
        } else {
          setIsConnected(true);
        }
      } catch (err) {
        console.error('Error checking Supabase connection:', err);
        setIsConnected(false);
      }
    };
    
    checkConnection();
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 15,
        stiffness: 100,
      },
    },
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-secondary/20 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-4xl w-full mx-auto text-center"
      >
        <motion.div variants={itemVariants} className="mb-2">
          <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium mb-2">
            Docker + Supabase Starter
          </span>
        </motion.div>
        
        <motion.h1 
          variants={itemVariants}
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6"
        >
          Beautifully Simple Web Applications
        </motion.h1>
        
        <motion.p 
          variants={itemVariants}
          className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10"
        >
          A minimalist starter template with Docker and self-hosted Supabase integration. 
          Build elegant, responsive applications with attention to every detail.
        </motion.p>
        
        <motion.div
          variants={itemVariants}
          className="bg-card rounded-xl glass-card p-6 mb-10 border border-border"
        >
          <h2 className="text-xl font-medium mb-3">Supabase Connection Status</h2>
          <div className="flex items-center justify-center gap-2">
            {isConnected === null ? (
              <div className="flex items-center">
                <div className="animate-spin h-5 w-5 border-2 border-primary border-t-transparent rounded-full mr-2"></div>
                <span>Checking connection...</span>
              </div>
            ) : isConnected ? (
              <div className="flex items-center text-green-600 dark:text-green-400">
                <div className="h-3 w-3 rounded-full bg-green-600 dark:bg-green-400 mr-2"></div>
                <span>Connected to Supabase</span>
              </div>
            ) : (
              <div className="flex items-center text-red-600 dark:text-red-400">
                <div className="h-3 w-3 rounded-full bg-red-600 dark:bg-red-400 mr-2"></div>
                <span>Not connected to Supabase</span>
              </div>
            )}
          </div>
        </motion.div>
        
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button asChild className="transition-all hover:scale-105 active:scale-95">
            <Link to="/dashboard">
              Get Started
            </Link>
          </Button>
          
          <Button 
            variant="outline" 
            className="transition-all hover:scale-105 active:scale-95"
            asChild
          >
            <a href="https://github.com/your-username/your-repo" target="_blank" rel="noopener noreferrer">
              View on GitHub
            </a>
          </Button>
        </motion.div>
      </motion.div>
      
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="mt-auto py-6 text-sm text-muted-foreground"
      >
        <p>Designed with precision and care</p>
      </motion.footer>
    </div>
  );
};

export default Index;
