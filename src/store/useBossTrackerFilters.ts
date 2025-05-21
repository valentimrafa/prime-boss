import { StatusType } from "@/schemas/bossTrackerSchema";
import { create } from "zustand";

interface FiltersStore {
  selectedServers: string[];
  selectedBosses: string[];
  selectedStatus: StatusType;

  setSelectedServers: (servers: string[]) => void;
  setSelectedBosses: (bosses: string[]) => void;
  setSelectedStatus: (status: StatusType) => void;
}

export const useBossTrackerFilters = create<FiltersStore>((set) => ({
  selectedServers: [],
  selectedBosses: [],
  selectedStatus: "PENDENTE",

  setSelectedServers: (servers) => set(() => ({ selectedServers: servers })),

  setSelectedBosses: (bosses) => set(() => ({ selectedBosses: bosses })),

  setSelectedStatus: (status) => set(() => ({ selectedStatus: status })),
}));
