import { serverService } from "@/services/server.service";
import FormNewTracker from "./form";
import { bossService } from "@/services/boss.service";

async function NewTrackerPage() {
  const servers = await serverService.getAll();
  const bosses = await bossService.getAll();

  return (
    <section className="p-8">
      <FormNewTracker servers={servers} bosses={bosses} />
    </section>
  );
}

export default NewTrackerPage;
