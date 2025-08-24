
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, Phone, Mail, Share2, User, Edit3, Send,
  Facebook, Twitter, Instagram, Youtube 
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    alert('Thank you! Your message has been sent.');
    setFormData({ name: '', email: '', message: '' });
  };

  const FADE_UP_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 20 } },
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial="hidden"
        animate="show"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
        className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 shadow-2xl rounded-xl overflow-hidden"
      >
        {/* Contact Information */}
        <div className="bg-card p-8 md:p-12 text-card-foreground">
          <motion.h1 variants={FADE_UP_ANIMATION_VARIANTS} className="text-4xl font-bold text-primary">
            Contact Us
          </motion.h1>
          <motion.p variants={FADE_UP_ANIMATION_VARIANTS} className="mt-4 text-muted-foreground">
            Have a question or a project in mind? We'd love to hear from you. Fill out the form or use the contact details below.
          </motion.p>

          <div className="mt-12 space-y-8">
            {[
              { icon: MapPin, title: 'Location', lines: ['Bonani, 2nd block,', 'Dhaka, Bangladesh'] },
              { icon: Phone, title: 'Phone', lines: ['+88 01815-435734', '+88 01788-119167'] },
              { icon: Mail, title: 'Email', lines: ['zakrihasanabir@gmail.com', 'www.zakirhasanabir.com'] },
            ].map((item, index) => (
              <motion.div variants={FADE_UP_ANIMATION_VARIANTS} key={index} className="flex items-start gap-4">
                <div className="bg-primary/10 text-primary p-3 rounded-lg">
                  <item.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  {item.lines.map((line, i) => (
                    <p key={i} className="text-muted-foreground">{line}</p>
                  ))}
                </div>
              </motion.div>
            ))}

            <motion.div variants={FADE_UP_ANIMATION_VARIANTS} className="flex items-start gap-4">
              <div className="bg-primary/10 text-primary p-3 rounded-lg">
                <Share2 className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Social</h3>
                <div className="flex space-x-2 mt-2">
                  <Button variant="outline" size="icon" asChild>
                    <a href="#"><Facebook className="h-4 w-4" /></a>
                  </Button>
                  <Button variant="outline" size="icon" asChild>
                    <a href="#"><Twitter className="h-4 w-4" /></a>
                  </Button>
                  <Button variant="outline" size="icon" asChild>
                    <a href="#"><Instagram className="h-4 w-4" /></a>
                  </Button>
                  <Button variant="outline" size="icon" asChild>
                    <a href="#"><Youtube className="h-4 w-4" /></a>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-secondary text-gray-500 p-8 md:p-12">
          <motion.h2 variants={FADE_UP_ANIMATION_VARIANTS} className="text-3xl font-bold">Get In Touch</motion.h2>
          <motion.p variants={FADE_UP_ANIMATION_VARIANTS} className="mt-2 text-sm text-muted-foreground mb-8">
            Your email address will not be published. Required fields are marked *
          </motion.p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div variants={FADE_UP_ANIMATION_VARIANTS}>
              <Label htmlFor="name">Your Name*</Label>
              <div className="relative mt-2">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input id="name" name="name" type="text" placeholder="John Doe" value={formData.name} onChange={handleChange} required className="pl-10" />
              </div>
            </motion.div>

            <motion.div variants={FADE_UP_ANIMATION_VARIANTS}>
              <Label htmlFor="email">Email Address*</Label>
              <div className="relative mt-2">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input id="email" name="email" type="email" placeholder="john.doe@example.com" value={formData.email} onChange={handleChange} required className="pl-10" />
              </div>
            </motion.div>

            <motion.div variants={FADE_UP_ANIMATION_VARIANTS}>
              <Label htmlFor="message">Your Message*</Label>
              <div className="relative mt-2">
                <Edit3 className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <textarea id="message" name="message" placeholder="Type your message here..." rows={4} value={formData.message} onChange={handleChange} required className="pl-10" />
              </div>
            </motion.div>

            <motion.div variants={FADE_UP_ANIMATION_VARIANTS}>
              <Button type="submit" className="w-full" size="lg">
                <Send className="mr-2 h-4 w-4" />
                Send Message
              </Button>
            </motion.div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactPage;