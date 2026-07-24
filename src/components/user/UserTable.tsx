import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  Chip,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";

import type { User } from "../../types/User";

interface UserTableProps {
  users: User[];

  loading: boolean;

  onEdit: (user: User) => void;

  onDelete: (user: User) => void;
}

export default function UserTable({
  users,
  loading,
  onEdit,
  onDelete,
}: UserTableProps) {
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (users.length === 0) {
    return (
      <Paper
        sx={{
          p: 4,
          textAlign: "center",
        }}
      >
        <Typography variant="h6">
          No users found
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
        >
          Click "Add User" to create your first user.
        </Typography>
      </Paper>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table>

        <TableHead>
          <TableRow>

            <TableCell>Name</TableCell>

            <TableCell>Email</TableCell>

            <TableCell>Role</TableCell>

            <TableCell>Status</TableCell>

            <TableCell>Created At</TableCell>

            <TableCell>Last Updated</TableCell>

            <TableCell align="center">
              Actions
            </TableCell>

          </TableRow>
        </TableHead>

        <TableBody>

          {users.map((user) => (
            <TableRow key={user.id} hover>

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
                  size="small"
                  label={user.status}
                  color={
                    user.status === "Active"
                      ? "success"
                      : "default"
                  }
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
                {
                  user.updatedAt
                    ? new Date(user.updatedAt).toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        hour12: true
                      })
                    : '-'
                }
              </TableCell>

              <TableCell align="center">

                <Tooltip title="Edit User">
                  <IconButton
                    color="primary"
                    onClick={() =>
                      onEdit(user)
                    }
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Delete User">
                  <IconButton
                    color="error"
                    onClick={() =>
                      onDelete(user)
                    }
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>

              </TableCell>

            </TableRow>
          ))}

        </TableBody>

      </Table>
    </TableContainer>
  );
}