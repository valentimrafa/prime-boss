import { ICrudRepository } from "@/repositories/interfaces/ICrudRepository";
import { serverRepository } from "@/repositories/serverRepository";
import { ServerInput, serverSchema } from "@/schemas/serverSchema";

class ServerService {
  constructor(private repository: ICrudRepository<ServerInput>) {}

  async create(data: ServerInput) {
    const parsed = serverSchema.safeParse(data);
    if (!parsed.success) {
      throw new Error(parsed.error.errors.map((e) => e.message).join(", "));
    }

    return this.repository.create(parsed.data);
  }
  async getAll() {
    return this.repository.getAll();
  }
  async find() {
    return this.repository.findBy([
      { field: "name", op: "==", value: "rafael" },
    ]);
  }
}

export const serverService = new ServerService(serverRepository);
