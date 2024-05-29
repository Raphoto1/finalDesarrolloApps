import { createSlice } from "@reduxjs/toolkit";

export const GamseSessionSlice = createSlice({
  name: "GameSession",
  initialState: {
    value: {
      playerChoosed: null,
      groupOfPlayersSelected: null,
      datetimeSession:null,
    },
  },
  reducers: {
    setPlayerChoosed: (state, { payload }) => {
      state.value.playerChoosed = payload.playerChoosed;
    },
    setGroupOfPlayersSelected: (state, { payload }) => {
      state.value.groupOfPlayersSelected = payload.groupOfPlayersSelected
    },
    setDateTimeSession: (state, { payload }) => {
      state.value.datetimeSession = payload.datetimeSession
    }
  },
});

export const { setPlayerChoosed, setGroupOfPlayersSelected, setDateTimeSession } = GamseSessionSlice.actions;
export default GamseSessionSlice.reducer;
