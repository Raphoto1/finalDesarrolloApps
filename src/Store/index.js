//imports de app
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
//imports propios
import counterReducer from "../features/counter/counterSlice";
import { gamesApi } from "../services/gamesService";
const store = configureStore({
  reducer: {
    counterReducer,
    [gamesApi.reducerPath]: gamesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(gamesApi.middleware),
});

setupListeners(store.disparch);

export default store;
