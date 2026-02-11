import { Router, Request, Response } from "express";
import { OrderController } from "../controller/OrderController";

const router: Router = Router();
const controller = new OrderController();

// POST /api/orders - Create order
router.post("/", (req: Request, res: Response) => controller.create(req, res));

// GET /api/orders - Get all orders
router.get("/", (req: Request, res: Response) => controller.getAll(req, res));

// GET /api/orders/user/:userId - Get orders by user ID
router.get("/user/:userId", (req: Request, res: Response) =>
  controller.getByUserId(req, res),
);

// GET /api/orders/:id - Get order by ID
router.get("/:id", (req: Request, res: Response) =>
  controller.getById(req, res),
);

export default router;
