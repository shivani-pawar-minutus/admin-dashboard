// src/api/auth.api.ts

import api from "./axios";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload {
  name: string;
  email: string;
  password: string;
}

export const login = async (data: LoginPayload) => {
  const response = await api.post("/auth/login", data);

  return response.data;
};


export const signup = async (data: SignupPayload) => {
  const response = await api.post("/auth/signup", data);

  return response.data;
};

