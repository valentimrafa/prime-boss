import { WhereFilterOp } from "firebase/firestore";

export type FirestoreFilter<T> = {
  field: Extract<keyof T, string>;
  op: WhereFilterOp;
  value: T[Extract<keyof T, string>];
};
