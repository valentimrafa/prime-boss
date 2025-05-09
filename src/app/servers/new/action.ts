"use server";

import { ServerInput, serverSchema, ServerTypes } from "@/schemas/serverSchema";
import { serverService } from "@/services/server.service";

async function createServer(formData: FormData) {
  const rawData: ServerInput = {
    name: String(formData.get("name") || ""),
    type: (formData.get("type") as ServerTypes) || "FREE",
    maxLevel: Number(formData.get("maxLevel") || 1),
    active: Boolean(formData.get("active") || true),
  };

  const parsed = serverSchema.safeParse(rawData);

  if (!parsed.success) {
    return { error: "Campos inválidos", issues: parsed.error.format() };
  }

  await serverService.create(rawData);
}

export default createServer;
