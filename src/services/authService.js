import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { api_key, baseAuthUrl, firebase_url } from "../firebase/database";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseAuthUrl }),
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: ({ ...auth }) => ({
        url: `accounts:signUp?key=${api_key}`,
        method: "POST",
        body: auth,
      }),
    }),
    login: builder.mutation({
      query: ({ ...auth }) => ({
        url: `accounts:signInWithPassword?key=${api_key}`,
        method: "POST",
        body: auth,
      }),
    }),
  }),
});

export const { useLoginMutation, useSignUpMutation } = authApi;
