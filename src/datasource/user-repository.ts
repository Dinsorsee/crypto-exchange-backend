import { ObjectId, WithId, OptionalId } from "mongodb";
import { mongodb } from "./db";
import UserEntity from "../entity/UserEntity";

export class UserRepository {
  private collectionName = "users";

  async create(user: OptionalId<UserEntity>): Promise<WithId<UserEntity>> {
    const db = await mongodb.getDatabase();
    user.createdAt = new Date();
    const result = await db
      .collection<UserEntity>(this.collectionName)
      .insertOne(user as any);
    return { _id: result.insertedId, ...user } as WithId<UserEntity>;
  }

  async findById(id: string | ObjectId): Promise<WithId<UserEntity> | null> {
    const db = await mongodb.getDatabase();
    const _id = typeof id === "string" ? new ObjectId(id) : id;
    return db.collection<UserEntity>(this.collectionName).findOne({ _id });
  }

  async findByEmail(email: string): Promise<WithId<UserEntity> | null> {
    const db = await mongodb.getDatabase();
    return db.collection<UserEntity>(this.collectionName).findOne({ email });
  }

  async findAll(): Promise<WithId<UserEntity>[]> {
    const db = await mongodb.getDatabase();
    return db.collection<UserEntity>(this.collectionName).find({}).toArray();
  }
}
