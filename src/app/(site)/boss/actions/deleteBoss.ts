"use server";

import { GET_ALL_BOSS_CACHE_KEY } from "@/lib/cache/data/boss";
import { bossService } from "@/services/boss.service";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

async function deleteBoss(id: string) {
  await bossService.delete(id);
  revalidateTag(GET_ALL_BOSS_CACHE_KEY);
  redirect("/boss");
}

export default deleteBoss;
