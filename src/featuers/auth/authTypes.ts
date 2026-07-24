// src/features/auth/authTypes.ts

export interface Admin {
  id: number;
  name: string;
  email: string;
  password: string;
}

export interface AuthState {
  user: Admin | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}