import AddIcon from "@mui/icons-material/Add";

import {
  Box,
  Button,
  Typography,
} from "@mui/material";

import SearchBar from "./SearchBar";

interface UserToolbarProps {
  search: string;

  onSearchChange: (value: string) => void;

  onAddUser: () => void;
}

export default function UserToolbar({
  search,
  onSearchChange,
  onAddUser,
}: UserToolbarProps) {
  return (
    <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
          mb: 3,
        }}
      >
      <Typography variant="h5" sx={{ fontWeight: 600 }}>
        Users
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "center",
        }}
      >
        <Box sx={{ width: 300 }}>
          <SearchBar
            value={search}
            onChange={onSearchChange}
          />
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onAddUser}
        >
          Add User
        </Button>
      </Box>
    </Box>
  );
}