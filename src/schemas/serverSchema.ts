import { z } from "zod";

export const serverTypes = ["VIP", "FREE"] as const;

export type ServerTypes = (typeof serverTypes)[number];

export const serverSchema = z.object({
  name: z.string().min(3),
  type: z.enum(serverTypes),
  maxLevel: z.number().min(1),
  active: z.boolean(),
});

export const serverSchemaWithId = serverSchema.extend({
  id: z.string().optional(),
});

export type ServerSchemaPayload = z.infer<typeof serverSchemaWithId>;
