import SearchIcon from "@mui/icons-material/Search";

import {
  InputAdornment,
  TextField,
} from "@mui/material";

interface SearchBarProps {
  value: string;

  onChange: (value: string) => void;
}

export default function SearchBar({
  value,
  onChange,
}: SearchBarProps) {
  return (
    <TextField
      fullWidth
      size="small"
      placeholder="Search users..."
      value={value}
      onChange={(event) =>
        onChange(event.target.value)
      }
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        },
      }}
    />
  );
}