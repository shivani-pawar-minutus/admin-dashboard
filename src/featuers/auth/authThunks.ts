import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllAdmins, login, signup }  from "../../api/auth.api";
import { generateFakeToken } from "../../utils/fakejwt";
import { storage } from "../../utils/storage";
import type { Admin } from "./authTypes";

interface LoginPayload {
  email: string;
  password: string;
}

interface SignupPayload {
    name: string;
  email: string;
  password: string;
}

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (payload: LoginPayload) => {
    console.log("loginThunk payload:", payload);
    
    const response = await login(payload);

    console.log("loginThunk response:", response.data);
    
if(response.data.length === 0){
    throw new Error("User not found");
}

if(response.data[0].password !== payload.password){
    throw new Error("Invalid password");
}

const token = generateFakeToken(response.data[0].id);

storage.setToken(token);

storage.setUser(response.data[0]);

return {
    user: response.data[0],
    token,
};
  }
);

export const signupThunk = createAsyncThunk(
  "auth/signup",
  async (payload: SignupPayload) => {

    const allAdmins = await getAllAdmins();

    const isEmailExists =
      allAdmins.some(
        (admin : Admin) =>
          admin.email === payload.email
      );

    if (isEmailExists) {
      throw new Error(
        "Email already exists."
      );
    }

    const response =
      await signup(payload);

    return response;
  }
);