import UserToolbar from "../components/user/UserToolbar";
import UserTable from "../components/user/UserTable";
import UserDialog from "../components/user/UserDialog";
import ConfirmDialog from "../components/common/ConfirmDialog";

import useUsers from "../hooks/useUsers";

export default function Users() {
  const {
    /**
     * Data
     */
    users,
    loading,
    search,
    formData,
    errors,
    selectedUser,

    /**
     * Dialog
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
     * Dialog Actions
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
  } = useUsers();

  return (
    <>
      <UserToolbar
        search={search}
        onSearchChange={setSearch}
        onAddUser={handleOpenAddDialog}
      />

      <UserTable
        users={users}
        loading={loading}
        onEdit={handleOpenEditDialog}
        onDelete={handleOpenDeleteDialog}
      />

      <UserDialog
        open={dialogOpen}
        isEdit={selectedUser !== null}
        formData={formData}
        errors={errors}
        onChange={handleInputChange}
        onClose={handleCloseDialog}
        onSave={handleSaveUser}
      />

      <ConfirmDialog
        open={confirmDialogOpen}
        title="Delete User"
        message="Are you sure you want to delete this user?"
        confirmText="Delete"
        cancelText="Cancel"
        loading={loading}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleDeleteUser}
      />
    </>
  );
}