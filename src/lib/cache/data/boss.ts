import { bossService } from "@/services/boss.service";
import { unstable_cache } from "next/cache";

export const getAllBosses = unstable_cache(
  async () => {
    return await bossService.getAll();
  },
  ["get:boss"],
  { revalidate: 300, tags: ["get:boss"] }
);
