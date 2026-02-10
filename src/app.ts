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
    this.app.use(express.urlencoded({ extended: true }));
  }

  private configureRoutes(): void {
    this.app.get("/", (req, res) => {
      res.send("Hello World!");
    });
  }

  public listen(): void {
    this.server = this.app.listen(this.port, () => {
      console.log(`App listening on http://localhost:${this.port}`);
    });
  }
}

export default App;
