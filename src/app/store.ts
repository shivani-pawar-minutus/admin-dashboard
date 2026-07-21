// src/app/store.ts

import { configureStore } from "@reduxjs/toolkit";



import authReducer from "../featuers/auth/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;