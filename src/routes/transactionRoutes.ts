import { Router } from "express";
import { TransactionController } from "../controller/TransactionController";

const router: Router = Router();
const controller = new TransactionController();

router.post("/", (req, res) => controller.create(req, res));
router.get("/", (req, res) => controller.getAll(req, res));
router.get("/user/:userId", (req, res) => controller.getByUserId(req, res));
router.get("/:id", (req, res) => controller.getById(req, res));

export default router;
