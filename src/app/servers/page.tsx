// import { serverService } from "@/services/server.service";
import Link from "next/link";
// import deleteServer from "./actions/deleteAction";
import SERVERS from "./servers";

async function ServerPage() {
  // const servers = await serverService.getAll();
  const servers = SERVERS;

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold">Servidores</h1>
        <Link
          href="/servers/new"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Novo Servidor
        </Link>
      </div>

      <table className="w-full border text-left">
        <thead>
          <tr>
            <th className="border px-2 py-1">Nome</th>
            <th className="border px-2 py-1">Tipo</th>
            <th className="border px-2 py-1">Level Máximo</th>
            <th className="border px-2 py-1">Ativo</th>
            {/* <th className="border px-2 py-1">Ações</th> */}
          </tr>
        </thead>
        <tbody>
          {servers.map((s) => (
            <tr key={s.id}>
              <td className="border px-2 py-1">{s.name}</td>
              <td className="border px-2 py-1">{s.type}</td>
              <td className="border px-2 py-1">{s.maxLevel}</td>
              <td className="border px-2 py-1">{s.active ? "Sim" : "Não"}</td>
              {/* <td className="border px-2 py-1 space-x-2">
                <Link href={`/servers/edit/${s.id}`} className="text-blue-600">
                  Editar
                </Link>
                <form action={deleteServer.bind(null, s.id!)}>
                  <button type="submit" className="text-red-600">
                    Deletar
                  </button>
                </form>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ServerPage;
