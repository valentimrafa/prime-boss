import { z } from "zod";
import { bossSchema } from "./bossSchema";
import { serverSchema } from "./serverSchema";

export const statusType = ["MORTO", "PENDENTE"] as const;

export type StatusType = (typeof statusType)[number];

export const bossTrackerSchemaFormInput = z.object({
  idBoss: z.string(),
  idServer: z.string(),
  status: z.enum(statusType),
  nextRebirthHour: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: "Formato de hora inválido. Use HH:MM",
  }),
});

export type BossTrackerSchemaFormInput = z.infer<
  typeof bossTrackerSchemaFormInput
>;

export const bossTrackerSchemaStoreInput = z.object({
  idBoss: z.string(),
  idServer: z.string(),
  status: z.enum(statusType),
  rebirth: z.date(),
});

export type BossTrackerSchemaStoreInput = z.infer<
  typeof bossTrackerSchemaStoreInput
>;

export const bossTrackerSchemaPayload = z.object({
  id: z.string(),
  idBoss: z.string(),
  idServer: z.string(),
  status: z.enum(statusType),
  rebirth: z.object({
    seconds: z.string(),
    nanoseconds: z.string(),
  }),
});

export type BossTrackerSchemaPayload = z.infer<typeof bossTrackerSchemaPayload>;

export const bossTrackerSchemaFullPayload = z.object({
  id: z.string(),
  boss: bossSchema.nullable(),
  server: serverSchema.nullable(),
  status: z.enum(statusType),
  rebirth: z.object({
    seconds: z.string(),
    nanoseconds: z.string(),
  }),
});

export type BossTrackerSchemaFullPayload = z.infer<
  typeof bossTrackerSchemaFullPayload
>;
