"use client";

import { ToastContainer, toast } from "react-toastify";
import { updateBossTrackStatus } from "@/actions/boss-tracker/updateBossTracker";
import { FaSkullCrossbones } from "react-icons/fa";

interface ButtonStatusProps {
  id: string;
  disabled: boolean;
}
export function ButtonStatus({ id, disabled }: ButtonStatusProps) {
  async function action() {
    if (disabled) {
      toast.error("Ainda não pode matar o boss inseto!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      await updateBossTrackStatus(id, { status: "MORTO" });
    }
  }
  return (
    <form action={action}>
      <button className="cursor-pointer text-white px-4 py-2 bg-red-500 rounded hover:brightness-90">
        <FaSkullCrossbones size={19} />
      </button>
      <ToastContainer />
    </form>
  );
}
