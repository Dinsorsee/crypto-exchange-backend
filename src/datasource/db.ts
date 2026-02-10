import { MongoClient, Db } from "mongodb";

class MongoDB {
  private client: Promise<MongoClient> | null = null;
  private readonly DB_NAME = "crypto-exchange";
  private readonly MONGO_URI = "mongodb://localhost:27017";

  async connect(): Promise<MongoClient> {
    if (!this.client) {
      this.client = MongoClient.connect(this.MONGO_URI);

      this.client
        .then(() => console.log("MongoDB connected"))
        .catch((err) => {
          console.error("MongoDB connect error", err);
          this.client = null;
          throw err;
        });
    }
    return this.client;
  }

  async getDatabase(): Promise<Db> {
    if (!this.client) {
      throw new Error("MongoDB not connected. Call connect() first.");
    }
    const client = await this.client;
    return client.db(this.DB_NAME);
  }

  async disconnect(): Promise<void> {
    if (this.client) {
      const client = await this.client;
      await client.close();
      this.client = null;
      console.log("✅ MongoDB disconnected");
    }
  }
}

export const mongodb = new MongoDB();
