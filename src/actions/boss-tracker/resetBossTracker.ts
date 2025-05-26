"use server";
import { bossTrackerService } from "@/services/bossTracker.service";

import { redirect } from "next/navigation";

async function resetBossTrackerAction() {
  await bossTrackerService.resetBosses();

  redirect("/tracker");
}

export default resetBossTrackerAction;
