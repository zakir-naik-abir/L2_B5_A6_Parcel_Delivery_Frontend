import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { MoreHorizontal, Trash2, UserX, UserCheck, AlertCircle, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { useDeleteUserMutation, useGetAllUserQuery, useUpdateUserMutation } from '@/redux/features/user/user.api';

// Define the User type for strict type safety
interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  isBlocked: boolean;
}

const PAGE_LIMIT = 100; // Adjust users per page as needed

export default function ManageUsersPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [dialogState, setDialogState] = useState({ isOpen: false, data: null as User | null, type: '' });

  // Fetching data with pagination parameters
  const { data: response, isLoading, isError, isFetching } = useGetAllUserQuery({
    page: currentPage,
    limit: PAGE_LIMIT,
  });

  const [updateUserStatus, { isLoading: isUpdatingStatus }] = useUpdateUserMutation();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  // Memoize users and metadata to prevent unnecessary recalculations
  const { users, meta } = useMemo(() => ({
    users: response || [],
    meta: response?.meta,
  }), [response]);

  const totalPages = meta ? Math.ceil(meta.total / meta.limit) : 0;

  // --- Action Handlers ---

  const openConfirmationDialog = (user: User, type: 'status' | 'delete') => {
    setDialogState({ isOpen: true, data: user, type });
  };

  const handleConfirmAction = async () => {
    if (!dialogState.data || !dialogState.type) return;

    const user = dialogState.data;
    const toastId = toast.loading("Processing request...");

    try {
      if (dialogState.type === 'status') {
        await updateUserStatus({ userId: user._id, isBlocked: !user.isBlocked }).unwrap();
        toast.success(`User "${user.name}" has been ${user.isBlocked ? 'unblocked' : 'blocked'}.`, { id: toastId });
      } else if (dialogState.type === 'delete') {
        await deleteUser(user._id).unwrap();
        toast.success(`User "${user.name}" has been deleted.`, { id: toastId });
      }
    } catch (err) {
      toast.error("An error occurred. Please try again.", { id: toastId });
    } finally {
      setDialogState({ isOpen: false, data: null, type: '' });
    }
  };

  // --- UI Component for different states ---

  const renderTableContent = () => {
    if (isLoading || isFetching) {
      return Array.from({ length: PAGE_LIMIT }).map((_, i) => (
        <TableRow key={`skeleton-${i}`}>
          <TableCell><Skeleton className="h-5 w-32" /></TableCell>
          <TableCell className="hidden md:table-cell"><Skeleton className="h-5 w-48" /></TableCell>
          <TableCell><Skeleton className="h-6 w-20 rounded-md" /></TableCell>
          <TableCell><Skeleton className="h-6 w-24 rounded-full" /></TableCell>
          <TableCell className="text-right"><Skeleton className="h-8 w-8 ml-auto rounded-md" /></TableCell>
        </TableRow>
      ));
    }

    if (isError) {
      return (
        <TableRow>
          <TableCell colSpan={5} className="text-center h-48">
            <div className="flex flex-col items-center justify-center gap-2 text-destructive">
              <AlertCircle className="h-8 w-8" />
              <p className="font-semibold">Failed to load users</p>
              <p className="text-sm">Please check your connection and try again.</p>
            </div>
          </TableCell>
        </TableRow>
      );
    }

    if (users.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={5} className="text-center h-48">
             <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
              <Users className="h-8 w-8" />
              <p className="font-semibold">No users found</p>
              <p className="text-sm">There are no users to display at the moment.</p>
            </div>
          </TableCell>
        </TableRow>
      );
    }

    return users.map((user) => (
      <motion.tr
        key={user._id}
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <TableCell className="font-medium">{user.name}</TableCell>
        <TableCell className="hidden md:table-cell text-muted-foreground">{user.email}</TableCell>
        <TableCell><Badge variant="outline">{user.role}</Badge></TableCell>
        <TableCell>
          <Badge variant={user.isBlocked ? "destructive" : "success"}>
            {user.isBlocked ? "Blocked" : "Active"}
          </Badge>
        </TableCell>
        <TableCell className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild><Button variant="ghost" className="h-8 w-8 p-0"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => openConfirmationDialog(user, 'status')}>
                {user.isBlocked ? <UserCheck className="mr-2 h-4 w-4" /> : <UserX className="mr-2 h-4 w-4" />}
                <span>{user.isBlocked ? "Unblock" : "Block"}</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-500 focus:text-red-500 focus:bg-red-50" onClick={() => openConfirmationDialog(user, 'delete')}>
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </motion.tr>
    ));
  };

  const isActionLoading = isUpdatingStatus || isDeleting;

  return (
    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, ease: "easeInOut" }}>
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>
            {meta ? `Manage all ${meta.total} users in the system.` : 'Loading user data...'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden md:table-cell">Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <AnimatePresence>
                <TableBody>
                  {renderTableContent()}
                </TableBody>
              </AnimatePresence>
            </Table>
          </div>
        </CardContent>
        {totalPages > 1 && (
          <CardFooter className="flex items-center justify-between flex-wrap gap-4">
            <div className="text-xs text-muted-foreground">
              Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
            </div>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(p => Math.max(1, p - 1)); }} className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''} />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(p => Math.min(totalPages, p + 1)); }} className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''} />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </CardFooter>
        )}
      </Card>

      <AlertDialog open={dialogState.isOpen} onOpenChange={(open) => setDialogState({ ...dialogState, isOpen: open })}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {dialogState.type === 'status' ? `${dialogState.data?.isBlocked ? 'Unblock' : 'Block'} User` : 'Delete User'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {dialogState.type === 'status'
                ? `Are you sure you want to ${dialogState.data?.isBlocked ? 'unblock' : 'block'} the user "${dialogState.data?.name}"?`
                : `This will permanently delete "${dialogState.data?.name}". This action cannot be undone.`
              }
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmAction} disabled={isActionLoading}>
              {isActionLoading ? 'Processing...' : 'Confirm'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
}