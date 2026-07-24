import api from "./axios";

import type {
  User,
} from "../types/User";

/**
 * Get All Users
 * Currently JSON Server returns all users.
 * Later Next.js will automatically return
 * only logged-in admin users.
 */
export async function getUsers(): Promise<User[]> {
  const response =
    await api.get<User[]>("/users");

  return response.data;
}

/**
 * Create User
 */
export async function createUser(
  user: User
): Promise<User> {
  const response =
    await api.post<User>(
      "/users",
      user
    );

  return response.data;
}

/**
 * Update User
 */
export async function updateUser(
  id: number,
  user: Partial<User>
): Promise<User> {
  const response =
    await api.patch<User>(
      `/users/${id}`,
      user
    );

  return response.data;
}

/**
 * Delete User
 */
export async function deleteUser(
  id: number
): Promise<void> {
  await api.delete(`/users/${id}`);
}