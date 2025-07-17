import express from "express";
import {
  loginMechanic,
  registerMechanic,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/login", loginMechanic);
router.post("/register", registerMechanic);

export default router;
