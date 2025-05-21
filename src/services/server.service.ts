import { WithCache } from "@/decorators/withCache";
import { ICrudRepository } from "@/repositories/interfaces/ICrudRepository";
import { serverRepository } from "@/repositories/serverRepository";
import {
  ServerSchemaInput,
  serverSchemaInput,
  ServerSchemaPayload,
} from "@/schemas/serverSchema";
import { revalidateTag } from "next/cache";

class ServerService {
  constructor(
    private repository: ICrudRepository<ServerSchemaPayload, ServerSchemaInput>
  ) {}

  @WithCache({ revalidate: 500, key: () => ["server:getall"] })
  async getAll() {
    return this.repository.getAll();
  }

  @WithCache<{ id: string }[], { id: string }>({
    key: ([id]) => [`server:${id}`],
    revalidate: 500,
  })
  async getById(id: string) {
    return this.repository.getById(id);
  }

  async create(data: ServerSchemaInput) {
    const parsed = serverSchemaInput.safeParse(data);
    if (!parsed.success) {
      throw new Error(parsed.error.errors.map((e) => e.message).join(", "));
    }
    revalidateTag("server:getall");
    return this.repository.create(parsed.data);
  }

  async update(id: string, data: ServerSchemaInput) {
    const server = this.repository.update(id, data);
    revalidateTag("server:getall");
    revalidateTag(`server:${id}`);
    return server;
  }

  async delete(id: string) {
    const server = this.repository.delete(id);
    revalidateTag("server:getall");
    revalidateTag(`server:${id}`);
    return server;
  }
}

export const serverService = new ServerService(serverRepository);
