'use client'; 

import React from 'react';
import { motion } from 'framer-motion';
import {
  Target,
  Eye,
  Zap,
  ThumbsUp,
  Shield,
  ArrowRight,
} from 'lucide-react';

import { Button } from '@/components/ui/button'; 
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; 

const AboutPage: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative text-center overflow-hidden bg-primary/5 dark:bg-primary/10 py-24 sm:py-32"
      >
        <div className="container mx-auto px-6">
          <motion.h1
            variants={itemVariants}
            className="text-4xl font-extrabold tracking-tight sm:text-6xl text-primary"
          >
            About Easy Parcel BD
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="mt-6 text-lg leading-8 text-muted-foreground max-w-3xl mx-auto"
          >
            Your Trusted Delivery Partner for Fast, Secure, and Hassle-free Shipping Across Bangladesh.
          </motion.p>
        </div>
      </motion.div>

      {/* Mission & Vision Section */}
      <div className="py-24 sm:py-32">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
            className="space-y-8"
          >
            <motion.h2 variants={itemVariants} className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Our Mission & Vision
            </motion.h2>
            <motion.p variants={itemVariants} className="text-muted-foreground">
              At Easy Parcel BD, our mission is to revolutionize the logistics industry in Bangladesh. We aim to provide a seamless, tech-driven delivery experience that empowers businesses and connects individuals.
            </motion.p>
            <motion.div variants={itemVariants} className="flex items-start gap-4">
              <Target className="text-primary h-8 w-8 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg">Our Mission</h3>
                <p className="text-muted-foreground">To offer the fastest and most dependable parcel delivery service, ensuring customer satisfaction at every step.</p>
              </div>
            </motion.div>
            <motion.div variants={itemVariants} className="flex items-start gap-4">
              <Eye className="text-primary h-8 w-8 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg">Our Vision</h3>
                <p className="text-muted-foreground">To become the leading logistics network in Bangladesh, celebrated for our innovation and customer-centric approach.</p>
              </div>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img src="https://internationaltransportagency.com/wp-content/uploads/2025/01/istockphoto-1474043686-612x612-2.jpg" alt="Our Team" className="rounded-xl shadow-2xl" />
          </motion.div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-secondary/50 py-24 sm:py-32">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            <motion.h2 variants={itemVariants} className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Why Choose Us?
            </motion.h2>
            <motion.p variants={itemVariants} className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              We are not just a courier service; we are your growth partner. We provide solutions that make logistics easy for you.
            </motion.p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { icon: Zap, title: "Lightning Fast Delivery", description: "Optimized routes ensure your parcels reach their destination in the shortest possible time." },
              { icon: ThumbsUp, title: "Unmatched Reliability", description: "With real-time tracking and dedicated support, you can always count on us." },
              { icon: Shield, title: "Secure Handling", description: "Every parcel is treated with the utmost care, guaranteeing security from pickup to delivery." },
            ].map((feature, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="text-center h-full">
                  <CardHeader>
                    <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full w-fit">
                      <feature.icon className="h-8 w-8" />
                    </div>
                    <CardTitle className="pt-4">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      
      {/* Call to Action (CTA) Section */}
      <div className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-6 py-16 sm:py-24 text-center">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Ready to Ship with Ease?
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 max-w-2xl mx-auto"
          >
            Join thousands who trust Easy Parcel BD for their delivery needs.
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8"
          >
            <Button size="lg" variant="secondary" className="group">
              Create an Account
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;