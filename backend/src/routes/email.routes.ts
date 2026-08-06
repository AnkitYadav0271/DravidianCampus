import { Router } from "express";
import {
  contactEmailController,
  emailController,
} from "../controllers/email.controller.js";

const router = Router({ mergeParams: true });

router.post("/new-admission", emailController);
router.post("/contact", contactEmailController);

export default router;
