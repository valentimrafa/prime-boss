import { bossService } from "@/services/boss.service";
import { unstable_cache } from "next/cache";

export const GET_ALL_BOSS_CACHE_KEY = "get:boss";
export const getAllBosses = unstable_cache(
  async () => {
    return await bossService.getAll();
  },
  [GET_ALL_BOSS_CACHE_KEY],
  { revalidate: 300, tags: [GET_ALL_BOSS_CACHE_KEY] }
);
