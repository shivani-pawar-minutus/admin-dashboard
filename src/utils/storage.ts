// src/utils/storage.ts

import type { Admin } from "../featuers/auth/authTypes";

const TOKEN_KEY = "access_token";
const USER_KEY = "auth_user";

export const storage = {
  // Token
  getToken: () => localStorage.getItem(TOKEN_KEY),

  setToken: (token: string) => {
    localStorage.setItem(TOKEN_KEY, token);
  },

  removeToken: () => {
    localStorage.removeItem(TOKEN_KEY);
  },

  // User
  getUser: (): Admin | null => {
    const user = localStorage.getItem(USER_KEY);

    return user ? JSON.parse(user) : null;
  },

  setUser: (user: Admin) => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  removeUser: () => {
    localStorage.removeItem(USER_KEY);
  },

  clear: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },
};