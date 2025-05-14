import { serverService } from "@/services/server.service";
import { unstable_cache } from "next/cache";

export const getAllServers = unstable_cache(
  async () => {
    return await serverService.getAll();
  },
  ["get:servers"],
  { revalidate: 300, tags: ["get:servers"] }
);
