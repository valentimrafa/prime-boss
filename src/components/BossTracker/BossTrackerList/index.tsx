"use client";

import { BossTrackerSchemaFullPayload } from "@/schemas/bossTrackerSchema";
import { BossTrackerCard } from "../BossTrackerCard";
import { useBossTrackerFilters } from "@/store/useBossTrackerFilters";

interface BossTrackerListProps {
  bossTrackerList: BossTrackerSchemaFullPayload[];
}

export function BossTrackerList({ bossTrackerList }: BossTrackerListProps) {
  const { selectedServers, selectedBosses, selectedStatus } =
    useBossTrackerFilters();

  const filteredList = bossTrackerList.filter((boss) => {
    const matchServer =
      selectedServers.length === 0 ||
      selectedServers.includes(boss.server?.id || "");
    const matchBoss =
      selectedBosses.length === 0 ||
      selectedBosses.includes(boss.boss?.id || "");
    const matchStatus = !selectedStatus || boss.status === selectedStatus;
    return matchServer && matchBoss && matchStatus;
  });
  return (
    <div className="flex flex-col gap-4">
      {filteredList.map((boss) => {
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
