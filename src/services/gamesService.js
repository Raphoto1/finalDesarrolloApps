//imports de app
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
//imports propios
import { firebase_url } from "../firebase/database";

export const gamesApi = createApi({
  reducerPath: "gamesApi",
  baseQuery: fetchBaseQuery({ baseUrl: firebase_url }),
  endpoints: (builder) => ({
    getGames: builder.query({
      query: () => "games.json",
    }),
    getGenre: builder.query({
      query: () => "genre.json",
    }),
  }),
});

export const { useGetGamesQuery, useGetGenreQuery } = gamesApi;
