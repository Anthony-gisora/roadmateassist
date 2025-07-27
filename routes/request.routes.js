import express from "express";
import { handleDriverRequest } from "../controllers/request.controller.js";

const router = express.Router();

router.post("/request", handleDriverRequest);

export default router;
