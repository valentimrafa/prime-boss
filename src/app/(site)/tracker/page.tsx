import { BossTrackerList } from "@/components/BossTrackerList";
import { bossTrackerService } from "@/services/bossTracker.service";

async function BossTrackerPage() {
  const bossTrackerList = await bossTrackerService.getAll();
  return (
    <div className=" p-4">
      <BossTrackerList bossTrackerList={bossTrackerList} />
    </div>
  );
}

export default BossTrackerPage;
