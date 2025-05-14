import { FirestoreCrudRepository } from "./base/firestore/FirestoreCrudRepository";
import { COLLECTIONS } from "@/lib/firebase/collections";
import { ServerSchemaPayload } from "@/schemas/serverSchema";

class ServerRepository extends FirestoreCrudRepository<ServerSchemaPayload> {
  constructor() {
    super(COLLECTIONS.SERVERS);
  }
}

export const serverRepository = new ServerRepository();
