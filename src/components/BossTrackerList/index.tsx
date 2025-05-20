"use client";

import { BossTrackerSchemaFullPayload } from "@/schemas/bossTrackerSchema";
import { BossTrackerCard } from "./BossTrackerCard";

interface BossTrackerListProps {
  bossTrackerList: BossTrackerSchemaFullPayload[];
}

export function BossTrackerList({ bossTrackerList }: BossTrackerListProps) {
  return (
    <div className="flex flex-col gap-4">
      {bossTrackerList.map((boss) => {
        return (
          <BossTrackerCard
            key={boss.id}
            boss={boss}
            actions={["edit", "kill", "exclude"]}
          />
        );
      })}
    </div>
  );
}
