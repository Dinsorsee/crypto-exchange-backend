import { ObjectId, OptionalId } from "mongodb";
import { mongodb } from "../datasource/db";
import { TransactionEntity } from "../entity/TransactionEntity";

export class TransactionRepository {
  private collectionName = "transactions";

  async create(tx: OptionalId<TransactionEntity>): Promise<TransactionEntity> {
    const db = await mongodb.getDatabase();
    tx.createdAt = new Date();
    const result = await db
      .collection<TransactionEntity>(this.collectionName)
      .insertOne(tx);
    return { ...tx, _id: result.insertedId } as TransactionEntity;
  }

  async findById(id: string | ObjectId): Promise<TransactionEntity | null> {
    const db = await mongodb.getDatabase();
    const _id = typeof id === "string" ? new ObjectId(id) : id;
    return db
      .collection<TransactionEntity>(this.collectionName)
      .findOne({ _id });
  }

  async findByUserId(userId: string | ObjectId): Promise<TransactionEntity[]> {
    const db = await mongodb.getDatabase();
    const uid = typeof userId === "string" ? new ObjectId(userId) : userId;
    return db
      .collection<TransactionEntity>(this.collectionName)
      .find({ userId: uid })
      .toArray();
  }

  async findAll(): Promise<TransactionEntity[]> {
    const db = await mongodb.getDatabase();
    return db
      .collection<TransactionEntity>(this.collectionName)
      .find({})
      .toArray();
  }
}
