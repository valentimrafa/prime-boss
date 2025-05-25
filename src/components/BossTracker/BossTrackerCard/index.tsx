"use client";

import { BossTrackerSchemaFullPayload } from "@/schemas/bossTrackerSchema";
import { DateTime } from "luxon";
import { ButtonStatus } from "./ButtonStatus";
import { ButtonTime } from "./ButtonTime";
import ButtonDelete from "./ButtonDelete";
import BossTimer from "./BossTimer";
import LateBoss from "./LateBoss";
import { TIMEZONE } from "@/constants";

export type Actions = "exclude" | "edit" | "kill";

interface BossTrackerCardProps {
  boss: BossTrackerSchemaFullPayload;
  actions?: Actions[];
}

type BossStatus = {
  pending: boolean;
  late: boolean;
  waitingLiberationTime: boolean;
  waitingNewTime: boolean;
};

function getFormatedTime(timestamp: number, bossWaitingTime: number) {
  const bossDate = DateTime.fromSeconds(timestamp).setZone(TIMEZONE);

  const now = DateTime.now().setZone(TIMEZONE);

  const minDateTimeWaiting = bossDate.plus({
    hours: bossWaitingTime,
  });

  const formatted = bossDate.toFormat("dd/MM/yyyy HH:mm");

  const isFuture = bossDate > now;

  const formattedNextLiberationTime = minDateTimeWaiting
    .diff(now)
    .shiftTo("hours", "minutes")
    .toFormat("hh:mm");
  const waitingDateTimeHigherThanNow = now < minDateTimeWaiting;

  return {
    isFuture,
    formatedDateTimeToRebirth: formatted,
    formattedNextLiberationTime,
    waitingDateTimeHigherThanNow,
    minDateTimeWaiting,
  };
}

function getCardStatusColor(BOSS_STATUS: BossStatus) {
  if (BOSS_STATUS.pending) {
    return "border-green-400";
  }

  if (BOSS_STATUS.late) {
    return "border-yellow-400";
  }

  if (BOSS_STATUS.waitingLiberationTime) {
    return "border-red-400";
  }

  return "border-cyan-400";
}

export function BossTrackerCard({ boss, actions = [] }: BossTrackerCardProps) {
  const {
    formatedDateTimeToRebirth,
    formattedNextLiberationTime,
    isFuture,
    waitingDateTimeHigherThanNow,
  } = getFormatedTime(
    Number(boss.rebirth.seconds),
    Number(boss.boss?.rules.time_waiting)
  );

  const BOSS_STATUS: BossStatus = {
    pending: boss.status === "PENDENTE" && isFuture,
    late: boss.status === "PENDENTE" && !isFuture,
    waitingLiberationTime:
      boss.status === "MORTO" && waitingDateTimeHigherThanNow,
    waitingNewTime: boss.status === "MORTO" && !waitingDateTimeHigherThanNow,
  };

  const cardBorderColor = getCardStatusColor(BOSS_STATUS);

  return (
    <div
      className={`grow w-full bg-white rounded-2xl shadow-md border-l-6 transition-colors ${cardBorderColor} uppercase`}
    >
      <div className="flex flex-col md:flex-row">
        <div className="flex-1 p-4 border-b md:border-b-0 md:border-r border-gray-200 flex flex-col gap-2">
          <h2 className="text-xl font-bold text-blue-500">
            {boss.boss?.name} - {boss.server?.name} ({boss.server?.type})
          </h2>
          <p className="text-black">Nascimento: {formatedDateTimeToRebirth}</p>

          {BOSS_STATUS.pending && <BossTimer time={boss.rebirth.seconds} />}

          {BOSS_STATUS.late && (
            <div className="bg-yellow-100 px-4 py-2 rounded-sm font-bold flex flex-col gap-2">
              <p>BOSS ATRASADO</p>
            </div>
          )}
          <p className="font-bold">
            {BOSS_STATUS.waitingLiberationTime && (
              <span className="bg-red-100 px-4 py-2 rounded-sm">
                VAI SER LIBERADO DAQUI {formattedNextLiberationTime}
              </span>
            )}
            {BOSS_STATUS.waitingNewTime && (
              <span className="bg-cyan-100 px-4 py-2 rounded-sm">
                BOSS AGUARDANDO NOVO HORÁRIO
              </span>
            )}
          </p>
        </div>
        <div className="flex gap-2 flex-wrap p-4 justify-center items-start md:items-center md:flex-col">
          {actions.includes("kill") && (
            <ButtonStatus id={boss.id} disabled={isFuture} />
          )}
          {actions.includes("edit") && (
            <ButtonTime
              id={boss.id}
              disabled={BOSS_STATUS.waitingLiberationTime}
            />
          )}
          {actions.includes("exclude") && <ButtonDelete id={boss.id} />}
        </div>
      </div>
    </div>
  );
}
