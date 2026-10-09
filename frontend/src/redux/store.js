import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counter/counterSlice.js";
import authReducer from "./features/auth/authSlice.js";
import { baseApi } from "@/lib/api/baseApi.js";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});
