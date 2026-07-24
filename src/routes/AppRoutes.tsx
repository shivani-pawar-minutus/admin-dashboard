import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import Users from "../pages/User";
import Settings from "../pages/Setting";
import NotFound from "../pages/NotFound";

import ProtectedRoute from "../components/ProtectedRouter";
import PublicRoute from "../components/PublicRoute";

import AdminLayout from "../layouts/AdminLayout";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public */}

      <Route element={<PublicRoute />}>
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />
      </Route>

      {/* Protected */}

      <Route element={<ProtectedRoute />}>
        <Route
          path="/dashboard"
          element={<AdminLayout />}
        >
          <Route
            index
            element={<Dashboard />}
          />

          <Route
            path="users"
            element={<Users />}
          />

          <Route
            path="settings"
            element={<Settings />}
          />
        </Route>
      </Route>

      <Route
        path="/"
        element={
          <Navigate
            to="/login"
            replace
          />
        }
      />

      <Route
        path="*"
        element={<NotFound />}
      />
    </Routes>
  );
}