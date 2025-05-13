import { FirestoreCrudRepository } from "./base/firestore/FirestoreCrudRepository";
import { COLLECTIONS } from "@/lib/firebase/collections";
import { BossSchemaPayload, BossSchemaInput } from "@/schemas/bossSchema";

class BossRepository extends FirestoreCrudRepository<
  BossSchemaPayload,
  BossSchemaInput
> {
  constructor() {
    super(COLLECTIONS.BOSS);
  }
}

export const bossRepository = new BossRepository();
