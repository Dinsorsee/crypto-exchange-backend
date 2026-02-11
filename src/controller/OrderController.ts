import { Request, Response } from "express";
import { OrderService } from "../service/OrderService";
import { ObjectId } from "mongodb";
import validateCreateOrder from "../utils/ValidateCreateOrder";

export class OrderController {
  private orderService = new OrderService();

  async create(req: Request, res: Response): Promise<void> {
    try {
      const error = validateCreateOrder(req.body);
      if (error) {
        res.status(400).json({ error });
        return;
      }
      const { userId, orderType, crypto, fiat, price, amount } = req.body;

      const order = await this.orderService.createOrder({
        userId: new ObjectId(userId),
        orderType,
        crypto,
        fiat,
        price,
        amount,
        status: "OPEN",
      });
      res.status(201).json(order);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id;

      if (!id) {
        res.status(400).json({ error: "id required" });
        return;
      }

      const order = await this.orderService.getOrderById(id);
      if (!order) {
        res.status(404).json({ error: "Order not found" });
        return;
      }
      res.json(order);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getByUserId(req: Request, res: Response): Promise<void> {
    try {
      const userId = Array.isArray(req.params.userId)
        ? req.params.userId[0]
        : req.params.userId;

      if (!userId) {
        res.status(400).json({ error: "userId required" });
        return;
      }

      const orders = await this.orderService.getUserOrders(userId);
      res.json(orders);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const orders = await this.orderService.getAllOrders();
      res.json(orders);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
