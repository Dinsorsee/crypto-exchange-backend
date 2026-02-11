import { Request, Response } from "express";
import { WalletService } from "../service/WalletService";
import { ObjectId } from "mongodb";

export class WalletController {
  private walletService = new WalletService();

  async create(req: Request, res: Response): Promise<void> {
    try {
      const { userId, type, currency } = req.body;
      if (!userId || !currency) {
        res.status(400).json({ error: "userId, currency required" });
        return;
      }
      if (type === "CRYPTO" || type === "FIAT") {
        const wallet =
          type === "CRYPTO"
            ? await this.walletService.createCryptoWallet(new ObjectId(userId))
            : await this.walletService.createFiatWallet(new ObjectId(userId));
        res.status(201).json(wallet);
      } else {
        res.status(400).json({ error: "wrong type of wallet" });
        return;
      }
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

      const wallet = await this.walletService.getWalletById(id);
      if (!wallet) {
        res.status(404).json({ error: "Wallet not found" });
        return;
      }
      res.json(wallet);
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

      const wallets = await this.walletService.getUserWallets(userId);
      res.json(wallets);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

    async getAll(req: Request, res: Response): Promise<void> {
    try {
      const orders = await this.walletService.getAllOrders();
      res.json(orders);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
