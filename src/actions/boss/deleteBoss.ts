"use server";

import { bossService } from "@/services/boss.service";
import { redirect } from "next/navigation";

async function deleteBoss(id: string) {
  await bossService.delete(id);
  redirect("/boss");
}

export default deleteBoss;
