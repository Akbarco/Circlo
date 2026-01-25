import z from "zod";

export const signUpSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
});

export type SignUpValues = z.output<typeof signUpSchema>;