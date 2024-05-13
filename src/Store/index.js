//imports de app
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
//imports propios
import counterReducer from "../features/counter/counterSlice";
import { gamesApi } from "../services/gamesService";
import { authApi } from "../services/authService";
const store = configureStore({
  reducer: {
    counterReducer,
    [gamesApi.reducerPath]: gamesApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(gamesApi.middleware).concat(authApi.middleware),
});

setupListeners(store.dispatch);

export default store;
