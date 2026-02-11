import { OrderRepository } from "../datasource/order-repository";
import { OrderEntity } from "../entity/OrderEntity";
import { ObjectId } from "mongodb";

export class OrderService {
  private orderRepository = new OrderRepository();

  async createOrder(
    order: Omit<OrderEntity, "_id" | "createdAt" | "updatedAt">,
  ): Promise<OrderEntity> {
    return this.orderRepository.create({
      ...order,
      createdAt: new Date(),
    } as any);
  }

  async getOrderById(id: string | ObjectId): Promise<OrderEntity | null> {
    return this.orderRepository.findById(id);
  }

  async getUserOrders(userId: string | ObjectId): Promise<OrderEntity[]> {
    return this.orderRepository.findByUserId(userId);
  }

  async getAllOrders(): Promise<OrderEntity[]> {
    return this.orderRepository.findAll();
  }
}
