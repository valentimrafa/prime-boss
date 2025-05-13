import { bossRepository } from "@/repositories/bossRepository";
import { ICrudRepository } from "@/repositories/interfaces/ICrudRepository";
import {
  BossSchemaPayload,
  BossSchemaInput,
  bossSchema,
} from "@/schemas/bossSchema";

class BossService {
  constructor(
    private repository: ICrudRepository<BossSchemaPayload, BossSchemaInput>
  ) {}

  async create(data: BossSchemaInput) {
    const parsed = bossSchema.safeParse(data);
    if (!parsed.success) {
      throw new Error(parsed.error.errors.map((e) => e.message).join(", "));
    }

    return this.repository.create(parsed.data);
  }

  async getById(id: string) {
    return this.repository.getById(id);
  }

  async update(id: string, data: BossSchemaInput) {
    return this.repository.update(id, data);
  }

  async delete(id: string) {
    return this.repository.delete(id);
  }

  async getAll() {
    return this.repository.getAll();
  }
}

export const bossService = new BossService(bossRepository);
