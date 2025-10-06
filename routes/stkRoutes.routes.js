import express from "express";
import {
  stkCallback,
  stkPush,
} from "../controllers/stkController.controller.js";

const router = express.Router();

router.post("/stkpush", stkPush);
router.post("/callback", stkCallback);

export default router;
