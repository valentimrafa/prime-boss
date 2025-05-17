import { DateTime } from "luxon";

export function calculateNextBossDateTime(hour: string) {
  const [hoursStr, minutesStr] = (hour as string).split(":");
  const hours = parseInt(hoursStr, 10);
  const minutes = parseInt(minutesStr, 10);

  const now = DateTime.now().setZone("America/Sao_Paulo");
  const rebirthDateTime = now.plus({ hours, minutes });

  return rebirthDateTime.toJSDate();
}
