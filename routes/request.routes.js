import express from "express";
import {
  handleDriverRequest,
  updateRequestComplete,
  updateRequestStatus,
} from "../controllers/request.controller.js";

const router = express.Router();

router.post("/requests", handleDriverRequest);
router.put("/update-status/:id", updateRequestStatus);
router.put("/update-complete/:id", updateRequestComplete);

export default router;
