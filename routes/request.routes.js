import express from "express";
import { handleDriverRequest } from "../controllers/request.controller.js";

const router = express.Router();

router.post("/requests", handleDriverRequest);

export default router;
