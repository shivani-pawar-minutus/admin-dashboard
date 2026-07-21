// src/components/PublicRoute.tsx

import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export default function PublicRoute() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}