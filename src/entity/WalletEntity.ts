import { ObjectId } from "mongodb";

export type WalletType =
  | { type: "FIAT"; currency: "THB" }
  | { type: "CRYPTO"; currency: "BTC" };

export type WalletEntity = WalletType & {
  _id?: ObjectId;
  userId: ObjectId;
  balance: number;
  createdAt?: Date;
  updatedAt?: Date;
};
