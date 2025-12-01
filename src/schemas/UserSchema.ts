import { z } from "zod";

export const RegisterSchema = z.object({
  name: z.string().min(3, "Minimum should be 3 letters"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const AddUserBySuperAdmin = z.object({
  name: z.string().min(3, "Minimum should be 3 letters"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  reqUserPassword: z.string().min(6, "Password must be at least 6 characters"),
});

export const LoginSchema = z.object({
  identifier: z.string(),
  password: z.string(),
});

export const passwordFormSchema = z.object({
    current_password: z.string().min(1, 'Current password is required'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    password_confirmation: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.password_confirmation, {
    message: "Passwords don't match",
    path: ["password_confirmation"],
})


export const ForgotPasswordSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

export const ResetPasswordSchema = z
  .object({
    token: z.string().optional(),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const UpdateProfileFormSchema = z
  .object({
    name: z
      .string()
      .optional()
      .transform((val) => (val?.trim() === "" ? undefined : val))
      .refine((val) => !val || val.length >= 2, {
        message: "Name must be at least 2 characters.",
      }),

    email: z
      .string()
      .optional()
      .transform((val) => (val?.trim() === "" ? undefined : val))
      .refine((val) => !val || /^\S+@\S+\.\S+$/.test(val), {
        message: "Please enter a valid email address.",
      }),
  })
  .refine((data) => data.name || data.email, {
    message: "At least one field must be provided.",
  });
