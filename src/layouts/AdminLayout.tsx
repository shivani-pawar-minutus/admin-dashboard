import { Box, CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const drawerWidth = 240;

export default function AdminLayout() {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* Sidebar */}
      <Sidebar drawerWidth={drawerWidth} />

      {/* Right Side */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "grey.100",
          minHeight: "100vh",
        }}
      >
        {/* Header */}
        <Header drawerWidth={drawerWidth} />

        {/* Page Content */}
        <Box
          sx={{
            p: 3,
            mt: "64px",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}