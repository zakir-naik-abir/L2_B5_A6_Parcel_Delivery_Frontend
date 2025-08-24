import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export default function ParcelTrackingForm() {
  const [trackingId, setTrackingId] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedId = trackingId.trim();

    if (!trimmedId) {
      toast.error("Please enter a tracking ID before searching.");
      return;
    }
    
    // Navigate to the dynamic tracking page
    navigate(`/track/${trimmedId}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-lg"
    >
      <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
        <Input
          type="text"
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
          placeholder="Enter Your Tracking ID..."
          className="flex-1 h-12 text-base" // Making the input a bit larger
        />
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button type="submit" size="lg" className="h-12">
            <Search className="h-5 w-5 mr-2" />
            Track
          </Button>
        </motion.div>
      </form>
    </motion.div>
  );
}