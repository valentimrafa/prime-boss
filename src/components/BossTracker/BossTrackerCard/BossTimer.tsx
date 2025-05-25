import { useEffect, useState } from "react";
import { DateTime, Duration } from "luxon";

interface BossTimerProps {
  time: string;
}

export default function BossTimer({ time: targetTimestamp }: BossTimerProps) {
  const [remainingTime, setRemainingTime] = useState(Duration.fromMillis(0));

  useEffect(() => {
    const targetTime = DateTime.fromSeconds(Number(targetTimestamp), {
      zone: "America/Sao_Paulo",
    });

    const updateTimer = () => {
      const now = DateTime.now().setZone("America/Sao_Paulo");
      const diff = targetTime
        .diff(now, ["hours", "minutes", "seconds"])
        .shiftTo("hours", "minutes", "seconds");

      if (diff.toMillis() <= 0) {
        setRemainingTime(Duration.fromMillis(0));
        clearInterval(interval);
      } else {
        setRemainingTime(diff);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 10000);

    return () => clearInterval(interval);
  }, [targetTimestamp]);
  let formatted = "";
  if (remainingTime.hours) {
    formatted = `Faltam ${String(remainingTime.hours).padStart(
      2,
      "0"
    )} Hora(s) e ${String(remainingTime.minutes).padStart(
      2,
      "0"
    )} minuto(s) para o boss nascer`;
  } else {
    formatted = `Faltam  ${String(remainingTime.minutes).padStart(
      2,
      "0"
    )} minuto(s) para o boss nascer`;
  }

  return (
    <p className="font-bold bg-green-100 px-4 py-2 rounded-sm">{formatted}</p>
  );
}
