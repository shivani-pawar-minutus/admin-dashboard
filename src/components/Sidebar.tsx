import {
  Drawer,
  Toolbar,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";

import {
  Dashboard,
  People,
  Settings,
  Logout,
} from "@mui/icons-material";



import { useAppDispatch } from "../hooks/useAppDispatch";

import { useNavigate, useLocation } from "react-router-dom";
// import { useAppSelector } from "../hooks/useAppSelector";
import { storage } from "../utils/storage";
import { logout } from "../featuers/auth/authSlice";

interface SidebarProps {
  drawerWidth: number;
}

export default function Sidebar({
  drawerWidth,
}: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  // const user = useAppSelector(
  //   (state) => state.auth.user
  // );

    const handleLogout = () => {
      storage.clear();
  
      dispatch(logout());
  
      navigate("/login", {
        replace: true,
      });
    };
  const menuItems = [
    {
      text: "Dashboard",
      icon: <Dashboard />,
      path: "/dashboard",
    },
    {
      text: "Users",
      icon: <People />,
      path: "/dashboard/users",
    },
    {
      text: "Settings",
      icon: <Settings />,
      path: "/dashboard/settings",
    },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,

        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />

      <List>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.text}
            selected={location.pathname === item.path}
            onClick={() => navigate(item.path)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>

            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>

      <Divider />

      <List>
        <ListItemButton onClick={handleLogout}>
          <ListItemIcon>
            <Logout />
          </ListItemIcon>

          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>
    </Drawer>
  );
}