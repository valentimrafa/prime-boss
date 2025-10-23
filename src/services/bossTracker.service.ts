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
      min_time_rebirth: calculateNextBossDateTime(data.minTimeRebirthHour),
      max_time_rebirth: calculateNextBossDateTime(data.maxTimeRebirthHour),
    };
    revalidateTag("tracker:getall");
    await this.repository.create(storeData);
  }

  async update(id: string, data: Partial<BossTrackerSchemaFormInput>) {
    // const storeData: Partial<BossTrackerSchemaStoreInput> = {
    //   ...data,
    //   ...(data.nextRebirthHour && {
    //     rebirth: calculateNextBossDateTime(data.nextRebirthHour),
    //   }),
    // };
    // revalidateTag("tracker:getall");
    // await this.repository.update(id, storeData);
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
          min_time_rebirth: {
            seconds: bossTrack.min_time_rebirth.seconds,
            nanoseconds: bossTrack.min_time_rebirth.nanoseconds,
          },
          max_time_rebirth: {
            seconds: bossTrack.max_time_rebirth.seconds,
            nanoseconds: bossTrack.max_time_rebirth.nanoseconds,
          },
        };
      })
    );

    const ordenedData = data.sort((a, b) => {
      if (a.min_time_rebirth.seconds < b.min_time_rebirth.seconds) {
        return -1;
      }
      if (a.min_time_rebirth.seconds > b.min_time_rebirth.seconds) {
        return 1;
      }

      return 0;
    });
    return ordenedData;
  }

  async resetBosses() {
    const trackedBosses = await this.repository.getAll();
    await Promise.all(
      trackedBosses.map(async (bossTrack) => {
        const newHour = calculateNextBossDateTime(`01:00`);

        await this.repository.update(bossTrack.id, {
          rebirth: newHour,
          status: "MORTO",
        });
      })
    );
    revalidateTag("tracker:getall");
  }
}

export const bossTrackerService = new BossTrackerService(bossTrackerRepository);
