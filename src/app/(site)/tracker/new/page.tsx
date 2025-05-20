import { getAllServers } from "@/lib/cache/data/server";
import FormNewTracker from "./form";
import { bossService } from "@/services/boss.service";

async function NewTrackerPage() {
  const servers = await getAllServers();
  const bosses = await bossService.getAll();

  return (
    <section className="p-8">
      <FormNewTracker servers={servers} bosses={bosses} />
    </section>
  );
}

export default NewTrackerPage;
