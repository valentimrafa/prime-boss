"use client";

import { useActionState } from "react";
import { loginUser } from "./actions";

export function LoginForm() {
  const [state, formAction, pending] = useActionState(loginUserAction, null);

  async function loginUserAction(_prevState: unknown, formData: FormData) {
    return await loginUser(formData);
  }

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="username" className="block text-sm font-medium">
          Username
        </label>
        <input
          type="text"
          name="username"
          id="username"
          className="w-full border rounded px-3 py-2 outline-0"
        />
        {state?.issues?.username && (
          <p className="text-red-600 text-sm">
            {state.issues.username._errors.join(", ")}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          className="w-full border rounded px-3 py-2 outline-0"
        />
        {state?.issues?.password && (
          <p className="text-red-600 text-sm">
            {state.issues.password._errors.join(", ")}
          </p>
        )}
      </div>

      {state?.error && <p className="text-red-600 text-sm">{state.error}</p>}

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        disabled={pending}
      >
        {pending ? "Entrando" : "Entrar"}
      </button>
    </form>
  );
}
