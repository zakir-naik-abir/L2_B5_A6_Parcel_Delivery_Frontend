
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Loader2, PackagePlus } from "lucide-react";
import { useCreateParcelMutation } from "@/redux/features/parcel/parcel.api";
import { useNavigate } from "react-router";

// Updated Zod schema based on your IParcel interface
const formSchema = z.object({
  receiverName: z.string().min(2, "Name must be at least 2 characters."),
  receiverPhone: z.string().min(11, "Please enter a valid 11-digit phone number."),
  deliveryAddress: z.string().min(10, "Please provide a detailed delivery address."),
  requestedDeliveryDate: z.string().refine((date) => !isNaN(Date.parse(date)), { message: "Invalid date format." }),
  parcelWeight: z.coerce.number().positive("Weight must be a positive number."),
  parcelType: z.string().min(3, "Please specify a parcel type."),
  deliveryFee: z.coerce.number().positive("Delivery fee must be a positive number.").optional(),
});

export default function CreateParcelPage() {
  const [createParcel, { isLoading }] = useCreateParcelMutation();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      receiverName: "",
      receiverPhone: "",
      deliveryAddress: "",
      requestedDeliveryDate: "",
      parcelWeight: undefined,
      parcelType: "",
      deliveryFee: undefined,
    },
  });

  const onSubmit = async(values: z.infer<typeof formSchema>) =>{
    const toastId = toast.loading("Booking your parcel...");
    try {
      // The `values` object is already in the correct shape
      await createParcel(values).unwrap();
      toast.success("Parcel booked successfully!", { id: toastId
       
       });
      form.reset();
       navigate("/dashboard/my-parcel")
    } catch (err: any) {
      toast.error(err.data?.message || "Something went wrong.", { id: toastId });
    }
  }

  const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
  const itemVariants = { hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2"><PackagePlus /> Book a New Parcel</CardTitle>
          <CardDescription>Provide the necessary details to schedule a new delivery.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <motion.form 
              onSubmit={form.handleSubmit(onSubmit)} 
              className="space-y-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-6">
                <FormField control={form.control} name="receiverName" render={({ field }) => ( <FormItem><FormLabel>Receiver's Name</FormLabel><FormControl><Input placeholder="e.g., Jane Doe" {...field} /></FormControl><FormMessage /></FormItem> )} />
                <FormField control={form.control} name="receiverPhone" render={({ field }) => ( <FormItem><FormLabel>Receiver's Phone</FormLabel><FormControl><Input placeholder="e.g., 01712345678" {...field} /></FormControl><FormMessage /></FormItem> )} />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <FormField control={form.control} name="deliveryAddress" render={({ field }) => ( <FormItem><FormLabel>Delivery Address</FormLabel><FormControl><Textarea placeholder="House, Road, Area, City" {...field} /></FormControl><FormMessage /></FormItem> )} />
              </motion.div>

              <motion.div variants={itemVariants} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <FormField control={form.control} name="parcelType" render={({ field }) => ( <FormItem><FormLabel>Parcel Type</FormLabel><FormControl><Input placeholder="e.g., Electronics, Documents" {...field} /></FormControl><FormMessage /></FormItem> )} />
                <FormField control={form.control} name="parcelWeight" render={({ field }) => ( <FormItem><FormLabel>Weight (kg)</FormLabel><FormControl><Input type="number" step="0.1" placeholder="e.g., 1.5" {...field} /></FormControl><FormMessage /></FormItem> )} />
                <FormField control={form.control} name="deliveryFee" render={({ field }) => ( <FormItem><FormLabel>Delivery Fee (BDT)</FormLabel><FormControl><Input type="number" placeholder="e.g., 120" {...field} /></FormControl><FormMessage /></FormItem> )} />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <FormField control={form.control} name="requestedDeliveryDate" render={({ field }) => ( <FormItem><FormLabel>Requested Delivery Date</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem> )} />
              </motion.div>

              <motion.div variants={itemVariants} className="pt-4">
                <Button type="submit" disabled={isLoading} size="lg">
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isLoading ? "Submitting..." : "Confirm & Book Parcel"}
                </Button>
              </motion.div>
            </motion.form>
          </Form>
        </CardContent>
      </Card>
    </motion.div>
  );
}