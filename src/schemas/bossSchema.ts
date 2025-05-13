import { z } from "zod";

export const bossSchema = z.object({
  name: z.string().min(3),
  map: z.string().min(3),
  rules: z.object({
    min_time: z.number(),
    max_time: z.number(),
    time_waiting: z.number(),
  }),
});

export const bossSchemaWithId = bossSchema.extend({
  id: z.string(),
});

export type BossSchemaPayload = z.infer<typeof bossSchemaWithId>;
export type BossSchemaInput = z.infer<typeof bossSchema>;
