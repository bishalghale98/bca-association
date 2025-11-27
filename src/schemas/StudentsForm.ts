import * as z from "zod";

export const formSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  rollNumber: z.string().min(1,"Roll No. is required"),
  semester: z.string().min(1, "Semester is required"),
  email: z.string().email(),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .refine(
      (val) => {
        const digits = val.replace(/\D/g, "");
        return digits.length >= 7;
      },
      {
        message: "Phone number must contain at least 7 digits",
      }
    ),

  careerGoal: z.string().min(1, "Career goal is required"),

  skills: z.array(z.string()), // REQUIRED
  events: z.array(z.string()), // REQUIRED
  suggestions: z.string().optional(),

  contacted: z.boolean(),
});
