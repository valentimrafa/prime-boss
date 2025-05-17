"use client";

import { updateBossTrackStatus } from "@/actions/boss-tracker/updateBossTracker";
import { FaSkullCrossbones } from "react-icons/fa";

interface ButtonStatusProps {
  id: string;
}
export function ButtonStatus({ id }: ButtonStatusProps) {
  async function action() {
    await updateBossTrackStatus(id, { status: "MORTO" });
  }
  return (
    <form action={action}>
      <button className="cursor-pointer text-white px-4 py-2 bg-red-500 rounded hover:brightness-90">
        <FaSkullCrossbones size={19} />
      </button>
    </form>
  );
}
