import { ObjectId } from "mongodb";

export type OrderSide = "BUY" | "SELL";
export type OrderStatus = "OPEN" | "COMPLETED" | "CANCELLED";

export interface OrderEntity {
  _id?: ObjectId;
  userId: ObjectId;
  orderType: OrderSide;
  crypto: string;
  fiat: string;
  price: number;
  amount: number;
  remainingAmount: number;
  status: OrderStatus;
  createdAt?: Date;
  updatedAt?: Date;
}
