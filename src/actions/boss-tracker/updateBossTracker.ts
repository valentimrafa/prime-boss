"use server";

import {
  bossTrackerSchemaFormInput,
  BossTrackerSchemaFormInput,
} from "@/schemas/bossTrackerSchema";
import { bossTrackerService } from "@/services/bossTracker.service";
import { redirect } from "next/navigation";

export async function updateBossTracker(
  id: string,
  data: Partial<BossTrackerSchemaFormInput>
) {
  const parsed = bossTrackerSchemaFormInput.safeParse(data);

  if (!parsed.success) {
    return { error: "Campos inválidos", issues: parsed.error.format() };
  }
  await bossTrackerService.update(id, data);
  redirect("/tracker");
}

export async function updateBossTrackStatus(
  id: string,
  data: Partial<BossTrackerSchemaFormInput>
) {
  await bossTrackerService.update(id, data);

  redirect("/tracker");
}
