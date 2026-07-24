import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  Button,
} from "@mui/material";

import LogoutIcon from "@mui/icons-material/Logout";

import { storage } from "../utils/storage";
import { logout } from "../featuers/auth/authSlice";

import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";

interface HeaderProps {
  drawerWidth: number;
}

export default function Header({
  drawerWidth,
}: HeaderProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector(
    (state) => state.auth.user
  );

  const handleLogout = () => {
    storage.clear();

    dispatch(logout());

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${drawerWidth}px)`,
        ml: `${drawerWidth}px`,
        boxShadow: 2,
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
          }}
        >
          Admin Dashboard
        </Typography>

        <Box
          sx={{
            marginLeft: "auto",
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography>
            Welcome,
            <strong> {user?.name ?? "Admin"}</strong>
          </Typography>

          <Avatar>
            {user?.name?.charAt(0).toUpperCase() ?? "A"}
          </Avatar>

          <Button
            color="inherit"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}