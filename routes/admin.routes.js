import express from "express";
import {
  fetchAllRequests,
  submitRequest,
} from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/mechanic-requests", fetchAllRequests);
router.post("/mechanic-requests", submitRequest);

export default router;
