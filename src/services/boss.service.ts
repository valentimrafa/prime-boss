import { WithCache } from "@/decorators/withCache";
import { bossRepository } from "@/repositories/bossRepository";
import { ICrudRepository } from "@/repositories/interfaces/ICrudRepository";
import {
  BossSchemaPayload,
  BossSchemaInput,
  bossSchema,
} from "@/schemas/bossSchema";
import { revalidateTag } from "next/cache";

class BossService {
  constructor(
    private repository: ICrudRepository<BossSchemaPayload, BossSchemaInput>
  ) {}

  @WithCache<{ id: string }[], { id: string }>({
    key: ([id]) => [`boss:${id}`],
    revalidate: 6000,
  })
  async getById(id: string) {
    return this.repository.getById(id);
  }

  @WithCache({ revalidate: 500, key: () => ["boss:getall"] })
  async getAll() {
    return this.repository.getAll();
  }

  async create(data: BossSchemaInput) {
    const parsed = bossSchema.safeParse(data);
    if (!parsed.success) {
      throw new Error(parsed.error.errors.map((e) => e.message).join(", "));
    }

    const boss = await this.repository.create(parsed.data);
    revalidateTag("boss:getall");
    return boss;
  }

  async update(id: string, data: BossSchemaInput) {
    const boss = await this.repository.update(id, data);
    revalidateTag(`boss:${id}`);
    revalidateTag("boss:getall");
    return boss;
  }

  async delete(id: string) {
    const boss = this.repository.delete(id);
    revalidateTag(`boss:${id}`);
    revalidateTag("boss:getall");
    return boss;
  }
}

export const bossService = new BossService(bossRepository);
