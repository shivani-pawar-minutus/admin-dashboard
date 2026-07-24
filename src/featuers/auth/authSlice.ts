// src/features/auth/authSlice.ts

import { createSlice } from "@reduxjs/toolkit";

import type { AuthState } from "./authTypes";
import { loginThunk, signupThunk } from "./authThunks";

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
  loginSuccess: (state, action) => {
    state.user = action.payload.user;
    state.token = action.payload.token;
    state.isAuthenticated = true;
    state.loading = false;
  },

  logout: (state) => {
    state.user = null;
    state.token = null;
    state.isAuthenticated = false;
    state.loading = false;
    state.error = null;
  },

  setLoading: (state, action) => {
    state.loading = action.payload;
  },
},

  extraReducers: 
  
  (builder) => {
    builder.addCase(loginThunk.pending, (state) => {
    state.loading = true;
  });

  builder.addCase(
  loginThunk.fulfilled,
  (state, action) => {
    state.user = action.payload.user;
    state.token = action.payload.token;
    state.isAuthenticated = true;
    state.loading = false;
  }

);

builder.addCase(
  
  loginThunk.rejected,
  (state, action) => {
    state.loading = false;

    state.error =
      action.error.message ??
      "Login Failed";
  }
);

builder.addCase(signupThunk.fulfilled, (state) => {
  state.loading = false;
  state.error = null;
});



builder.addCase(
  signupThunk.rejected,
  (state, action) => {
    state.loading = false;
    state.error =
      action.error.message ??
      "Signup Failed";
  }
);

  },
});

// export const {  logout } = authSlice.actions;

export const { loginSuccess, logout, setLoading } = authSlice.actions;

export default authSlice.reducer;