import { Router, Request, Response } from "express";
import { UserController } from "../controller/UserController";

const router: Router = Router();
const controller = new UserController();

// POST /api/users - Create user
router.post("/", (req: Request, res: Response) => controller.create(req, res));

// GET /api/users - Get all users
router.get("/", (req: Request, res: Response) => controller.getAll(req, res));

// GET /api/users/:id - Get user by ID
router.get("/:id", (req: Request, res: Response) =>
  controller.getById(req, res),
);

export default router;
