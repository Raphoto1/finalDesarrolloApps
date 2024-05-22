import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    value: {
      user: null,
      token: null,
      localId: null,
      imageCamera: null,
      userInfo: null,
      findMe:true,
    },
  },
  reducers: {
    setUser: (state, { payload }) => {
      state.value.user = payload.email;
      state.value.token = payload.idToken;
      state.value.localId = payload.localId;
    },
    clearUser: (state) => {
      state.value.user = null;
      state.value.token = null;
      state.value.localId = null;
    },
    setCameraImage: (state, { payload }) => {
      state.value = {
        ...state.value,
        imageCamera: payload,
      };
    },
    setUserInfo: (state, { payload }) => {
      state.value = {
        ...state.value,
        userInfo: payload,
      };
    },
  },
});

export const { setUser, clearUser, setCameraImage, setUserInfo } = authSlice.actions;
export default authSlice.reducer;
