import { Router, Request, Response } from "express";
import { OrderController } from "../controller/OrderController";

const router: Router = Router();
const controller = new OrderController();

router.post("/", (req: Request, res: Response) => controller.create(req, res));
router.get("/", (req: Request, res: Response) => controller.getAll(req, res));
router.get("/user/:userId", (req: Request, res: Response) =>
  controller.getByUserId(req, res),
);
router.get("/:id", (req: Request, res: Response) =>
  controller.getById(req, res),
);

export default router;
