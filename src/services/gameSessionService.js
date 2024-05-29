import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { firebase_url } from "../firebase/database";

export const gameSessionApi = createApi({
  reducerPath: "gameSessionApi",
  baseQuery: fetchBaseQuery({ baseUrl: firebase_url }),
  tagTypes: ["getGameSessions"],
  endpoints: (builder) => ({
    getGameSessionById: builder.query({
      query: (localId) => `gameSessions/${localId}.json`,
      providesTags: ["getGameSessions"],
    }),
    postGameSessionById: builder.mutation({
      query: ({ data, localId }) => ({
        url: `gameSessions/${localId}.json`,
        method: "PUT",
        body: {
          gameSession: data.gameSession,
        },
      }),
      invalidatesTags: ["getGameSessions"],
    }),
  }),
});

export const { useGetGameSessionByIdQuery, usePostGameSessionByIdMutation } = gameSessionApi;
