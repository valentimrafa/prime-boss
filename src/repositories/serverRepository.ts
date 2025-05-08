import { FirestoreCrudRepository } from "./base/firestore/FirestoreCrudRepository";
import { COLLECTIONS } from "@/lib/firebase/collections";
import { ServerInput } from "@/schemas/serverSchema";

class ServerRepository extends FirestoreCrudRepository<ServerInput> {
  constructor() {
    super(COLLECTIONS.SERVERS);
  }
}

export const serverRepository = new ServerRepository();
