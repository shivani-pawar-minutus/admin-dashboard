// src/layouts/AdminLayout.tsx

import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <>
      <h2>Navbar</h2>

      <hr />

      <Outlet />

      <hr />

      <h2>Footer</h2>
    </>
  );
}