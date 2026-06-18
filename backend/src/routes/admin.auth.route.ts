import {Router} from "express";
import {
  adminLoginController,
  changePasswordController,
  forgotPasswordController,
  getCurrentUserController,
  logoutController,
  verifyOtpController,
} from "../controllers/admin.auth.controller.ts";
import { isAuthenticated } from "../middleware/auth.middleware.ts";

//! mergeParams:true add this here
const router = Router({mergeParams:true});

router.post("/login", adminLoginController);
router.post("/logout", isAuthenticated, logoutController);
router.post("/forgot-password", forgotPasswordController);
router.post(
  "/verify-otp",
  verifyOtpController,
);
router.post("/change-password", changePasswordController);
router.get("/current-user",isAuthenticated,getCurrentUserController);

export default router;
