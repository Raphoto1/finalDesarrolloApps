import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { firebase_url } from "../firebase/database";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: firebase_url }),
  tagTypes: ['profileImageGet'],
  endpoints: (builder) => ({
    getProfileImage: builder.query({
      query: (localId) => `profileImages/${localId}.json`,
      providesTags:['profileImageGet']
    }),
    postProfileImage: builder.mutation({
      query: ({ image, localId }) => ({
        url: `profileImages/${localId}.json`,
        method: "PUT",
        body: {
          image: image,
        },
      }),
      invalidatesTags:['profileImageGet']
    }),
  }),
});

export const { useGetProfileImageQuery, usePostProfileImageMutation } = userApi;
