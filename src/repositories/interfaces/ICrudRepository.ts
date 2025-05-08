import { FirestoreFilter } from "../base/firestore/FirestoreFilter";

export interface ICreateRepository<T> {
  create(data: T): Promise<T>;
}

export interface IUpdateRepository<T> {
  update(id: string, data: Partial<T>): Promise<void>;
}

export interface IDeleteRepository {
  delete(id: string): Promise<void>;
}
export interface IGetByIDRepository<T> {
  getById(id: string): Promise<T | null>;
}

export interface IGetAllRepository<T> {
  getAll(): Promise<T[]>;
}

export interface IFindByRepository<T> {
  findBy(filters: FirestoreFilter<T>[]): Promise<T[]>;
}

export interface ICrudRepository<T>
  extends IFindByRepository<T>,
    ICreateRepository<T>,
    IUpdateRepository<T>,
    IGetByIDRepository<T>,
    IGetAllRepository<T>,
    IDeleteRepository {}
