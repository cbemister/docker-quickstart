
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getCurrentUser } from '@/lib/supabase';

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      try {
        const { data } = await getCurrentUser();
        setUser(data.user);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  // Animation settings
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', damping: 12 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        className="max-w-7xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">Your project overview and resources</p>
          </div>
          <Button asChild>
            <Link to="/">Home</Link>
          </Button>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-8">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Welcome to Your Project</CardTitle>
              <CardDescription>
                {loading ? 'Loading user information...' : 
                  user ? `Logged in as ${user.email}` : 'Not logged in'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                This dashboard will be your command center for managing your application.
                Configure your Docker containers, connect to your self-hosted Supabase,
                and manage your application all from this interface.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="mr-2">Documentation</Button>
              <Button>Configure</Button>
            </CardFooter>
          </Card>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            {
              title: "Docker Configuration",
              description: "Manage your Docker containers and services.",
              icon: "📦"
            },
            {
              title: "Supabase Connection",
              description: "Configure your self-hosted Supabase instance.",
              icon: "🔄"
            },
            {
              title: "Application Settings",
              description: "Customize your application settings and behavior.",
              icon: "⚙️"
            }
          ].map((item, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full glass-card hover:shadow-lg transition-all">
                <CardHeader>
                  <div className="text-4xl mb-2">{item.icon}</div>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Manage</Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
