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
  const response = await api.get(`/admins`, {
    params: {
      email: data.email,
    },
  });

  console.log("Login response:", response.data);

  return response;
};


export const signup = async (data: SignupPayload) => {
  const response = await api.post("/admins", data);

  console.log("Signup response:", response.data);
  return response.data;
};

export const getAllAdmins = async () => {
  const response = await api.get("/admins");
  return response.data;
}
