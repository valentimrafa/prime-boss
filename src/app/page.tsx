"use server";

import { bossTrackerService } from "@/services/bossTracker.service";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const cookieStore = await cookies();
  const session = cookieStore.get("token");

  if (!session) {
    redirect("/login");
  }

  const bosses = await bossTrackerService.getAll();

  const sortedBosses = bosses.sort((a, b) => {
    if (a.nascimento.seconds > b.nascimento.seconds) {
      return 1;
    }

    if (a.nascimento.seconds < b.nascimento.seconds) {
      return -1;
    }

    return 0;
  });

  return (
    <div>
      {sortedBosses.map((boss) => {
        const date = new Date(boss.nascimento.seconds * 1000);
        const formatter = new Intl.DateTimeFormat("pt-BR", {
          timeZone: "America/Sao_Paulo",
          dateStyle: "full",
          timeStyle: "short",
        });

        const now = new Date();

        const diffMs = date.getTime() - now.getTime();

        const diffMinutes = Math.floor(diffMs / (1000 * 60));
        const hours = Math.floor(diffMinutes / 60);
        const minutes = diffMinutes % 60;
        return (
          <div className="bg-gray-400 rounded-xl p-2 mt-2" key={boss.id}>
            <p>
              {boss.boss} ({boss.map})
            </p>
            <p>Server: {boss.server}</p>
            <p className="text-blue-500">
              Nascimento: {formatter.format(date)}
            </p>
            {diffMs > 0 ? (
              <p className="text-blue-500">{`Faltam ${hours} horas e ${minutes} minutos`}</p>
            ) : (
              <p>Boss já nasceu falta marcação novo horario</p>
            )}
            <p>status: {boss.status}</p>
          </div>
        );
      })}
    </div>
  );
}
