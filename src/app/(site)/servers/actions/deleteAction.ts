"use server";

import { serverService } from "@/services/server.service";
import { redirect } from "next/navigation";

async function deleteServer(id: string) {
  await serverService.delete(id);

  redirect("/servers");
}

export default deleteServer;
