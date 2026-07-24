import { useEffect } from "react";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { storage } from "../utils/storage";
import { loginSuccess } from "../featuers/auth/authSlice";

export default function AuthInitializer() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = storage.getToken();
    const user = storage.getUser();

    if (token && user) {
      dispatch(
        loginSuccess({
          user,
          token,
        })
      );
    }
  }, [dispatch]);

  return null;
}