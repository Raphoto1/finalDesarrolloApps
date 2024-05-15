//imports de app
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
//imports propios
import counterReducer from "../features/counter/counterSlice";
import authReducer from "../features/User/UserSlice";
import {userApi} from "../services/userService";
import { gamesApi } from "../services/gamesService";
import { authApi } from "../services/authService";
const store = configureStore({
  reducer: {
    counterReducer,
    auth: authReducer,
    [userApi.reducerPath]:userApi.reducer,
    [gamesApi.reducerPath]: gamesApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(gamesApi.middleware).concat(authApi.middleware).concat(userApi.middleware),
});

setupListeners(store.dispatch);

export default store;
