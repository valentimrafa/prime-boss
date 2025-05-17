"use client";

import { updateBossTrackStatus } from "@/actions/boss-tracker/updateBossTracker";
import { FiClock } from "react-icons/fi";
import Modal from "../Modal";
import { useState } from "react";
import InputTime from "../InputTime";

interface ButtonTimeProps {
  id: string;
  disabled: boolean;
}

export function ButtonTime({ id, disabled }: ButtonTimeProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  async function action(time: string) {
    await updateBossTrackStatus(id, {
      nextRebirthHour: time,
      status: "PENDENTE",
    });
  }

  return (
    <>
      <button
        className="cursor-pointer px-4 py-2 bg-blue-500 border border-blue-500 rounded hover:brightness-90 text-white transition"
        onClick={() => setIsModalOpen(true)}
        disabled={disabled}
      >
        <FiClock />
      </button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-xl font-semibold mb-4">Editar horário</h2>

        <form
          action={async (formData: FormData) => {
            await action(String(formData.get("nextRebirth")));
            setIsModalOpen(false);
          }}
          className="flex flex-col gap-4"
        >
          <InputTime
            name="nextRebirth"
            id="nextRebirth"
            label="Próximo Nascimento"
            required
            error={""}
          />
          <button
            type="submit"
            className="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-700 cursor-pointer"
          >
            Salvar novo horário
          </button>
        </form>
      </Modal>
    </>
  );
}
