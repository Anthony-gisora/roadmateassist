import express from "express";
import {
  handleDriverRequest,
  updateStatus,
} from "../controllers/request.controller.js";

const router = express.Router();

router.post("/requests", handleDriverRequest);
router.patch("/updateStatus/:id", updateStatus);

export default router;
