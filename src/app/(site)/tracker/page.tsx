import { BossTrackerCard } from "@/components/BossTrackerCard";
import { bossTrackerService } from "@/services/bossTracker.service";

async function BossTrackerPage() {
  const BossTracker = await bossTrackerService.getAll();
  return (
    <div className="flex flex-col gap-4 p-4">
      {BossTracker.map((bossTrack) => {
        return (
          <BossTrackerCard
            key={bossTrack.id}
            bossTrack={bossTrack}
            actions={["edit", "kill", "exclude"]}
          />
        );
      })}
    </div>
  );
}

export default BossTrackerPage;
