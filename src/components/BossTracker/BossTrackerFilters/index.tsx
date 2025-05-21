"use client";

import { useBossTrackerFilters } from "@/store/useBossTrackerFilters";
import { ServerSchemaPayload } from "@/schemas/serverSchema";
import { BossSchemaPayload } from "@/schemas/bossSchema";
import { StatusType } from "@/schemas/bossTrackerSchema";
import { useEffect, useRef, useState } from "react";
import { FiChevronDown } from "react-icons/fi";

interface BossTrackerFiltersProps {
  servers: ServerSchemaPayload[];
  bosses: BossSchemaPayload[];
}

export default function BossTrackerFilters({
  servers,
  bosses,
}: BossTrackerFiltersProps) {
  const {
    selectedServers,
    selectedBosses,
    selectedStatus,
    setSelectedServers,
    setSelectedBosses,
    setSelectedStatus,
  } = useBossTrackerFilters();

  const serversRef = useRef<HTMLDivElement>(null);
  const bossesRef = useRef<HTMLDivElement>(null);

  const [openDropdown, setOpenDropdown] = useState<"servers" | "bosses" | null>(
    null
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      serversRef.current?.contains(event.target as Node) ||
      bossesRef.current?.contains(event.target as Node)
    ) {
      return;
    }
    setOpenDropdown(null);
  };

  const toggleDropdown = (key: "servers" | "bosses") => {
    setOpenDropdown((prev) => (prev === key ? null : key));
  };

  const handleToggleItem = (
    id: string,
    selected: string[],
    setFn: (items: string[]) => void
  ) => {
    if (selected.includes(id)) {
      setFn(selected.filter((item) => item !== id));
    } else {
      setFn([...selected, id]);
    }
  };

  const ordenedServers = servers.sort((a, b) => {
    const aSplitedName = Number(a.name.split(" ")[1]);
    const bSplitedName = Number(b.name.split(" ")[1]);

    if (aSplitedName > bSplitedName) {
      return 1;
    }
    if (aSplitedName < bSplitedName) {
      return -1;
    }

    return 0;
  });

  return (
    <div className="flex flex-wrap gap-4 items-center ">
      {/* Servidores Dropdown */}
      <div className="relative" ref={serversRef}>
        <button
          className="bg-white border px-4 py-2 rounded-lg shadow hover:bg-gray-50 flex items-center gap-2"
          onClick={() => toggleDropdown("servers")}
        >
          Servidores
          <FiChevronDown size={16} />
        </button>
        {openDropdown === "servers" && (
          <div className="absolute z-10 mt-2 w-56 bg-white border rounded-lg shadow-lg max-h-64 overflow-y-auto">
            {ordenedServers.map((server) => (
              <label
                key={server.id}
                className="flex items-center gap-2 p-2 hover:bg-gray-100"
              >
                <input
                  type="checkbox"
                  checked={selectedServers.includes(server.id!)}
                  onChange={() =>
                    handleToggleItem(
                      server.id!,
                      selectedServers,
                      setSelectedServers
                    )
                  }
                />
                {server.name}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Bosses Dropdown */}
      <div className="relative" ref={bossesRef}>
        <button
          className="bg-white border px-4 py-2 rounded-lg shadow hover:bg-gray-50 flex items-center gap-2"
          onClick={() => toggleDropdown("bosses")}
        >
          Bosses
          <FiChevronDown size={16} />
        </button>
        {openDropdown === "bosses" && (
          <div className="absolute z-10 mt-2 w-56 bg-white border rounded-lg shadow-lg max-h-64 overflow-y-auto">
            {bosses.map((boss) => (
              <label
                key={boss.id}
                className="flex items-center gap-2 p-2 hover:bg-gray-100"
              >
                <input
                  type="checkbox"
                  checked={selectedBosses.includes(boss.id)}
                  onChange={() =>
                    handleToggleItem(boss.id, selectedBosses, setSelectedBosses)
                  }
                />
                {boss.name}
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="flex">
        {(["PENDENTE", "MORTO"] as StatusType[]).map((status) => (
          <button
            key={status}
            onClick={() => setSelectedStatus(status)}
            className={`px-3 py-1 rounded-lg border text-sm ${
              selectedStatus === status
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-800 hover:bg-gray-100 border-gray-300"
            }`}
          >
            {status}
          </button>
        ))}
      </div>
    </div>
  );
}
