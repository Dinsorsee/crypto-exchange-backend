import { Application } from "express";
import { Server } from "http";
import express from "express";
import orderRoutes from "./routes/orderRoutes";
import userRoutes from "./routes/userRoutes";
import walletRoutes from "./routes/walletRoutes";
import transactionRoutes from "./routes/transactionRoutes";
import { mongodb } from "./datasource/db";

class App {
  app: Application;
  port: number;
  server: Server | undefined;

  constructor() {
    this.app = express();
    this.port = 3000;
    this.server = undefined;
    this.configureMiddleware();
    this.configureRoutes();
  }

  private configureMiddleware(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private configureRoutes(): void {
    this.app.get("/", (req, res) => {
      res.json({ message: "Crypto Exchange API" });
    });

    this.app.use("/api/users", userRoutes);
    this.app.use("/api/wallets", walletRoutes);
    this.app.use("/api/orders", orderRoutes);
    this.app.use("/api/transactions", transactionRoutes);
  }

  public async listen(): Promise<void> {
    try {
      await mongodb.connect();
      console.log(`Database: mongodb://localhost:27017/crypto-exchange`);

      this.server = this.app.listen(this.port, () => {
        console.log(`App listening on http://localhost:${this.port}`);
      });
    } catch (error) {
      console.error("Failed to start app:", error);
      process.exit(1);
    }
  }
}

export default App;
