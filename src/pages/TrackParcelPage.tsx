
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import ParcelTrackingForm from '@/components/shared/ParcelTrackingForm';


export default function TrackParcelPage() {
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <>
      {/* Hero Section */}
      <motion.section
        className="container flex flex-col items-center justify-center text-center py-20 md:py-32 min-h-[calc(100vh-8rem)]"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          Swift, Secure, Seamless.
        </motion.h1>
        <motion.p variants={itemVariants} className="max-w-[700px] text-muted-foreground md:text-xl my-6">
          Track your parcel's journey in real-time. Enter your tracking ID below to get instant updates.
        </motion.p>
        
        {/* Here we use our new form component */}
        <motion.div variants={itemVariants} className="w-full flex justify-center">
            <ParcelTrackingForm />
        </motion.div>

        <motion.div variants={itemVariants} className="flex gap-4 mt-8">
          <Button size="lg">Create a Shipment</Button>
          <Button size="lg" variant="outline">Learn More</Button>
        </motion.div>
      </motion.section>
      
      {/* ... Your other sections like Features, etc. ... */}
    </>
  );
}