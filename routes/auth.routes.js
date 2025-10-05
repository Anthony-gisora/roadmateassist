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
router.post("/forgot-password", forgotPassword);
router.post("/verify-reset-code", verifyCode);
router.post("/reset-password", resetPass);

export default router;
