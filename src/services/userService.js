import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { firebase_url } from "../firebase/database";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: firebase_url }),
  tagTypes: ["profileImageGet", "profileInfoGet", "usersListGet"],
  endpoints: (builder) => ({
    getProfileImage: builder.query({
      query: (localId) => `profileImages/${localId}.json`,
      providesTags: ["profileImageGet"],
    }),
    postProfileImage: builder.mutation({
      query: ({ image, localId }) => ({
        url: `profileImages/${localId}.json`,
        method: "PUT",
        body: {
          image: image,
        },
      }),
      invalidatesTags: ["profileImageGet"],
    }),
    getProfileInfo: builder.query({
      query: (localId) => `profileInfo/${localId}.json`,
      providesTags: ["profileInfoGet"],
    }),
    postProfileInfo: builder.mutation({
      query: ({ data, localId }) => ({
        url: `profileInfo/${localId}.json`,
        method: "PUT",
        body: {
          userName: data.userName,
          playStation: data.playStation,
          xbox: data.xbox,
          steam: data.steam,
          findMe: data.findMe,
        },
      }),
      invalidatesTags: ["profileInfoGet"],
    }),
    getUsersList: builder.query({
      query: () => `usersList.json`,
      transformResponse: (response) => {
        const responseTransformed = Object.values(response)
        if (responseTransformed.length) return responseTransformed;
        return null;
      },
      providesTags: ["usersListGet"],
    }),
    postUsersList: builder.mutation({
      query: ({ data }) => ({
        url: `usersList/${data.localId}.json`,
        method: "PUT",
        body: {
          localId: data.localId,
          findMe: data.findMe,
        },
      }),
      invalidatesTags: ["usersListGet"],
    }),
  }),
});

export const {
  useGetProfileImageQuery,
  usePostProfileImageMutation,
  useGetProfileInfoQuery,
  usePostProfileInfoMutation,
  useGetUsersListQuery,
  usePostUsersListMutation,
} = userApi;
