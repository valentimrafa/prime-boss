import BossTrackerFilters from "@/components/BossTracker/BossTrackerFilters";
import { BossTrackerList } from "@/components/BossTracker/BossTrackerList";
import { bossService } from "@/services/boss.service";
import { bossTrackerService } from "@/services/bossTracker.service";
import { serverService } from "@/services/server.service";
import Link from "next/link";

async function BossTrackerPage() {
  const servers = await serverService.getAll();
  const bosses = await bossService.getAll();
  const bossTrackerList = await bossTrackerService.getAll();
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex justify-between">
        <BossTrackerFilters servers={servers} bosses={bosses} />
        <Link
          href="/tracker/new"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          + Novo Tracker
        </Link>
      </div>
      <BossTrackerList bossTrackerList={bossTrackerList} />
    </div>
  );
}

export default BossTrackerPage;
