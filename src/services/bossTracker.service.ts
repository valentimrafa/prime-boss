import { calculateNextBossDateTime } from "@/utils/date";
import { bossTrackerRepository } from "@/repositories/bossTrackerRepository";
import { ICrudRepository } from "@/repositories/interfaces/ICrudRepository";
import {
  BossTrackerSchemaStoreInput,
  BossTrackerSchemaPayload,
  BossTrackerSchemaFormInput,
  BossTrackerSchemaFullPayload,
} from "@/schemas/bossTrackerSchema";
import { serverService } from "./server.service";
import { bossService } from "./boss.service";
import { WithCache } from "@/decorators/withCache";
import { revalidateTag } from "next/cache";

class BossTrackerService {
  constructor(
    private repository: ICrudRepository<
      BossTrackerSchemaPayload,
      BossTrackerSchemaStoreInput
    >
  ) {}

  async create(data: BossTrackerSchemaFormInput) {
    const storeData: BossTrackerSchemaStoreInput = {
      idBoss: data.idBoss,
      idServer: data.idServer,
      status: data.status,
      rebirth: calculateNextBossDateTime(data.nextRebirthHour),
    };
    revalidateTag("tracker:getall");
    await this.repository.create(storeData);
  }

  async update(id: string, data: Partial<BossTrackerSchemaFormInput>) {
    const storeData: Partial<BossTrackerSchemaStoreInput> = {
      ...data,
      ...(data.nextRebirthHour && {
        rebirth: calculateNextBossDateTime(data.nextRebirthHour),
      }),
    };
    revalidateTag("tracker:getall");

    await this.repository.update(id, storeData);
  }

  async delete(id: string) {
    await this.repository.delete(id);
    revalidateTag("tracker:getall");
  }

  @WithCache({ revalidate: 600, key: () => ["tracker:getall"] })
  async getAll(): Promise<BossTrackerSchemaFullPayload[]> {
    const trackedBosses = await this.repository.getAll();
    const data = await Promise.all(
      trackedBosses.map(async (bossTrack) => {
        return {
          id: bossTrack.id,
          boss: await bossService.getById(bossTrack.idBoss),
          server: await serverService.getById(bossTrack.idServer),
          status: bossTrack.status,
          rebirth: {
            seconds: bossTrack.rebirth.seconds,
            nanoseconds: bossTrack.rebirth.nanoseconds,
          },
        };
      })
    );

    const ordenedData = data.sort((a, b) => {
      if (a.rebirth.seconds < b.rebirth.seconds) {
        return -1;
      }
      if (a.rebirth.seconds > b.rebirth.seconds) {
        return 1;
      }

      return 0;
    });
    return ordenedData;
  }
}

export const bossTrackerService = new BossTrackerService(bossTrackerRepository);
