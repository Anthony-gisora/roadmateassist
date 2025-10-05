import express from "express";
import {
  loginMechanic,
  registerMechanic,
  handleOnOff,
  forgotPassword,
  verifyCode,
  resetPass,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/login", loginMechanic);
router.post("/register", registerMechanic);
// router.post("/passwords", passwordsechanic);

router.put("/is-online/:id", handleOnOff);

/**
 * 1️⃣ SEND RESET CODE (Forgot Password)
 * URL: POST /api/auth/forgot-password
 */
router.post("/forgot-password", forgotPassword);

/**
 * 2️⃣ VERIFY RESET CODE
 * URL: POST /api/auth/verify-reset-code
 */
router.post("/verify-reset-code", verifyCode);

/**
 * 3️⃣ RESET PASSWORD
 * URL: POST /api/auth/reset-password
 */
router.post("/reset-password", resetPass);

export default router;
