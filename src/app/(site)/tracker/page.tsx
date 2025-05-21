import BossTrackerFilters from "@/components/BossTracker/BossTrackerFilters";
import { BossTrackerList } from "@/components/BossTracker/BossTrackerList";
import { bossService } from "@/services/boss.service";
import { bossTrackerService } from "@/services/bossTracker.service";
import { serverService } from "@/services/server.service";

async function BossTrackerPage() {
  const servers = await serverService.getAll();
  const bosses = await bossService.getAll();
  const bossTrackerList = await bossTrackerService.getAll();
  return (
    <div className="flex flex-col gap-4 p-4">
      <BossTrackerFilters servers={servers} bosses={bosses} />
      <BossTrackerList bossTrackerList={bossTrackerList} />
    </div>
  );
}

export default BossTrackerPage;
