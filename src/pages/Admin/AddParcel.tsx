import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { IErrorResponse } from "@/types";
import { useCreateParcelMutation } from "@/redux/features/parcel/parcel.api";

const formSchema = z.object({
  receiverEmail: z.string().optional(),
  receiverName: z.string().optional(),
  pickupAddress: z.string().optional(),
  receiverPhone: z.string().optional(),
  receiverAddress: z.string().optional(),
  deliveryAddress: z.string().optional(),
  requestedDeliveryDate: z.string().optional(),
  // .transform((str) => new Date(str)),
  parcelWeight: z.string().optional(),
  parcelType: z.string().optional(),
  deliveryFee: z.string().optional(),
});

export default function AddParcel() {
  const [addParcel] = useCreateParcelMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      receiverEmail: "ex@gmail.com",
      receiverName: `zakir`,
      pickupAddress: "dhaka",
      receiverPhone: "+8801",
      receiverAddress: "banani",
      deliveryAddress: `mohakhali`,
      requestedDeliveryDate: '3/3/20025',
      parcelWeight: "10",
      parcelType: "electricity",
      deliveryFee: '100'
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    const toastId = toast.loading("Creating Parcel...");

    const parcelData = {
      ...data,
      receiverEmail: data.receiverEmail,
      receiverName: data.receiverName,
      pickupAddress: data.pickupAddress,
      deliveryAddress: data.deliveryAddress,
      requestedDeliveryDate: data.requestedDeliveryDate,
      parcelWeight: data.parcelWeight,
      parcelType: data.parcelType,
      deliveryFee: data.deliveryFee,
    };

    // const formData = new FormData();

    // formData.append('data', JSON.stringify(parcelData));

    try {
      const res = await addParcel(parcelData).unwrap();

      if(res.success){
        toast.success('Parcel Created', { id: toastId });
        form.reset()
      }else{
        toast.error('Something went wrong', { id: toastId })
      }
    } catch (err: unknown) {
      console.log(err);
      toast.error((err as IErrorResponse).message || 'Something went wrong', { id: toastId })
    }
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Create Parcel</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>

        <CardContent >
          <Form {...form}>
            <form id="add-parcel-form" className="space-y-4"
            onSubmit={form.handleSubmit(handleSubmit)}
            >
              <FormField  name="receiverEmail" 
              render={({ field }) =>(
                <FormItem>
                <FormLabel>receiverEmail</FormLabel>
                <FormControl>
                  <Input {...field}/>
                </FormControl>
                <FormMessage/>
              </FormItem>
              )}
              />
              <FormField  name="receiverName" 
              render={({ field }) =>(
                <FormItem>
                <FormLabel>receiverName</FormLabel>
                <FormControl>
                  <Input {...field}/>
                </FormControl>
                <FormMessage/>
              </FormItem>
              )}
              />
              <FormField  name="pickupAddress" 
              render={({ field }) =>(
                <FormItem>
                <FormLabel>pickupAddress</FormLabel>
                <FormControl>
                  <Input {...field}/>
                </FormControl>
                <FormMessage/>
              </FormItem>
              )}
              />
              <FormField  name="receiverPhone" 
              render={({ field }) =>(
                <FormItem>
                <FormLabel>receiverPhone</FormLabel>
                <FormControl>
                  <Input {...field}/>
                </FormControl>
                <FormMessage/>
              </FormItem>
              )}
              />
              <FormField  name="receiverAddress" 
              render={({ field }) =>(
                <FormItem>
                <FormLabel>receiverAddress</FormLabel>
                <FormControl>
                  <Input {...field}/>
                </FormControl>
                <FormMessage/>
              </FormItem>
              )}
              />
              <FormField  name="deliveryAddress" 
              render={({ field }) =>(
                <FormItem>
                <FormLabel>deliveryAddress</FormLabel>
                <FormControl>
                  <Input {...field}/>
                </FormControl>
                <FormMessage/>
              </FormItem>
              )}
              />
              <FormField  name="requestedDeliveryDate" 
              render={({ field }) =>(
                <FormItem>
                <FormLabel>requestedDeliveryDate</FormLabel>
                <FormControl>
                  <Input {...field}/>
                </FormControl>
                <FormMessage/>
              </FormItem>
              )}
              />
              <FormField  name="parcelWeight" 
              render={({ field }) =>(
                <FormItem>
                <FormLabel>parcelWeight</FormLabel>
                <FormControl>
                  <Input {...field}/>
                </FormControl>
                <FormMessage/>
              </FormItem>
              )}
              />
              <FormField  name="parcelType" 
              render={({ field }) =>(
                <FormItem>
                <FormLabel>parcelType</FormLabel>
                <FormControl>
                  <Input {...field}/>
                </FormControl>
                <FormMessage/>
              </FormItem>
              )}
              />
              <FormField  name="deliveryFee" 
              render={({ field }) =>(
                <FormItem>
                <FormLabel>deliveryFee</FormLabel>
                <FormControl>
                  <Input {...field}/>
                </FormControl>
                <FormMessage/>
              </FormItem>
              )}
              />
              
              
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <Button type="submit" form="add-parcel-form">
                Create Parcel
              </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
