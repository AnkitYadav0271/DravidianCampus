import Router from "express";
import {
  adminLoginController,
  changePasswordController,
  forgotPasswordController,
  logoutController,
  verifyOtpController,
} from "../controllers/admin.auth.controller.ts";
import { isAuthenticated } from "../middleware/auth.middleware.ts";

//! mergeParams:true add this here
const router = Router();

router.post("/login", adminLoginController);
router.post("/logout", isAuthenticated, logoutController);
router.post("/forgot-password", forgotPasswordController);
router.post(
  "/verify-otp",
  verifyOtpController,
);
router.post("/change-password", changePasswordController);

export default router;
