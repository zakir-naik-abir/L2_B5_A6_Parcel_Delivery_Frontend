
export type IParcelStatus = "Requested" | "Approved" | "Dispatched" | "In-Transit" | "Delivered" | "Cancelled" | "Confirmed";


export type IParcelPackage = {
   _id: string;
   receiverName: string;
   receiverPhone: string;
   receiverAddress: string;
   deliveryAddress: string;
   requestedDeliveryDate: Date;
   parcelWeight: number;
   parcelType: string;
   deliveryFee: number;
   trackingId: string;
   status: IParcelStatus;
   createdAt: string
   updatedAt: string;
};