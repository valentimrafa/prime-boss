"use client";
import createServer from "./action";

import { useActionState } from "react";

function Page() {
  const [state, formAction, pending] = useActionState(createServerAction, null);

  async function createServerAction(_prevState: unknown, formData: FormData) {
    return await createServer(formData);
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Cadastrar Novo Servidor</h1>

      <form action={formAction} className="space-y-4 max-w-md">
        <div>
          <label htmlFor="name">Nome</label>
          <input name="name" id="name" className="w-full border rounded p-2" />
          {state?.errors?.name && (
            <p className="text-red-500">{state.errors.name[0]}</p>
          )}
        </div>

        <div>
          <label htmlFor="type">Tipo</label>
          <select name="type" id="type" className="w-full border rounded p-2">
            <option value="VIP">VIP</option>
            <option value="Free">FREE</option>
          </select>
          {state?.errors?.type && (
            <p className="text-red-500">{state.errors.type[0]}</p>
          )}
        </div>

        <div>
          <label htmlFor="maxLevel">Level Máximo</label>
          <input
            type="number"
            name="maxLevel"
            id="maxLevel"
            className="w-full border rounded p-2"
          />
          {state?.errors?.maxLevel && (
            <p className="text-red-500">{state.errors.maxLevel[0]}</p>
          )}
        </div>

        <div>
          <label htmlFor="active">Está Ativo?</label>
          <select
            name="active"
            id="active"
            className="w-full border rounded p-2"
          >
            <option value="true">Sim</option>
            <option value="false">Não</option>
          </select>
          {state?.errors?.active && (
            <p className="text-red-500">{state.errors.active[0]}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={pending}
        >
          {!pending ? "Criar Servidor" : ""}
        </button>

        {state?.message && <p className="mt-2 text-sm">{state.message}</p>}
      </form>
    </div>
  );
}

export default Page;
