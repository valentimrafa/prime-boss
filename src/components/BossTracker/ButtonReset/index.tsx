"use client";
import resetBossTrackerAction from "@/actions/boss-tracker/resetBossTracker";
import Spinner from "@/components/ui/Spinner";
import { useActionState } from "react";

export default function ButtonReset() {
  const [, action, isPending] = useActionState(resetBossTrackerAction, null);
  return (
    <form action={action}>
      <button
        className="cursor-pointer px-4 py-2 border text-white bg-red-500 border-red-500 rounded hover:bg-red-500 hover:brightness-90 transition"
        disabled={isPending}
      >
        {isPending ? <Spinner width={16} height={16} /> : "Resetar"}
      </button>
    </form>
  );
}
