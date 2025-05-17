import { FirestoreCrudRepository } from "./base/firestore/FirestoreCrudRepository";
import { COLLECTIONS } from "@/lib/firebase/collections";
import {
  BossTrackerSchemaStoreInput,
  BossTrackerSchemaPayload,
} from "@/schemas/bossTrackerSchema";

class BossTrackerRepository extends FirestoreCrudRepository<
  BossTrackerSchemaPayload,
  BossTrackerSchemaStoreInput
> {
  constructor() {
    super(COLLECTIONS.TRACKER);
  }
}

export const bossTrackerRepository = new BossTrackerRepository();
