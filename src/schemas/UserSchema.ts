import { z } from "zod";

export const RegisterSchema = z.object({
  name: z.string().min(3, "Minimum should be 3 letters"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const LoginSchema = z.object({
  identifier: z.string(),
  password: z.string(),
});

export const ChangePassword = z.object({
  currentPassword: z
    .string()
    .min(6, "Current password must be at least 6 characters"),
  newPassword: z.string().min(6, "New password must be at least 6 characters"),
});
