import { WalletRepository } from "../datasource/wallet-repository";
import { WalletEntity } from "../entity/WalletEntity";
import { ObjectId } from "mongodb";

export class WalletService {
  private walletRepository = new WalletRepository();

  async createCryptoWallet(
    userId: string | ObjectId,
    balance: number = 0,
  ): Promise<WalletEntity> {
    const uid = typeof userId === "string" ? new ObjectId(userId) : userId;
    return this.walletRepository.create({
      userId: uid,
      type: "CRYPTO",
      currency: "BTC",
      balance,
    });
  }

  async createFiatWallet(
    userId: string | ObjectId,
    balance: number = 0,
  ): Promise<WalletEntity> {
    const uid = typeof userId === "string" ? new ObjectId(userId) : userId;
    return this.walletRepository.create({
      userId: uid,
      type: "FIAT",
      currency: "THB",
      balance,
    });
  }

  async getWalletById(id: string | ObjectId): Promise<WalletEntity | null> {
    return this.walletRepository.findById(id);
  }

  async getUserWallets(userId: string | ObjectId): Promise<WalletEntity[]> {
    return this.walletRepository.findByUserId(userId);
  }
}
