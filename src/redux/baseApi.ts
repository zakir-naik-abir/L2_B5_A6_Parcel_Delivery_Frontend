import { createApi } from "@reduxjs/toolkit/query";
import axiosBaseQuery from "./axiosBaseQuery";

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['USER',],
  endpoints: () => ({})
});
