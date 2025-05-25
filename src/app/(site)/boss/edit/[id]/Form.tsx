"use client";

import { useActionState } from "react";
import updateAction from "@/actions/boss/updateAction";
import { BossSchemaPayload } from "@/schemas/bossSchema";

interface BossEditPageProps {
  id: string;
  boss: BossSchemaPayload;
}

function BossEditForm({ id, boss }: BossEditPageProps) {
  const [state, formAction, pending] = useActionState(updateBossAction, null);

  async function updateBossAction(_prevState: unknown, formData: FormData) {
    return await updateAction(id, formData);
  }
  return (
    <form action={formAction} className="space-y-4 max-w-md">
      <div>
        <label htmlFor="name">Nome</label>
        <input
          name="name"
          id="name"
          className="w-full border rounded p-2"
          defaultValue={boss.name}
        />
        {state?.issues?.name && (
          <p className="text-red-500">{state.issues.name._errors.join(", ")}</p>
        )}
      </div>

      <div>
        <label htmlFor="map">Mapa</label>
        <input
          name="map"
          id="map"
          className="w-full border rounded p-2"
          defaultValue={boss.map}
        />
        {state?.issues?.map && (
          <p className="text-red-500">{state.issues.map._errors.join(", ")}</p>
        )}
      </div>

      <div>
        <label htmlFor="min_time">Tempo Minimo</label>
        <input
          name="min_time"
          id="min_time"
          className="w-full border rounded p-2"
          type="number"
          defaultValue={boss.rules.min_time}
        />
        {state?.issues?.rules?.min_time && (
          <p className="text-red-500">
            {state.issues.rules.min_time._errors.join(", ")}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="max_time">Tempo Maximo</label>
        <input
          name="max_time"
          id="max_time"
          className="w-full border rounded p-2"
          type="number"
          defaultValue={boss.rules.max_time}
        />
        {state?.issues?.rules?.max_time && (
          <p className="text-red-500">
            {state.issues.rules.max_time._errors.join(", ")}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="time_waiting">Tempo de Espera</label>
        <input
          name="time_waiting"
          id="time_waiting"
          className="w-full border rounded p-2"
          type="number"
          defaultValue={boss.rules.time_waiting}
        />
        {state?.issues?.rules?.time_waiting && (
          <p className="text-red-500">
            {state.issues.rules.time_waiting._errors.join(", ")}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
        disabled={pending}
      >
        {!pending ? "Editar Boss" : "Salvando..."}
      </button>

      {state?.error && <p className="text-red-600 text-sm">{state.error}</p>}
    </form>
  );
}

export default BossEditForm;
