import { Request, Response } from "express";
import { TransactionService } from "../service/TransactionService";
import { ObjectId } from "mongodb";

export class TransactionController {
  private transactionService = new TransactionService();

  async create(req: Request, res: Response): Promise<void> {
    try {
      const { userId, amount, fromWalletId, ...rest } = req.body;

      if (!userId || amount === undefined) {
        res.status(400).json({
          error: "userId and amount required",
        });
        return;
      }

      const transaction = await this.transactionService.createTransaction({
        userId: new ObjectId(userId),
        amount,
        ...(fromWalletId && { fromWalletId: new ObjectId(fromWalletId) }),
        ...rest,
      });

      res.status(201).json(transaction);
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

      const transaction = await this.transactionService.getTransactionById(id);

      if (!transaction) {
        res.status(404).json({ error: "Transaction not found" });
        return;
      }

      res.json(transaction);
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

      const transactions =
        await this.transactionService.getUserTransactions(userId);

      res.json(transactions);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const transactions = await this.transactionService.getAllTransactions();

      res.json(transactions);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
