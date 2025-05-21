"use server";

import {
  ServerSchemaInput,
  serverSchemaInput,
  ServerTypes,
} from "@/schemas/serverSchema";
import { serverService } from "@/services/server.service";
import { redirect } from "next/navigation";

async function createServer(formData: FormData) {
  const rawData: ServerSchemaInput = {
    name: String(formData.get("name") || ""),
    type: (formData.get("type") as ServerTypes) || "FREE",
    maxLevel: Number(formData.get("maxLevel") || 1),
    active: Boolean(formData.get("active") || true),
  };

  const parsed = serverSchemaInput.safeParse(rawData);

  if (!parsed.success) {
    return { error: "Campos inválidos", issues: parsed.error.format() };
  }

  await serverService.create(rawData);
  redirect("/servers");
}

export default createServer;
