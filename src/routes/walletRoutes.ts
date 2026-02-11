import { Router, Request, Response } from "express";
import { WalletController } from "../controller/WalletController";

const router: Router = Router();
const controller = new WalletController();

// POST /api/wallets - Create wallet
router.post("/", (req: Request, res: Response) => controller.create(req, res));

// GET /api/wallets/:id - Get wallet by ID
router.get("/:id", (req: Request, res: Response) =>
  controller.getById(req, res),
);

// GET /api/wallets/user/:userId - Get user wallets
router.get("/user/:userId", (req: Request, res: Response) =>
  controller.getByUserId(req, res),
);

export default router;
