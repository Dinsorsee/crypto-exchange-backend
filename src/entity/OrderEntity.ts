import { ObjectId } from "mongodb";

export type OrderSide = "BUY" | "SELL";
export type OrderStatus = "OPEN" | "COMPLETED" | "CANCELLED";
export type CryptoCurrency = "BTC" | "ETH" | "XRP" | "DOGE";
export type FiatCurrency = "THB" | "USD";

export interface OrderEntity {
  _id?: ObjectId;
  userId: ObjectId;
  orderType: OrderSide;
  crypto: CryptoCurrency;
  fiat: FiatCurrency;
  price: number;
  amount: number;
  status: OrderStatus;
  createdAt?: Date;
  updatedAt?: Date;
}
