import type { UserForm } from "../types/User";

export interface UserFormErrors {
  name: string;
  email: string;
}

export const initialErrors: UserFormErrors = {
  name: "",
  email: "",
};

export function validateUser(
  formData: UserForm
): {
  isValid: boolean;
  errors: UserFormErrors;
} {
  const errors: UserFormErrors = {
    ...initialErrors,
  };

  let isValid = true;

  // Name Validation
  if (!formData.name.trim()) {
    errors.name = "Name is required";
    isValid = false;
  }

  // Email Validation
  if (!formData.email.trim()) {
    errors.email = "Email is required";
    isValid = false;
  } else {
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      errors.email =
        "Please enter a valid email address";
      isValid = false;
    }
  }

  return {
    isValid,
    errors,
  };
}