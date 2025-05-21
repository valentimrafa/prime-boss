import { z } from "zod";

export const serverTypes = ["VIP", "FREE"] as const;

export type ServerTypes = (typeof serverTypes)[number];

export const serverSchemaInput = z.object({
  name: z.string().min(3),
  type: z.enum(serverTypes),
  maxLevel: z.number().min(1),
  active: z.boolean(),
});

export const serverSchemaWithId = serverSchemaInput.extend({
  id: z.string(),
});

export type ServerSchemaInput = z.infer<typeof serverSchemaInput>;
export type ServerSchemaPayload = z.infer<typeof serverSchemaWithId>;
