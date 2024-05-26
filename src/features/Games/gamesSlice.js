import { createSlice } from "@reduxjs/toolkit";

export const gamesSlice = createSlice({
  name: "games",
  initialState: {
    value: {
      gameId: null,
    },
  },
  reducers: {
    setGame: (state, { payload }) => {
      state.value.gameId = payload.gameId;
    },
  },
});

export const { setGame } = gamesSlice.actions;
export default gamesSlice.reducer;
