"use client";

import deleteBossTracker from "@/actions/boss-tracker/deleteBossTracker";
import { redirect } from "next/navigation";
import { FiTrash2 } from "react-icons/fi";
interface ButtonDeleteProps {
  id: string;
}
export default function ButtonDelete({ id }: ButtonDeleteProps) {
  async function actionDelete(id: string) {
    await deleteBossTracker(id);
    redirect("/tracker");
  }
  return (
    <form
      action={async () => {
        await actionDelete(id);
      }}
    >
      <button
        type="submit"
        className="cursor-pointer px-4 py-2 border text-white bg-red-500 border-red-500 rounded hover:bg-red-500 hover:brightness-90 transition"
      >
        <FiTrash2 />
      </button>
    </form>
  );
}
