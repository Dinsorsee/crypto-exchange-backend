import { Application } from "express";
import { Server } from "http";
import express from "express";

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
  }

  private configureRoutes(): void {}

  public listen(): void {
    this.server = this.app.listen(this.port, () => {
      console.log(`App listening on http://localhost:${this.port}`);
    });
  }
}

export default App;
