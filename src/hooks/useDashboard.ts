import { useEffect, useMemo, useState } from "react";

import { useAppSelector } from "../hooks/useAppSelector";

import { getUsers } from "../api/user.api";

import type { User } from "../types/User";

export default function useDashboard() {
const user = useAppSelector(
  (state) => state.auth.user
);
  const [users, setUsers] = useState<User[]>([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;

    const loadDashboard = async () => {
      try {
        setLoading(true);

        const response = await getUsers();

        const adminUsers = response.filter(
          (item) => item.createdBy === user.id
        );

        setUsers(adminUsers);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [user]);

  const totalUsers = users.length;

  const activeUsers = useMemo(
    () =>
      users.filter(
        (user) => user.status === "Active"
      ).length,
    [users]
  );

  const inactiveUsers = useMemo(
    () =>
      users.filter(
        (user) => user.status === "Inactive"
      ).length,
    [users]
  );

  const adminUsers = useMemo(
    () =>
      users.filter(
        (user) => user.role === "Admin"
      ).length,
    [users]
  );

  const recentUsers = useMemo(() => {
    return [...users]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
      )
      .slice(0, 5);
  }, [users]);

  return {
    loading,

    totalUsers,

    activeUsers,

    inactiveUsers,

    adminUsers,

    recentUsers,
  };
}