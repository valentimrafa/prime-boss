import { updateBossTrackStatus } from "@/actions/boss-tracker/updateBossTracker";
import Spinner from "@/components/ui/Spinner";
import { TIMEZONE } from "@/constants";
import { DateTime } from "luxon";
import { useActionState } from "react";
import { FiCheck } from "react-icons/fi";

interface LateBossProps {
  rebirth: string;
  minTimeRespawn: number;
  id: string;
}

async function serverActionUpdate(
  prevState: unknown,
  payload: { id: string; minTimeRespawn: number }
) {
  const { id, minTimeRespawn } = payload;

  await updateBossTrackStatus(id, {
    nextRebirthHour: `${String(minTimeRespawn)}:00`,
    status: "PENDENTE",
  });

  return { success: true };
}

export default function LateBoss({
  rebirth,
  minTimeRespawn,
  id,
}: LateBossProps) {
  const [, action, isPending] = useActionState(serverActionUpdate, {
    success: false,
  });

  const bossDate = DateTime.fromSeconds(Number(rebirth)).setZone(TIMEZONE);
  const possibleNextRebirth = bossDate.plus({
    minutes: minTimeRespawn * 60 - 5,
  });

  return (
    <div className="bg-yellow-100 px-4 py-2 rounded-sm font-bold flex flex-col gap-2">
      <p>BOSS ATRASADO</p>
      <div className="flex gap-2">
        <p>
          Possível Proximo Nascimento{" "}
          {possibleNextRebirth.toFormat("dd/MM/yyyy HH:mm")}
        </p>
        <form action={() => action({ id, minTimeRespawn })}>
          <button
            type="submit"
            disabled={isPending}
            className="flex items-center justify-center cursor-pointer rounded w-6 h-6 bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? (
              <Spinner width={18} height={18} color="#ffffff" />
            ) : (
              <FiCheck color="#fff" size={18} />
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
