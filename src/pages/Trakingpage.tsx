// src/pages/public/TrackingPage.tsx
import { useParams } from 'react-router-dom';
import { useTrackParcelQuery } from '@/api/parcelApiSlice';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { motion } from "framer-motion";
import { AlertCircle, PackageCheck, Truck, Package, CheckCircle2 } from 'lucide-react';

// Helper to get an icon and color for each status
const getStatusDetails = (status: string) => {
    const s = status.toLowerCase();
    if (s.includes('delivered')) return { Icon: PackageCheck, color: 'text-green-500' };
    if (s.includes('transit') || s.includes('picked_up') || s.includes('dispatched')) return { Icon: Truck, color: 'text-blue-500' };
    if (s.includes('pending') || s.includes('requested') || s.includes('assigned')) return { Icon: Package, color: 'text-yellow-500' };
    return { Icon: CheckCircle2, color: 'text-gray-500' };
};

export default function TrackingPage() {
  const { trackingId } = useParams<{ trackingId: string }>();
  // The `skip` option prevents the query from running if trackingId is not yet available
  const { data: parcel, isLoading, isError } = useTrackParcelQuery(trackingId!, { skip: !trackingId });

  const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } } };

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 md:p-8 max-w-3xl">
        <Skeleton className="h-10 w-3/4 mb-2" />
        <Skeleton className="h-6 w-1/2 mb-8" />
        <Card>
          <CardHeader><Skeleton className="h-8 w-1/2" /></CardHeader>
          <CardContent className="space-y-6">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isError || !parcel) {
    return (
      <div className="container mx-auto p-4 md:p-8 max-w-3xl">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Parcel Not Found</AlertTitle>
          <AlertDescription>
            The tracking ID "{trackingId}" does not match any of our records. Please check the ID and try again.
          </AlertDescription>
        </Alert>
      </div>
    );
  }
  
  return (
    <motion.div 
      className="container mx-auto p-4 md:p-8 max-w-3xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1 variants={itemVariants} className="text-2xl md:text-3xl font-bold tracking-tight">Tracking Details</motion.h1>
      <motion.p variants={itemVariants} className="text-muted-foreground mb-6 font-mono">{parcel.trackingId}</motion.p>
      
      <Card>
        <CardHeader>
          <CardTitle>Current Status</CardTitle>
          <CardDescription>
            Your parcel from <strong>{parcel.sender.name}</strong> to <strong>{parcel.receiverName}</strong> is currently:
          </CardDescription>
          <Badge className="text-base mt-2 w-fit" variant="outline">{parcel.status.replace(/_/g, ' ')}</Badge>
        </CardHeader>
        <CardContent>
          <h3 className="font-semibold mb-4">Journey History</h3>
          <motion.div 
            className="relative pl-8 space-y-8 border-l-2 border-dashed"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {parcel.statusLogs.map((log, index) => {
              const { Icon, color } = getStatusDetails(log.status);
              return (
                <motion.div key={index} className="relative" variants={itemVariants}>
                  <div className={`absolute -left-[2.3rem] top-1 h-10 w-10 rounded-full bg-background flex items-center justify-center`}>
                    <div className={`h-8 w-8 rounded-full bg-muted flex items-center justify-center ${color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <p className="font-semibold capitalize">{log.status.replace(/_/g, ' ')}</p>
                  <p className="text-sm text-muted-foreground">{new Date(log.timestamp).toLocaleString()}</p>
                  {log.note && <p className="text-sm italic mt-1">"{log.note}"</p>}
                </motion.div>
              );
            })}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}