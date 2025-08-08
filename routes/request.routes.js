import express from "express";
import {
  handleDriverRequest,
  updateRequestStatus,
} from "../controllers/request.controller.js";

const router = express.Router();

router.post("/requests", handleDriverRequest);
router.put("/update-status/:id", updateRequestStatus);

export default router;
