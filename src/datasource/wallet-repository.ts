import { ObjectId, OptionalId } from "mongodb";
import { mongodb } from "../datasource/db";
import { WalletEntity } from "../entity/WalletEntity";

export class WalletRepository {
  private collectionName = "wallets";

  async create(wallet: OptionalId<WalletEntity>): Promise<WalletEntity> {
    const db = await mongodb.getDatabase();
    wallet.createdAt = new Date();
    wallet.updatedAt = new Date();
    const result = await db
      .collection<WalletEntity>(this.collectionName)
      .insertOne(wallet);
    return { ...wallet, _id: result.insertedId } as WalletEntity;
  }

  async findById(id: string | ObjectId): Promise<WalletEntity | null> {
    const db = await mongodb.getDatabase();
    const _id = typeof id === "string" ? new ObjectId(id) : id;
    return db.collection<WalletEntity>(this.collectionName).findOne({ _id });
  }

  async findByUserId(userId: string | ObjectId): Promise<WalletEntity[]> {
    const db = await mongodb.getDatabase();
    const uid = typeof userId === "string" ? new ObjectId(userId) : userId;
    return db
      .collection<WalletEntity>(this.collectionName)
      .find({ userId: uid })
      .toArray();
  }

  async findAll(): Promise<WalletEntity[]> {
    const db = await mongodb.getDatabase();
    return db.collection<WalletEntity>(this.collectionName).find({}).toArray();
  }
}
