/* eslint-disable @typescript-eslint/no-explicit-any */
// src/pages/delivery-man/MyTasksPage.tsx
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { MapPin, Phone, Truck, Check, PackageOpen } from "lucide-react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useGetAssignedParcelsQuery, useUpdateParcelStatusByDeliveryManMutation } from "@/api/deliveryManApiSlice";

export default function MyTasksPage() {
  const { data: parcels, isLoading, error } = useGetAssignedParcelsQuery();
  const [updateStatus, { isLoading: isUpdating }] = useUpdateParcelStatusByDeliveryManMutation();

  const handleStatusUpdate = async (parcelId: string, status: 'picked_up' | 'delivered') => {
    try {
      await updateStatus({ parcelId, status }).unwrap();
      toast.success(`Parcel marked as ${status.replace('_', ' ')}!`);
    } catch (err: any) {
      toast.error(err.data?.message || 'Failed to update status.');
    }
  };

  const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } };

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
      <motion.h1 variants={itemVariants} className="text-3xl font-bold mb-6">My Delivery Tasks</motion.h1>
      
      {isLoading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i}><CardHeader><Skeleton className="h-6 w-3/4" /></CardHeader><CardContent><Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-1/2 mt-2" /></CardContent><CardFooter><Skeleton className="h-10 w-full" /></CardFooter></Card>
          ))}
        </div>
      ) : error ? (
        <Alert variant="destructive"><AlertTitle>Error!</AlertTitle><AlertDescription>Failed to load tasks. Please try again later.</AlertDescription></Alert>
      ) : parcels?.length === 0 ? (
        <motion.div variants={itemVariants} className="text-center py-20 bg-muted/50 rounded-lg">
          <PackageOpen className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">No pending tasks!</h3>
          <p className="mt-1 text-sm text-muted-foreground">You are all caught up. New tasks will appear here.</p>
        </motion.div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {parcels?.map((parcel) => (
            <motion.div key={parcel._id} variants={itemVariants}>
              <Card className="flex flex-col h-full">
                <CardHeader>
                  <CardTitle>{parcel.receiverName}</CardTitle>
                  <CardDescription>Status: <span className="font-semibold text-primary">{parcel.status.replace('_', ' ')}</span></CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="flex items-start gap-2 text-sm text-muted-foreground"><MapPin className="h-4 w-4 mt-1 shrink-0" /> <p>{parcel.receiverAddress}</p></div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2"><Phone className="h-4 w-4 shrink-0" /> <p>{parcel.receiverPhone}</p></div>
                </CardContent>
                <CardFooter>
                  {parcel.status === 'assigned' && (
                    <Button onClick={() => handleStatusUpdate(parcel._id, 'picked_up')} disabled={isUpdating} className="w-full">
                      <Truck className="mr-2 h-4 w-4" /> {isUpdating ? 'Updating...' : 'Mark as Picked Up'}
                    </Button>
                  )}
                  {parcel.status === 'picked_up' && (
                    <Button onClick={() => handleStatusUpdate(parcel._id, 'delivered')} disabled={isUpdating} className="w-full">
                      <Check className="mr-2 h-4 w-4" /> {isUpdating ? 'Updating...' : 'Mark as Delivered'}
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}