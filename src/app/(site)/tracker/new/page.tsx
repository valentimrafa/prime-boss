import { getAllServers } from "@/lib/cache/data/server";
import FormNewTracker from "./form";
import { getAllBosses } from "@/lib/cache/data/boss";

async function NewTrackerPage() {
  const servers = await getAllServers();
  const bosses = await getAllBosses();

  return (
    <section className="p-8">
      <FormNewTracker servers={servers} bosses={bosses} />
    </section>
  );
}

export default NewTrackerPage;
