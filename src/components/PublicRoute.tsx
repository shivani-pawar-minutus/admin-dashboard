// src/components/PublicRoute.tsx

import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks/useAppSelector";

export default function PublicRoute() {
  const isAuthenticated = useAppSelector(
    (state) => state.auth.isAuthenticated
  );

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}