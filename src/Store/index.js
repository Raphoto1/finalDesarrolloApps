//imports de app
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
//imports propios
import counterReducer from "../features/counter/counterSlice";
import authReducer from "../features/User/UserSlice";
import gamesSlice from "../features/Games/gamesSlice";
import GameSessionSlice from "../features/GameSession/GameSessionSlice";
import { userApi } from "../services/userService";
import { gamesApi } from "../services/gamesService";
import { authApi } from "../services/authService";
import { gameSessionApi } from "../services/gameSessionService";
const store = configureStore({
  reducer: {
    counterReducer,
    auth: authReducer,
    games: gamesSlice,
    GameSessionSlice,
    [userApi.reducerPath]: userApi.reducer,
    [gamesApi.reducerPath]: gamesApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [gameSessionApi.reducerPath]: gameSessionApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(gamesApi.middleware).concat(authApi.middleware).concat(userApi.middleware).concat(gameSessionApi.middleware),
});

setupListeners(store.dispatch);

export default store;
