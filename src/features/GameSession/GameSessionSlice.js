import { createSlice } from "@reduxjs/toolkit";

export const GamseSessionSlice = createSlice({
  name: "GameSession",
  initialState: {
    value: {
      playerChoosed: null,
    },
  },
  reducers: {
    setPlayerChoosed: (state, { payload }) => {
      state.value.playerChoosed = payload.playerChoosed;
    },
  },
});

export const { setPlayerChoosed } = GamseSessionSlice.actions;
export default GamseSessionSlice.reducer;
