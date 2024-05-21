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
    getGameById: builder.query({
      query: (gameId) => `games.json?orderBy="id"&equalTo=${gameId}`,
      transformResponse: (response) => {
        const responseTransformed = Object.values(response);
        if (responseTransformed.length) return responseTransformed[0];
        return null;
      },
    }),
  }),
});

export const { useGetGamesQuery, useGetGenreQuery, useGetGameByIdQuery } = gamesApi;
