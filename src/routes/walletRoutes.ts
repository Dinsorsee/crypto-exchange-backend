import { Router, Request, Response } from "express";
import { WalletController } from "../controller/WalletController";

const router: Router = Router();
const controller = new WalletController();

router.post("/", (req: Request, res: Response) => controller.create(req, res));
router.get("/", (req: Request, res: Response) => controller.getAll(req, res));
router.get("/:id", (req: Request, res: Response) =>
  controller.getById(req, res),
);
router.get("/user/:userId", (req: Request, res: Response) =>
  controller.getByUserId(req, res),
);

export default router;
