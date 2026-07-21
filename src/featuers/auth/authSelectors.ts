// src/features/auth/authSelectors.ts

import type { RootState } from "../../app/store";

// state.auth may be typed as unknown in some RootState definitions; narrow with a cast
const auth = (state: RootState) => state.auth as 
          { user: unknown; token: unknown; isAuthenticated: boolean; loading: boolean };

export const selectUser = (state: RootState) => auth(state).user;

export const selectToken = (state: RootState) => auth(state).token;

export const selectIsAuthenticated = (state: RootState) => auth(state).isAuthenticated;

export const selectLoading = (state: RootState) => auth(state).loading;