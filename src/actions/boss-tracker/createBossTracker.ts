"use server";

import {
  bossTrackerSchemaFormInput,
  BossTrackerSchemaFormInput,
} from "@/schemas/bossTrackerSchema";
import { bossTrackerService } from "@/services/bossTracker.service";
import { redirect } from "next/navigation";

async function createBossTracker(formData: FormData) {
  const rawData: BossTrackerSchemaFormInput = {
    idBoss: String(formData.get("boss")),
    idServer: String(formData.get("server")),
    minTimeRebirthHour: String(formData.get("min_rebirth")),
    maxTimeRebirthHour: String(formData.get("max_rebirth")),
    status: "PENDENTE",
  };

  const parsed = bossTrackerSchemaFormInput.safeParse(rawData);

  if (!parsed.success) {
    return { error: "Campos inválidos", issues: parsed.error.format() };
  }
  await bossTrackerService.create(rawData);
  redirect("/tracker");
}

export default createBossTracker;
