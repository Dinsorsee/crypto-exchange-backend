import { ObjectId, OptionalId } from "mongodb";
import { mongodb } from "../datasource/db";
import { OrderEntity } from "../entity/OrderEntity";

export class OrderRepository {
  private collectionName = "orders";

  async create(order: OptionalId<OrderEntity>): Promise<OrderEntity> {
    const db = await mongodb.getDatabase();
    order.createdAt = new Date();
    order.updatedAt = new Date();
    const result = await db
      .collection<OrderEntity>(this.collectionName)
      .insertOne(order);
    return { ...order, _id: result.insertedId } as OrderEntity;
  }

  async findById(id: string | ObjectId): Promise<OrderEntity | null> {
    const db = await mongodb.getDatabase();
    const _id = typeof id === "string" ? new ObjectId(id) : id;
    return db.collection<OrderEntity>(this.collectionName).findOne({ _id });
  }

  async findByUserId(userId: string | ObjectId): Promise<OrderEntity[]> {
    const db = await mongodb.getDatabase();
    const uid = typeof userId === "string" ? new ObjectId(userId) : userId;
    return db
      .collection<OrderEntity>(this.collectionName)
      .find({ userId: uid })
      .toArray();
  }

  async findAll(): Promise<OrderEntity[]> {
    const db = await mongodb.getDatabase();
    return db.collection<OrderEntity>(this.collectionName).find({}).toArray();
  }
}
