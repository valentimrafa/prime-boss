"use server";

import { BossSchemaInput, bossSchema } from "@/schemas/bossSchema";
import { bossService } from "@/services/boss.service";
import { redirect } from "next/navigation";

async function createBoss(formData: FormData) {
  const rawData: BossSchemaInput = {
    name: String(formData.get("name")) || "",
    map: String(formData.get("map")) || "",
    rules: {
      min_time: Number(formData.get("min_time")),
      max_time: Number(formData.get("max_time")),
      time_waiting: Number(formData.get("time_waiting")),
    },
  };

  const parsed = bossSchema.safeParse(rawData);

  if (!parsed.success) {
    return { error: "Campos inválidos", issues: parsed.error.format() };
  }

  await bossService.create(rawData);
  redirect("/servers");
}

export default createBoss;
