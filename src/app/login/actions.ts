"use server";

import { loginSchema, LoginForm } from "@/schemas/loginSchema";
import { mockUsers } from "./users";
import { generateToken } from "./auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginUser(formData: FormData) {
  const rawData: LoginForm = {
    username: String(formData.get("username") || ""),
    password: String(formData.get("password") || ""),
  };

  const parsed = loginSchema.safeParse(rawData);

  if (!parsed.success) {
    return { error: "Campos inválidos", issues: parsed.error.format() };
  }

  const { username, password } = parsed.data;

  const user = mockUsers.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return { error: "Usuário ou senha inválidos" };
  }

  const token = generateToken(user);

  const cookieStore = await cookies();
  cookieStore.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 5,
  });

  redirect("/");
}
