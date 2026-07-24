import { useCallback, useEffect, useMemo, useState } from "react";

import { useAppSelector } from "../hooks/useAppSelector";

import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
} from "../api/user.api";

import type {
  User,
  UserForm,
} from "../types/User";

import {
  initialUserForm,
} from "../types/User";

import {
  initialErrors,
  validateUser,
  type UserFormErrors,
} from "../utils/userValidation";

export default function useUsers() {
    const user = useAppSelector(
      (state) => state.auth.user
    );

  /**
   * Users List
   */
  const [users, setUsers] = useState<User[]>([]);

  /**
   * Loading
   */
  const [loading, setLoading] =
    useState(false);

  /**
   * Search
   */
  const [search, setSearch] =
    useState("");

  /**
   * Add / Edit Dialog
   */
  const [dialogOpen, setDialogOpen] =
    useState(false);

  /**
   * Delete Dialog
   */
  const [
    confirmDialogOpen,
    setConfirmDialogOpen,
  ] = useState(false);

  /**
   * Selected User
   */
  const [
    selectedUser,
    setSelectedUser,
  ] = useState<User | null>(null);

  /**
   * Form
   */
  const [formData, setFormData] =
    useState<UserForm>(
      initialUserForm
    );

  /**
   * Validation Errors
   */
  const [errors, setErrors] =
    useState<UserFormErrors>(
      initialErrors
    );

  /**
   * Load Users
   */
  const loadUsers =
    useCallback(async () => {
      if (!user) return;

      try {
        setLoading(true);

        const response =
          await getUsers();

        /**
         * Only show users
         * created by
         * logged in admin
         */
        const adminUsers =
          response.filter(
            (item) =>
              item.createdBy === user.id
          );

        setUsers(adminUsers);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }, [user]);

  useEffect(() => {
    // Defer calling loadUsers to avoid setting state synchronously inside an effect
    // which can trigger cascading renders.
    void Promise.resolve().then(() => {
      loadUsers();
    });
  }, [loadUsers]);

    /**
   * Handle Input Change
   */
  const handleInputChange = (
    field: keyof UserForm,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    /**
     * Clear field error while typing
     */
    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  /**
   * Open Add Dialog
   */
  const handleOpenAddDialog = () => {
    setSelectedUser(null);

    setFormData(initialUserForm);

    setErrors(initialErrors);

    setDialogOpen(true);
  };

  /**
   * Open Edit Dialog
   */
  const handleOpenEditDialog = (
    selected: User
  ) => {
    setSelectedUser(selected);

    setFormData({
      name: selected.name,
      email: selected.email,
      role: selected.role,
      status: selected.status,


    });

    setErrors(initialErrors);

    setDialogOpen(true);
  };

  /**
   * Close Dialog
   */
  const handleCloseDialog = () => {
    setDialogOpen(false);

    setSelectedUser(null);

    setFormData(initialUserForm);

    setErrors(initialErrors);
  };

  /**
   * Save User
   */
  const handleSaveUser =
    async () => {
      if (!user) return;

      const validation =
        validateUser(formData);

      if (!validation.isValid) {
        setErrors(validation.errors);
        return;
      }

      try {
        setLoading(true);

        /**
         * Edit User
         */
        if (selectedUser) {
          await updateUser(
            selectedUser.id,
            {
              ...formData,
              updatedAt: new Date().toLocaleString('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: true
}),
            }
          );
        }

        /**
         * Add User
         */
        else {
          const newUser: User = {
            id: Date.now(),

            ...formData,

            createdBy: user.id,

            createdByName:
              user.name,

            createdAt:
              new Date().toISOString(),

            updatedAt:
             "",
          };

          await createUser(newUser);
        }

        await loadUsers();

        handleCloseDialog();
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

      /**
   * Open Delete Dialog
   */
  const handleOpenDeleteDialog = (
    selected: User
  ) => {
    setSelectedUser(selected);

    setConfirmDialogOpen(true);
  };

  /**
   * Close Delete Dialog
   */
  const handleCloseDeleteDialog =
    () => {
      setConfirmDialogOpen(false);

      setSelectedUser(null);
    };

  /**
   * Delete User
   */
  const handleDeleteUser =
    async () => {
      if (!selectedUser) return;

      try {
        setLoading(true);

        await deleteUser(
          selectedUser.id
        );

        await loadUsers();

        handleCloseDeleteDialog();
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

  /**
   * Filtered Users
   */
  const filteredUsers =
    useMemo(() => {
      const keyword =
        search.toLowerCase().trim();

      if (!keyword) {
        return users;
      }

      return users.filter(
        (user) =>
          user.name
            .toLowerCase()
            .includes(keyword) ||
          user.email
            .toLowerCase()
            .includes(keyword) ||
          user.role
            .toLowerCase()
            .includes(keyword) ||
          user.status
            .toLowerCase()
            .includes(keyword)
      );
    }, [users, search]);

      /**
   * Return
   */
  return {
    /**
     * Data
     */
    users: filteredUsers,

    loading,

    search,

    formData,

    errors,

    selectedUser,

    /**
     * Dialogs
     */
    dialogOpen,

    confirmDialogOpen,

    /**
     * Search
     */
    setSearch,

    /**
     * Form
     */
    handleInputChange,

    /**
     * Dialog
     */
    handleOpenAddDialog,

    handleOpenEditDialog,

    handleCloseDialog,

    /**
     * Save
     */
    handleSaveUser,

    /**
     * Delete
     */
    handleOpenDeleteDialog,

    handleCloseDeleteDialog,

    handleDeleteUser,

    /**
     * Reload
     */
    loadUsers,
  };
}