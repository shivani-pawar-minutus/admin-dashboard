import type { ChangeEvent } from "react";

import type {
  UserForm,
} from "../../types/User";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import type { SelectChangeEvent } from "@mui/material";

interface UserDialogProps {
  open: boolean;

  isEdit: boolean;

  formData: UserForm;

  errors: {
    name: string;
    email: string;
  };

  onClose: () => void;

  onSave: () => void;

  onChange: (
    field: keyof UserForm,
    value: string
  ) => void;
}

export default function UserDialog({
  open,
  isEdit,
  formData,
  errors,
  onClose,
  onSave,
  onChange,
}: UserDialogProps) {
  const handleInputChange =
    (
      event: ChangeEvent<HTMLInputElement>
    ) => {
      onChange(
        event.target.name as keyof UserForm,
        event.target.value
      );
    };

  const handleSelectChange =
    (event: SelectChangeEvent) => {
      onChange(
        event.target.name as keyof UserForm,
        event.target.value
      );
    };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        {isEdit
          ? "Edit User"
          : "Add User"}
      </DialogTitle>

      <DialogContent>

        <TextField
          margin="normal"
          fullWidth
          name="name"
          label="Name"
          value={formData.name}
          onChange={handleInputChange}
          error={!!errors.name}
          helperText={errors.name}
        />

        <TextField
          margin="normal"
          fullWidth
          name="email"
          label="Email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          error={!!errors.email}
          helperText={errors.email}
        />

        <FormControl
          margin="normal"
          fullWidth
        >
          <InputLabel>
            Role
          </InputLabel>

          <Select
            name="role"
            value={formData.role}
            label="Role"
            onChange={
              handleSelectChange
            }
          >
            <MenuItem value="User">
              User
            </MenuItem>

            <MenuItem value="Admin">
              Admin
            </MenuItem>

          </Select>
        </FormControl>

        <FormControl
          margin="normal"
          fullWidth
        >
          <InputLabel>
            Status
          </InputLabel>

          <Select
            name="status"
            value={formData.status}
            label="Status"
            onChange={
              handleSelectChange
            }
          >
            <MenuItem value="Active">
              Active
            </MenuItem>

            <MenuItem value="Inactive">
              Inactive
            </MenuItem>

          </Select>
        </FormControl>

      </DialogContent>

      <DialogActions>

        <Button
          onClick={onClose}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={onSave}
        >
          {isEdit
            ? "Update"
            : "Save"}
        </Button>

      </DialogActions>

    </Dialog>
  );
}