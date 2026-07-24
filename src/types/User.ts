export type UserRole = "Admin" | "User";

export type UserStatus =
  | "Active"
  | "Inactive";

export interface User {
  id: number;

  name: string;

  email: string;

  role: UserRole;

  status: UserStatus;

  /**
   * Admin ID who created this user
   */
  createdBy: number;

  /**
   * Admin Name who created this user
   */
  createdByName: string;

  createdAt: string;

  updatedAt: string | null;
}

/**
 * Used while creating/updating user
 */
export interface UserForm {
  name: string;

  email: string;

  role: UserRole;

  status: UserStatus;
}

export const initialUserForm: UserForm = {
  name: "",
  email: "",
  role: "User",
  status: "Active",
};