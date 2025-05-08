"use server";

import { ServerInput, ServerTypes } from "@/schemas/serverSchema";
import { serverService } from "@/services/server.service";
import { z } from "zod";

async function createServer(formData: FormData) {
  try {
    const rawData: ServerInput = {
      name: String(formData.get("name") || ""),
      type: (formData.get("type") as ServerTypes) || "FREE",
      maxLevel: Number(formData.get("maxLevel") || 1),
      active: Boolean(formData.get("active") || true),
    };

    await serverService.create(rawData);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: "Erro de validação",
        errors: error.flatten().fieldErrors,
      };
    }

    return {
      success: false,
      message: "Erro inesperado ao criar servidor",
      errors: {},
    };
  }
}

export default createServer;
