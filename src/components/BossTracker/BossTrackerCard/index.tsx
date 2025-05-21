import { BossTrackerSchemaFullPayload } from "@/schemas/bossTrackerSchema";
import { DateTime } from "luxon";
import { ButtonStatus } from "./ButtonStatus";
import { ButtonTime } from "./ButtonTime";

type Actions = "exclude" | "edit" | "kill";

interface BossTrackerCardProps {
  boss: BossTrackerSchemaFullPayload;
  actions?: Actions[];
}

const TIMEZONE = "America/Sao_Paulo";

function getFormatedTime(timestamp: number, bossWaitingTime: number) {
  const bossDate = DateTime.fromSeconds(timestamp).setZone(TIMEZONE);

  const now = DateTime.now().setZone(TIMEZONE);

  const minDateTimeWaiting = bossDate.plus({
    hours: bossWaitingTime,
  });

  const formatted = bossDate.toFormat("dd/MM/yyyy HH:mm");

  const isFuture = bossDate > now;
  let timeToRebirthText = "";
  if (isFuture) {
    const diff = bossDate.diff(now, ["hours", "minutes"]).toObject();
    const hours = Math.floor(diff.hours ?? 0);
    const minutes = Math.floor(diff.minutes ?? 0);
    if (hours) {
      timeToRebirthText = `Faltam ${hours} horas e ${minutes} minutos para o boss nascer`;
    } else {
      timeToRebirthText = `Faltam ${minutes} minuto(s) para o boss nascer`;
    }
  }

  const formattedNextLiberationTime = minDateTimeWaiting
    .diff(now)
    .shiftTo("hours", "minutes")
    .toFormat("hh:mm");
  const waitingDateTimeHigherThanNow = now < minDateTimeWaiting;

  return {
    isFuture,
    timeToRebirthText,
    formatedDateTimeToRebirth: formatted,
    formattedNextLiberationTime,
    waitingDateTimeHigherThanNow,
  };
}

export function BossTrackerCard({ boss, actions = [] }: BossTrackerCardProps) {
  const {
    timeToRebirthText,
    formatedDateTimeToRebirth,
    formattedNextLiberationTime,
    isFuture,
    waitingDateTimeHigherThanNow,
  } = getFormatedTime(
    Number(boss.rebirth.seconds),
    Number(boss.boss?.rules.time_waiting)
  );

  const borderColor =
    boss.status === "MORTO" ? "border-red-500" : "border-green-500";
  const borderCardColorStatus =
    timeToRebirthText !== "" ? borderColor : "border-yellow-500";

  const blockButtonClock =
    boss.status === "MORTO" && waitingDateTimeHigherThanNow;
  return (
    <div
      className={`grow w-full bg-white rounded-2xl shadow-md border-l-6 transition-colors ${borderCardColorStatus} uppercase`}
    >
      <div className="flex flex-col md:flex-row">
        <div className="flex-1 p-4 border-b md:border-b-0 md:border-r border-gray-200 flex flex-col gap-2">
          <h2 className="text-xl font-bold text-blue-500">
            {boss.boss?.name} - {boss.server?.name} ({boss.server?.type})
          </h2>
          <p className="text-black">Nascimento: {formatedDateTimeToRebirth}</p>

          <p className="font-bold">
            {boss.status === "PENDENTE" && isFuture && (
              <span className="bg-green-100 px-4 py-2 rounded-sm">
                {timeToRebirthText}
              </span>
            )}

            {boss.status === "PENDENTE" && !isFuture && (
              <span className="bg-yellow-100 px-4 py-2 rounded-sm">
                BOSS ATRASADO
              </span>
            )}
            {boss.status === "MORTO" && waitingDateTimeHigherThanNow && (
              <span className="bg-red-100 px-4 py-2 rounded-sm">
                VAI SER LIBERADO DAQUI {formattedNextLiberationTime}
              </span>
            )}
            {boss.status === "MORTO" && !waitingDateTimeHigherThanNow && (
              <span className="bg-red-100 px-4 py-2 rounded-sm">
                BOSS AGUARDANDO NOVO HORÁRIO
              </span>
            )}
          </p>
        </div>
        <div className="flex gap-2 flex-wrap p-4 justify-center items-start md:items-center md:flex-col">
          {actions.includes("kill") && <ButtonStatus id={boss.id} />}
          {actions.includes("edit") && (
            <ButtonTime id={boss.id} disabled={blockButtonClock} />
          )}
          {/* {actions.includes("exclude") && (
            <button className="cursor-pointer px-4 py-2 border text-white bg-red-500 border-red-500 rounded hover:bg-red-500 hover:brightness-90 transition">
              <FiTrash2 />
            </button>
          )} */}
        </div>
      </div>
    </div>
  );
}
