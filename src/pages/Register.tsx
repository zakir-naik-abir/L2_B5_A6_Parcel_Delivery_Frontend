
import { motion, AnimatePresence } from 'framer-motion';
import { Chrome } from 'lucide-react';
import deliveryImage from '/logo.jpg'; 
import LoginForm from '@/components/form/LoginForm';
import RegisterForm from '@/components/form/RegisterForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import config from '@/config/env';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export const Register: React.FC = () => {
  const [isLoginView, setIsLoginView] = useState(true);

  const toggleView = () => {
    setIsLoginView(!isLoginView);
  };

  const formVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.3, ease: 'easeIn' } },
  };

  return (
    <div className={cn('min-h-screen bg-blue-200 flex flex-col lg:flex-row overflow-hidden')}>
      {/* বাম প্যানেল: Image */}
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12 bg-primary text-primary-foreground"
      >
        <div className="text-center">
          <motion.img
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            src={deliveryImage}
            alt="Parcel Delivery"
            className="max-w-xs mx-auto lg:max-w-sm rounded-2xl shadow-lg"
          />
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="mt-8 text-4xl font-bold"
          >
            Easy Parcel BD
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-2 text-lg text-primary-foreground/80"
          >
            আপনার পার্সেল ডেলিভারি এখন আরও সহজ ও দ্রুত।
          </motion.p>
        </div>
      </motion.div>

      {/* Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="w-full">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-primary border-b pb-4 border-gray-500">
                {isLoginView ? 'Login to Your Account' : 'Create an Account'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* AnimatePresence */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={isLoginView ? 'login' : 'register'}
                  variants={formVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  {isLoginView ? <LoginForm /> : <RegisterForm />}
                </motion.div>
              </AnimatePresence>

              <div className="py-2 relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-card px-2 text-muted-foreground">
                  Or continue
                </span>
              </div>

              <Button
                onClick={() => window.open(`${config.baseUrl}/auth/google`, '_self')}
                variant="outline"
                className="w-full bg-blue-100 hover:bg-blue-400"
              >
                <Chrome className="mr-2 h-4 w-4 " />
                Continue with Google
              </Button>

              <p className="mt-6 text-center text-sm text-muted-foreground">
                {isLoginView ? "Don't have an account?" : 'Already have an account?'}
                <motion.span
                  onClick={toggleView}
                  className="ml-2 font-bold text-primary hover:underline cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isLoginView ? 'Register' : 'Login'}
                </motion.span>
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};