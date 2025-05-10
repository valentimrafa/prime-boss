import {
  bossTrackerPayload,
  bossTrackerInput,
} from "@/schemas/bossTrackerSchema";
import { FirestoreCrudRepository } from "./base/firestore/FirestoreCrudRepository";
import { COLLECTIONS } from "@/lib/firebase/collections";

class BossTrackerRepository extends FirestoreCrudRepository<
  bossTrackerPayload,
  bossTrackerInput
> {
  constructor() {
    super(COLLECTIONS.BOSS_TRACKER);
  }
}

export const bossTrackerRepository = new BossTrackerRepository();
