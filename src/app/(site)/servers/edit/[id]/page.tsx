import { serverService } from "@/services/server.service";

import { notFound } from "next/navigation";
import ServerUpdateForm from "./Form";

async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const server = await serverService.getById(id);

  if (!server) {
    return notFound();
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Alterar Servidor</h1>
      <ServerUpdateForm id={id} server={server} />
    </div>
  );
}

export default Page;
