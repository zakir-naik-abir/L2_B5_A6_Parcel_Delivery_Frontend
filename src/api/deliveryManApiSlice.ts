
import { baseApi } from "@/redux/baseApi";

export const deliveryManApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Query to get parcels assigned to the logged-in delivery man
    getAssignedParcels: builder.query<any[], void>({
      query: () => '/parcels/deliveryman',
      providesTags: ['PARCEL'], // Tagging helps in automatic refetching
    }),

    // Mutation to update a parcel's status
    updateParcelStatusByDeliveryMan: builder.mutation<void, { parcelId: string; status: 'picked_up' | 'delivered' }>({
      query: ({ parcelId, status }) => ({
        url: `/parcels/deliveryman/${parcelId}/status`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: ['PARCEL'], // When status is updated, refetch the parcel list
    }),
  }),
});

export const {
  useGetAssignedParcelsQuery,
  useUpdateParcelStatusByDeliveryManMutation,
} = deliveryManApiSlice;