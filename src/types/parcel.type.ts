
export type IParcelStatus = "Requested" | "Approved" | "Dispatched" | "In-Transit" | "Delivered" | "Cancelled" | "Confirmed";


export type IParcelPackage = {
    _id: string;
  sender: string;
  receiverName: string;
  receiverPhone: string;
  requestedDeliveryDate: string; 
   receiverAddress: string;
   deliveryAddress: string;
   parcelWeight: number;
   parcelType: string;
   deliveryFee?: number;
   trackingId: string;
   status: IParcelStatus;
   createdAt: string
   updatedAt: string;
};