import z from "zod";

export const validateSchema = <T>(schema: z.ZodSchema<T>, data: unknown) => {
  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;
    return { success: false, errors };
  }
  return { success: true, data: parsed.data };
};
