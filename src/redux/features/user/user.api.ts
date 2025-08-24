import { baseApi } from "@/redux/baseApi";
import type {  IResponse } from "@/types";
import type { IUserPackage } from "@/types/user.type";


export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) =>({
    deleteUser: builder.mutation({
      query: (userDelete) => ({
        url: `/user/delete/${userDelete}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['USER']
    }),
    updateUser: builder.mutation({
      query: (userDelete) => ({
        url: `/user/update/${userDelete}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['USER']
    }),
    getAllUser: builder.query<IUserPackage[], unknown>({
      query: ({page, limit}) => ({
        url: '/user',
        method: 'GET',
        params: {page, limit},
      }),
      transformResponse: (response: IResponse<IUserPackage[]>) => {
        return response.data
      },
      providesTags: ['USER'],
      
    }),
  })
});

export const {
  useGetAllUserQuery,
  useDeleteUserMutation,
  useUpdateUserMutation
} = userApi;