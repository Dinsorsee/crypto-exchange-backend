import { ObjectId } from "mongodb";

type BaseTransaction = {
  _id?: ObjectId;
  userId: ObjectId;
  amount: number;
  fromWalletId?: ObjectId | null;
  toWalletId?: ObjectId | null;
  txHash?: string | null;
  createdAt?: Date;
};

type FiatTransferTx = {
  type: "FIAT_TRANSFER";
  currency: "THB";
};

type CryptoTransferTx = {
  type: "CRYPTO_TRANSFER";
  currency: "BTC";
};

type TradeTx = {
  type: "TRADE";
  currency: "THB" | "BTC";
};

export type TransactionEntity = BaseTransaction &
  (FiatTransferTx | CryptoTransferTx | TradeTx);
