import express from "express";
import {
  loginMechanic,
  registerMechanic,
  handleOnOff,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/login", loginMechanic);
router.post("/register", registerMechanic);
router.put("/is-online/:id", handleOnOff);

export default router;
