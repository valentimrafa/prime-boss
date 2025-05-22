"use server";

import { bossTrackerService } from "@/services/bossTracker.service";
import { redirect } from "next/navigation";

async function deleteBossTracker(id: string) {
  await bossTrackerService.delete(id);

  redirect("/tracker");
}

export default deleteBossTracker;
