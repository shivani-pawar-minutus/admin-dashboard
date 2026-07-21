import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  
} from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

import * as authApi from "../api/auth.api";
import { storage } from "../utils/storage";

import { loginSuccess, logout as logoutAction } from "../featuers/auth/authSlice";

import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import type { User } from "../featuers/auth/authTypes";

interface LoginPayload {
  email: string;
  password: string;
}

interface SignupPayload {
  name: string;
  email: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;

  login: (payload: LoginPayload) => Promise<void>;
  signup: (payload: SignupPayload) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const auth = useAppSelector((state) => state.auth);

  /**
   * LOGIN
   */
  const login = async (payload: LoginPayload) => {
    console.log("login payload", payload);
    const response = await authApi.login(payload);

    storage.setToken(response.token);

    dispatch(
      loginSuccess({
        user: response.user,
        token: response.token,
      })
    );

    navigate("/dashboard");
  };

  /**
   * LOGOUT
   */
  const logout = () => {
    storage.removeToken();

    dispatch(logoutAction());

    navigate("/login", { replace: true });
  };

  /**
   * SIGNUP
   */
  const signup = async (payload: SignupPayload) => {
    const response = await authApi.signup(payload);

    storage.setToken(response.token);

    dispatch(
      loginSuccess({
        user: response.user,
        token: response.token,
      })
    );

    navigate("/dashboard");
  };

  useEffect(() => {
    const token = storage.getToken();

    if (!token) return;

    dispatch(
      loginSuccess({
        user: auth.user as User,
        token,
      })
    );
  }, [auth.user, dispatch]);

  const value = useMemo(
    () => ({
      user: auth.user,
      token: auth.token,
      isAuthenticated: auth.isAuthenticated,
      loading: auth.loading,

      login,
      signup,
      logout,
    }),
    [auth]
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}