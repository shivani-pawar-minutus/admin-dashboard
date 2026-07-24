import {
  Paper,
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
} from "@mui/material";

import type { User } from "../../types/User";

interface RecentUsersTableProps {
  users: User[];
}

export default function RecentUsersTable({
  users,
}: RecentUsersTableProps) {
  return (
    <Paper
      elevation={2}
      sx={{
        mt: 4,
        borderRadius: 3,
      }}
    >
      <Box sx={{ p: 3 }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, mb: 2 }}
        >
          Recently Added Users
        </Typography>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>

              <TableCell>Email</TableCell>

              <TableCell>Role</TableCell>

              <TableCell>Status</TableCell>

              <TableCell>Created On</TableCell>

              <TableCell>Last Updated</TableCell>

            </TableRow>
          </TableHead>

          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  align="center"
                >
                  No users found.
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    {user.name}
                  </TableCell>

                  <TableCell>
                    {user.email}
                  </TableCell>

                  <TableCell>
                    {user.role}
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={user.status}
                      color={
                        user.status ===
                        "Active"
                          ? "success"
                          : "default"
                      }
                      size="small"
                    />
                  </TableCell>

                  <TableCell>
                    {new Date(user.createdAt).toLocaleString('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: true
})}
                  </TableCell>
                 
                  <TableCell>
                    {user.updatedAt
                      ? new Date(
                          user.updatedAt
                        ).toLocaleString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit',
                          hour12: true
                        })
                      : "-"}
                  </TableCell>

                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Box>
    </Paper>
  );
}