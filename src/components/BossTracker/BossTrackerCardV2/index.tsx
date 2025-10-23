import { TIMEZONE } from "@/constants";
import { BossTrackerSchemaFullPayload } from "@/schemas/bossTrackerSchema";
import { DateTime, Duration } from "luxon";

interface BossTrackerCardProps {
  boss: BossTrackerSchemaFullPayload;
  // actions?: Actions[];
}

export function getEventTimeRangeText(
  minSeconds: number,
  maxSeconds: number
): string {
  const now = DateTime.now().setZone(TIMEZONE);
  const minDate = DateTime.fromSeconds(minSeconds).setZone(TIMEZONE);
  const maxDate = DateTime.fromSeconds(maxSeconds).setZone(TIMEZONE);

  const minDiff = minDate.diff(now, ["hours", "minutes"]);
  const maxDiff = maxDate.diff(now, ["hours", "minutes"]);

  if (maxDiff.toMillis() <= 0) {
    return "O Tempo do Boss já passou.";
  }

  if (minDiff.toMillis() <= 0 && maxDiff.toMillis() > 0) {
    const maxText = formatDuration(maxDiff);
    return `O Boss pode nascer a qualquer momento até ${maxText}.`;
  }

  const minText = formatDuration(minDiff);
  const maxText = formatDuration(maxDiff);

  return `O boss pode nascer entre ${minText} e ${maxText}.`;
}

function formatDuration(duration: Duration): string {
  const hours = Math.floor(duration.hours ?? 0);
  const minutes = Math.floor(duration.minutes ?? 0);

  const parts: string[] = [];
  if (hours > 0) parts.push(`${hours} ${hours === 1 ? "hora" : "horas"}`);
  if (minutes > 0)
    parts.push(`${minutes} ${minutes === 1 ? "minuto" : "minutos"}`);

  return parts.join(" e ") || "menos de 1 minuto";
}

export default function BossTrackerCardV2({ boss }: BossTrackerCardProps) {
  return (
    <div
      className={`grow w-full bg-white rounded-2xl shadow-md border-l-6 transition-colors uppercase`}
    >
      <div className="flex flex-col md:flex-row">
        <div className="flex-1 p-4 border-b md:border-b-0 md:border-r border-gray-200 flex flex-col gap-2">
          <h2 className="text-xl font-bold text-blue-500">
            {boss.boss?.name} - {boss.server?.name} ({boss.server?.type})
          </h2>
          <p>
            {getEventTimeRangeText(
              Number(boss.min_time_rebirth.seconds),
              Number(boss.max_time_rebirth.seconds)
            )}
          </p>
          {/* <p className="text-black">
            Tempo Minimo:{" "}
            {formatSecondsToDate(Number(boss.min_time_rebirth.seconds))}
          </p>
          <p className="text-black">
            Tempo Maximo:{" "}
            {formatSecondsToDate(Number(boss.max_time_rebirth.seconds))}
          </p> */}
        </div>
      </div>
    </div>
  );
}
