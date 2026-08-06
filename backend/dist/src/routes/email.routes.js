import { Router } from "express";
import { emailController } from "../controllers/email.controller.js";
const router = Router({ mergeParams: true });
router.post("/new-admission", emailController);
export default router;
