import { baseApi } from "@/redux/baseApi";
import type { IParcelPackage, IResponse } from "@/types";

export const parcelApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addParcel: builder.mutation({
      query: (parcelData) => ({
        url: '/parcel/create',
        method: 'POST',
        data: parcelData,
      }),
      invalidatesTags: ['PARCEL'],
    }),
    removeParcel: builder.mutation({
      query: (parcelId) => ({
        url: `/parcel/${parcelId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['PARCEL']
    }),
    getParcel: builder.query<IParcelPackage[], unknown> ({
      query: (params) =>({
        url: '/parcel',
        method: 'GET',
        params: params,
      }),
      providesTags: ['PARCEL'],
      transformResponse: (response: IResponse<IParcelPackage[]>) => response.data,
    }),
  }),
});

export const {
  useAddParcelMutation,
  useRemoveParcelMutaion,
  useGetParcelQuery,
} = parcelApi;