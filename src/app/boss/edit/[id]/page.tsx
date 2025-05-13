"use server";

import { bossService } from "@/services/boss.service";
import BossEditForm from "./Form";
import { notFound } from "next/navigation";

async function BossEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const boss = await bossService.getById(id);
  if (!boss) {
    return notFound();
  }
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Cadastrar Novo Boss</h1>
      <BossEditForm id={id} boss={boss} />
    </div>
  );
}

export default BossEditPage;
