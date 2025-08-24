
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Rocket, ShieldCheck, Truck } from 'lucide-react';

// Framer Motion Variants for animations
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

const features = [
    { icon: <Rocket className="h-8 w-8 text-primary" />, title: "Blazing Fast Delivery", description: "Get your parcels delivered faster than ever before." },
    { icon: <ShieldCheck className="h-8 w-8 text-primary" />, title: "Secure & Reliable", description: "Your parcels are safe with our end-to-end tracking and security." },
    { icon: <Truck className="h-8 w-8 text-primary" />, title: "Nationwide Coverage", description: "We deliver to every corner of the country, no matter how remote." },
];

const HomePage = () => {
  return (
    <>
      {/* Hero Section */}
      <motion.section
        className="container flex flex-col items-center justify-center text-center py-20 md:py-32"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl font-bold tracking-tighter">
          The Future of Parcel Delivery is Here.
        </motion.h1>
        <motion.p variants={itemVariants} className="max-w-[700px] text-muted-foreground md:text-xl my-6">
          ParcelFlow offers a seamless, secure, and swift delivery experience. Join us and revolutionize the way you send and receive parcels.
        </motion.p>
        <motion.div variants={itemVariants} className="flex gap-4">
          <Button size="lg">Get Started</Button>
          <Button size="lg" variant="outline">Track Parcel</Button>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <section className="bg-muted py-20">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose ParcelFlow?</h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible" // Animate when this section is in view
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            {features.map((feature, i) => (
              <motion.div key={i} variants={itemVariants}>
                <Card className="h-full text-center">
                  <CardHeader>
                    <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4">{feature.icon}</div>
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default HomePage;