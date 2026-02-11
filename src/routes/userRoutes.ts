import { Router, Request, Response } from "express";
import { UserController } from "../controller/UserController";

const router: Router = Router();
const controller = new UserController();

router.post("/", (req: Request, res: Response) => controller.create(req, res));
router.get("/", (req: Request, res: Response) => controller.getAll(req, res));
router.get("/:id", (req: Request, res: Response) =>
  controller.getById(req, res),
);

export default router;
