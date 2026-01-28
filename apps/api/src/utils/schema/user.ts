import z from "zod";
import { tr } from "zod/locales";

export const signUpSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
});

export const signInSchema = signUpSchema.pick({
  email: true,
  password: true,
});

export type signInSchema = z.infer<typeof signInSchema>;
export type SignUpValues = z.infer<typeof signUpSchema>;
