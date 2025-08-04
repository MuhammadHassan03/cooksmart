import { Router } from "express";
import {
  login,
  register,
  completeOnboarding,
  getCurrentUser,
  forgotPassword,
  resetPassword,
  googleAuth,
  logout,
} from "../../controllers/auth.controller";
import { requireAuth } from "../../middleware/auth.middleware";

const router = Router();

router.post("/login", login);
router.post("/register", register);
router.post("/complete-onboarding", requireAuth, completeOnboarding);
router.get("/current-user", getCurrentUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/google-auth", googleAuth);
router.post("/logout", requireAuth, logout);

export default router;
