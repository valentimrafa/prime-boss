import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  doc,
  CollectionReference,
  WhereFilterOp,
} from "firebase/firestore";
import { db } from "@/lib/firebase/db";
import { ICrudRepository } from "../../interfaces/ICrudRepository";
import { COLLECTIONS } from "@/lib/firebase/collections";
import { query, QueryConstraint, where } from "firebase/firestore/lite";
import { FirestoreFilter } from "./FirestoreFilter";

export type CollectionValues = (typeof COLLECTIONS)[keyof typeof COLLECTIONS];

export abstract class FirestoreCrudRepository<T> implements ICrudRepository<T> {
  protected collectionRef: CollectionReference;
  protected collectionName: CollectionValues;

  constructor(collectionName: CollectionValues) {
    this.collectionRef = collection(db, collectionName);
    this.collectionName = collectionName;
  }

  async create(data: T): Promise<T> {
    const ref = await addDoc(this.collectionRef, data as unknown);
    return { ...(data as object), id: ref.id } as T;
  }

  async getAll(): Promise<T[]> {
    const snapshot = await getDocs(this.collectionRef);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as T));
  }

  async getById(id: string): Promise<T | null> {
    const ref = doc(this.collectionRef, id);
    const snap = await getDoc(ref);
    if (!snap.exists()) return null;
    return { id: snap.id, ...snap.data() } as T;
  }

  async update(id: string, data: Partial<T>): Promise<void> {
    const ref = doc(this.collectionRef, id);
    await updateDoc(ref, data);
  }

  async delete(id: string): Promise<void> {
    const ref = doc(this.collectionRef, id);
    await deleteDoc(ref);
  }

  async findBy(filters: FirestoreFilter<T>[]): Promise<T[]> {
    const constraints: QueryConstraint[] = filters.map(({ field, op, value }) =>
      where(field, op as WhereFilterOp, value)
    );

    const q = query(this.collectionRef, ...constraints);
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as T));
  }
}
