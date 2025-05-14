"use client";

import { ServerInput } from "@/schemas/serverSchema";
import updateServer from "../../actions/updateAction";

import { useActionState } from "react";

interface ServerUpdateForm {
  id: string;
  server: ServerInput;
}

function ServerUpdateForm({ id, server }: ServerUpdateForm) {
  const [state, formAction, pending] = useActionState(updateServerAction, null);

  async function updateServerAction(_prevState: unknown, formData: FormData) {
    return await updateServer(id, formData);
  }
  return (
    <form action={formAction} className="space-y-4 max-w-md">
      <div>
        <label htmlFor="name">Nome</label>
        <input
          name="name"
          id="name"
          className="w-full border rounded p-2"
          defaultValue={server.name}
        />
        {state?.issues?.name && (
          <p className="text-red-500">{state.issues.name._errors.join(", ")}</p>
        )}
      </div>

      <div>
        <label htmlFor="type">Tipo</label>
        <select
          name="type"
          id="type"
          className="w-full border rounded p-2"
          defaultValue={server.type}
        >
          <option value="VIP">VIP</option>
          <option value="FREE">FREE</option>
        </select>
        {state?.issues?.type && (
          <p className="text-red-500">{state.issues.type._errors.join(", ")}</p>
        )}
      </div>

      <div>
        <label htmlFor="maxLevel">Level Máximo</label>
        <input
          type="number"
          name="maxLevel"
          id="maxLevel"
          className="w-full border rounded p-2"
          defaultValue={server.maxLevel}
        />
        {state?.issues?.maxLevel && (
          <p className="text-red-500">
            {state.issues.maxLevel._errors.join(", ")}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="active">Está Ativo?</label>
        <select
          name="active"
          id="active"
          className="w-full border rounded p-2"
          defaultValue={String(server.active)}
        >
          <option value="true">Sim</option>
          <option value="false">Não</option>
        </select>
        {state?.issues?.active && (
          <p className="text-red-500">
            {state.issues.active._errors.join(", ")}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
        disabled={pending}
      >
        {!pending ? "Alterar Servidor" : "Salvando..."}
      </button>

      {state?.error && <p className="mt-2 text-sm">{state.error}</p>}
    </form>
  );
}

export default ServerUpdateForm;
