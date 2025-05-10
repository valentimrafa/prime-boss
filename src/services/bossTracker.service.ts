import { bossTrackerRepository } from "@/repositories/bossTrackerRepository";
import { ICrudRepository } from "@/repositories/interfaces/ICrudRepository";
import {
  bossTrackerInput,
  bossTrackerPayload,
} from "@/schemas/bossTrackerSchema";

class BossTrackerService {
  constructor(
    private repository: ICrudRepository<bossTrackerPayload, bossTrackerInput>
  ) {}

  async getAll() {
    const bossTracked = await this.repository.getAll();
    return bossTracked;
  }

  async create(data: bossTrackerInput) {
    return this.repository.create(data);
  }

  async update(id: string, data: bossTrackerInput) {
    return this.repository.update(id, data);
  }
}

export const bossTrackerService = new BossTrackerService(bossTrackerRepository);
