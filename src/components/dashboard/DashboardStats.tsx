import Grid from "@mui/material/Grid";
import {
  Card,
  CardContent,
  Typography,
} from "@mui/material";

interface DashboardStatsProps {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  adminUsers: number;
}

export default function DashboardStats({
  totalUsers,
  activeUsers,
  inactiveUsers,
  adminUsers,
}: DashboardStatsProps) {
  const cards = [
    {
      title: "Total Users",
      value: totalUsers,
    },
    {
      title: "Active Users",
      value: activeUsers,
    },
    {
      title: "Inactive Users",
      value: inactiveUsers,
    },
    {
      title: "Admin Users",
      value: adminUsers,
    },
  ];

  return (
    <Grid container spacing={3}>
      {cards.map((card) => (
        <Grid
          key={card.title}
          size={{ xs: 12, sm: 6, md: 3 }}
        >
          <Card>
            <CardContent>
              <Typography color="text.secondary">
                {card.title}
              </Typography>

              <Typography variant="h4">
                {card.value}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}