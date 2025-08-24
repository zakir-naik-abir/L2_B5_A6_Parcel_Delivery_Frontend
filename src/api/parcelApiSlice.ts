import { baseApi } from "@/redux/baseApi";
import type { IResponse } from "@/types";

interface IStatusLog {
  status: string;
  timestamp: string;
  note?: string;
}

interface IParcel {
  _id: string;
  trackingId: string;
  sender: { name: string };
  receiverName: string;
  status: string;
  statusLogs: IStatusLog[];
}

export const parcelApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    trackParcel: builder.query<IParcel, string>({
      query: (trackingId) => ({
        url: `/parcel/track/${trackingId}`,
        method: 'GET',
      }),

      transformResponse: (response: IResponse<IParcel>) => response.data,
    }),
  }),
});

export const {
  useTrackParcelQuery,
} = parcelApiSlice;