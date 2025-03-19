
import { useEffect } from 'react';
import { LoginForm } from '@/components/ui/LoginForm';
import { Pill, ShieldCheck, Heart, Activity, Scan } from 'lucide-react';
import { motion } from 'framer-motion';

const Index = () => {
  useEffect(() => {
    document.title = 'PharmAdmin - Modern Pharmacy Management System';
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="w-full py-4 px-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
            <Pill className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-display font-semibold">PharmAdmin</span>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col-reverse lg:flex-row items-center justify-center px-6 pb-12 pt-6 lg:pt-0 lg:px-16 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full lg:w-1/2 max-w-md mx-auto lg:mx-0 mt-12 lg:mt-0"
        >
          <LoginForm />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full lg:w-1/2 lg:pl-12 space-y-6 text-center lg:text-left"
        >
          <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2">
            Pharmacy Management System
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight text-gray-900">
            Manage your pharmacy with precision
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto lg:mx-0">
            A powerful, intuitive dashboard for modern pharmacies. Streamline inventory, sales, and staff management in one unified platform.
          </p>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="pt-4 grid grid-cols-2 gap-4 max-w-lg mx-auto lg:mx-0"
          >
            {[
              { icon: ShieldCheck, title: "Secure Access", description: "Role-based access control" },
              { icon: Scan, title: "Inventory Management", description: "Track medicine stock in real-time" },
              { icon: Activity, title: "Sales Analytics", description: "Comprehensive reporting tools" },
              { icon: Heart, title: "Patient Care", description: "Customer management system" },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                className="flex flex-col items-center lg:items-start p-4 rounded-lg border bg-white shadow-sm"
              >
                <div className="p-2 rounded-md bg-primary/10 text-primary mb-3">
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display font-medium text-gray-900">{feature.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default Index;
