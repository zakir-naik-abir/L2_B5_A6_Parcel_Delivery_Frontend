// import { useGetAllParcelQuery } from "@/redux/features/parcel/parcel.api";

// export default function AllParcel() {
//     const {data} = useGetAllParcelQuery({});
// console.log(data)
//   return (
//     <div>
//       <h1>All Parcel : {data?.length}</h1>
//       <div>{data?.map((item) => (
// <div key={item._id}>
// <h1>{item.parcelType}</h1>
// </div>
//       ))}</div>
//     </div>
//   )
// }



import { useState, useMemo, useEffect } from 'react';
// Correct the import path for your specific hook
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AlertDialog,} from "@/components/ui/alert-dialog";
import { Dialog, } from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { MoreHorizontal, Truck, XCircle, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useGetAllParcelQuery } from '@/redux/features/parcel/parcel.api';


const PAGE_LIMIT = 10;

// Debounce hook for smooth search experience
function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

// Helper to determine badge color based on status
const getStatusVariant = (status: string) => {
    switch (status?.toLowerCase()) {
        case 'delivered': return 'success';
        case 'cancelled': return 'destructive';
        case 'pending':
        case 'requested': return 'warning';
        default: return 'default';
    }
};

export default function AllParcelsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // NOTE: Replace 'useGetAllUsersQuery' with your 'useGetAllParcelQuery' hook
  const { data: response, isLoading, isError, isFetching } = useGetAllParcelQuery({
    page: currentPage,
    limit: PAGE_LIMIT,
    searchTerm: debouncedSearchTerm,
  });

  const { data: deliveryMen } = useGetAvailableDeliveryMenQuery(); // Assuming you have this hook
  const [assignDeliveryMan, { isLoading: isAssigning }] = useAssignDeliveryManMutation(); // Assuming you have this hook
  const [cancelParcel, { isLoading: isCancelling }] = useCancelParcelByAdminMutation(); // Assuming you have this hook
  
  const [assignModal, setAssignModal] = useState({ isOpen: false, parcel: null as any });
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, action: () => {}, title: "", description: "" });
  const [selectedDeliveryMan, setSelectedDeliveryMan] = useState("");

  const { parcels, meta } = useMemo(() => ({
    parcels: response?.data || [],
    meta: response?.meta,
  }), [response]);
  const totalPages = meta ? Math.ceil(meta.total / meta.limit) : 0;

  const handleAssignSubmit = async () => { /* ... Functionality from previous example ... */ };
  const handleCancel = (parcel: any) => { /* ... Functionality from previous example ... */ };

  return (
    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle className="text-2xl">All Parcels</CardTitle>
              <CardDescription>View, assign, and manage all parcels in the system.</CardDescription>
            </div>
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search parcels..."
                className="pl-8 w-full md:w-[250px] lg:w-[300px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tracking ID</TableHead>
                  <TableHead>Sender</TableHead>
                  <TableHead>Receiver</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <AnimatePresence>
                <TableBody>
                  {(isLoading || isFetching) ? (
                    Array.from({ length: PAGE_LIMIT }).map((_, i) => (
                      <TableRow key={`skeleton-${i}`}>
                        <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                        <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                        <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                        <TableCell><Skeleton className="h-6 w-24 rounded-full" /></TableCell>
                        <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                        <TableCell className="text-right"><Skeleton className="h-8 w-8 ml-auto" /></TableCell>
                      </TableRow>
                    ))
                  ) : isError ? (
                    <TableRow><TableCell colSpan={6} className="h-48 text-center text-destructive">Failed to load parcels.</TableCell></TableRow>
                  ) : parcels.length === 0 ? (
                    <TableRow><TableCell colSpan={6} className="h-48 text-center text-muted-foreground">No parcels found.</TableCell></TableRow>
                  ) : (
                    parcels.map((parcel) => (
                      <motion.tr key={parcel._id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <TableCell className="font-mono">{parcel.trackingId || 'N/A'}</TableCell>
                        <TableCell>{parcel.sender?.name || 'Unknown Sender'}</TableCell>
                        <TableCell>{parcel.receiverName}</TableCell>
                        <TableCell><Badge variant={getStatusVariant(parcel.status) as any}>{parcel.status?.replace('_', ' ')}</Badge></TableCell>
                        <TableCell>{parcel.deliveryMan?.name || <span className="text-xs text-muted-foreground">Not Assigned</span>}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              {parcel.status === 'pending' && <DropdownMenuItem onClick={() => setAssignModal({ isOpen: true, parcel })}><Truck className="mr-2 h-4 w-4" /> Assign Delivery Man</DropdownMenuItem>}
                              {['pending', 'assigned'].includes(parcel.status) && <DropdownMenuItem className="text-destructive" onClick={() => handleCancel(parcel)}><XCircle className="mr-2 h-4 w-4" /> Cancel Parcel</DropdownMenuItem>}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </motion.tr>
                    ))
                  )}
                </TableBody>
              </AnimatePresence>
            </Table>
          </div>
        </CardContent>
        {totalPages > 1 && (
          <CardFooter className="flex items-center justify-between">
            {/* Pagination Controls from the previous ManageUsersPage example */}
          </CardFooter>
        )}
      </Card>
      
      {/* Assign Delivery Man Dialog (Modal) */}
      <Dialog open={assignModal.isOpen} onOpenChange={() => setAssignModal({ isOpen: false, parcel: null })}>
        {/* ... Dialog content from the previous example ... */}
      </Dialog>

      {/* Confirmation Dialog for Cancel */}
      <AlertDialog open={confirmModal.isOpen} onOpenChange={() => setConfirmModal({ ...confirmModal, isOpen: false })}>
        {/* ... AlertDialog content from the previous example ... */}
      </AlertDialog>
    </motion.div>
  );
}