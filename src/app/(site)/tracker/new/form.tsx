"use client";

import { BossSchemaPayload } from "@/schemas/bossSchema";
import { ServerSchemaPayload } from "@/schemas/serverSchema";
import { useActionState } from "react";
import createBossTracker from "@/actions/boss-tracker/createBossTracker";
import InputTime from "@/components/InputTime";

interface FormNewTrackerProps {
  servers: ServerSchemaPayload[];
  bosses: BossSchemaPayload[];
}

function FormNewTracker({ servers, bosses }: FormNewTrackerProps) {
  const [state, formAction, pending] = useActionState(createServerAction, null);

  async function createServerAction(_prevState: unknown, formData: FormData) {
    return await createBossTracker(formData);
  }
  return (
    <form action={formAction} className="space-y-4 max-w-md">
      <div>
        <label htmlFor="server">Server</label>
        <select name="server" id="server" className="w-full border rounded p-2">
          {servers.length &&
            servers.map((server) => (
              <option value={server.id} key={server.id}>
                {server.name}
              </option>
            ))}
        </select>
        {state?.issues?.idServer && (
          <p className="text-red-500">
            {state.issues.idServer._errors.join(", ")}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="boss">Boss</label>
        <select name="boss" id="boss" className="w-full border rounded p-2">
          {bosses.length &&
            bosses.map((boss) => (
              <option value={boss.id} key={boss.id}>
                {boss.name}
              </option>
            ))}
        </select>
        {state?.issues?.idBoss && (
          <p className="text-red-500">
            {state.issues.idBoss._errors.join(", ")}
          </p>
        )}
      </div>
      <InputTime
        name="rebirth"
        id="rebirth"
        label="Próximo Nascimento"
        required
        error={state?.issues?.nextRebirthHour?._errors?.join(", ")}
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
        disabled={pending}
      >
        {!pending ? "Criar Tracker" : "Criando..."}
      </button>

      {state?.error && <p className="text-red-600 text-sm">{state.error}</p>}
    </form>
  );
}

export default FormNewTracker;
