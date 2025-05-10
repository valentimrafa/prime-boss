import { z } from "zod";

export const bossTrackerSchema = z.object({
  boss: z.string().min(1),
  map: z.string(),
  server: z.string().min(1),
  status: z.string(),
  nascimento: z.object({
    seconds: z.number(),
    nanoseconds: z.number(),
  }),
});

export const bossTrackerSchemaWithId = bossTrackerSchema.extend({
  id: z.string().optional(),
});

export type bossTrackerPayload = z.infer<typeof bossTrackerSchemaWithId>;

export const bossTrackerSchemaInput = z.object({
  boss: z.string().min(1),
  map: z.string(),
  server: z.string().min(1),
  status: z.string(),
  nascimento: z.date(),
});

export type bossTrackerInput = z.infer<typeof bossTrackerSchemaWithId>;
