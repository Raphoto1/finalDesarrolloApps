import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { firebase_url } from "../firebase/database";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: firebase_url }),
  tagTypes: ['profileImageGet','profileInfoGet'],
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
    getProfileInfo: builder.query({
      query: (localId) => `profileInfo/${localId}.json`,
      providesTags:['profileInfoGet']
    }),
    postProfileInfo: builder.mutation({
      query: ({ data,localId }) => ({
        url: `profileInfo/${localId}.json`,
          method: "PUT",
        body: {
          userName: data.userName,
          playStation: data.playStation,
          xbox: data.xbox,
          steam:data.steam,
        },
      }),
      invalidatesTags:['profileInfoGet'], 
    })
  }),
});

export const { useGetProfileImageQuery, usePostProfileImageMutation, useGetProfileInfoQuery,usePostProfileInfoMutation } = userApi;
