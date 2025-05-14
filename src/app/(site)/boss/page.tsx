"use server";

import { bossService } from "@/services/boss.service";
import Link from "next/link";
import deleteBoss from "./actions/deleteBoss";
import { unstable_cache } from "next/cache";

export const getBoss = unstable_cache(
  async () => {
    return await bossService.getAll();
  },
  ["get:boss"],
  { revalidate: 300, tags: ["get:boss"] }
);

async function BossPage() {
  const bosses = await getBoss();
  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold">Servidores</h1>
        <Link
          href="/boss/new"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Novo Boss
        </Link>
      </div>

      <table className="w-full border text-left">
        <thead>
          <tr>
            <th className="border px-2 py-1">Nome</th>
            <th className="border px-2 py-1">Mapa</th>
            <th className="border px-2 py-1">Ações</th>
          </tr>
        </thead>
        <tbody>
          {bosses.map((boss) => (
            <tr key={boss.id}>
              <td className="border px-2 py-1">{boss.name}</td>
              <td className="border px-2 py-1">{boss.map}</td>
              <td className="border px-2 py-1 space-x-2">
                <Link href={`/boss/edit/${boss.id}`} className="text-blue-600">
                  Editar
                </Link>
                <form action={deleteBoss.bind(null, boss.id!)}>
                  <button type="submit" className="text-red-600 cursor-pointer">
                    Deletar
                  </button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BossPage;
