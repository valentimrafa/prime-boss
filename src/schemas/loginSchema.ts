import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(3, "O usuário deve ter pelo menos 5 caracteres"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

export type LoginForm = z.infer<typeof loginSchema>;
