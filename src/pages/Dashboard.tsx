import { Box, Typography } from "@mui/material";

import { useAppSelector } from "../hooks/useAppSelector";

import useDashboard from "../hooks/useDashboard";

import DashboardStats from "../components/dashboard/DashboardStats";
import RecentUsersTable from "../components/dashboard/RecentUsersTable";

export default function Dashboard() {
  const user = useAppSelector((state) => state.auth.user);

  const {
    loading,
    totalUsers,
    activeUsers,
    inactiveUsers,
    adminUsers,
    recentUsers,
  } = useDashboard();

  if (loading) {
    return (
      <Typography>
        Loading Dashboard...
      </Typography>
    );
  }

  return (
    <Box>
      <Typography
        variant="h4"
        sx={{ fontWeight: 700, mb: 1 }}
      >
        Dashboard
      </Typography>

      <Typography
        color="text.secondary"
        sx={{ mb: 4 }}
      >
        Welcome back, {user?.name}
      </Typography>

      <DashboardStats
        totalUsers={totalUsers}
        activeUsers={activeUsers}
        inactiveUsers={inactiveUsers}
        adminUsers={adminUsers}
      />

      <RecentUsersTable
        users={recentUsers}
      />
    </Box>
  );
}