// src/routes/AppRoutes.tsx

import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";

import ProtectedRoute from "../components/ProtectedRouter";
import PublicRoute from "../components/PublicRoute";

import AdminLayout from "../layouts/AdminLayout";

export default function AppRoutes() {
  return (
    <Routes>

      {/* Public Routes */}

      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      {/* Protected Routes */}

      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

        </Route>
      </Route>

      <Route
        path="/"
        element={<Navigate to="/login" replace />}
      />

      <Route
        path="*"
        element={<NotFound />}
      />

    </Routes>
  );
}