import { Request, Response } from "express";
import { UserService } from "../service/UserService";

export class UserController {
  private userService = new UserService();

  async create(req: Request, res: Response): Promise<void> {
    try {
      const { email, passwordHash } = req.body;
      if (!email || !passwordHash) {
        res.status(400).json({ error: "email and passwordHash required" });
        return;
      }
      const user = await this.userService.createUser(email, passwordHash);
      res.status(201).json(user);
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

      const user = await this.userService.getUserById(id);
      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      res.json(user);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.userService.getAllUsers();
      res.json(users);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}