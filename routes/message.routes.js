import express from "express";

import { getMessages, sentMessage } from "../controllers/message.controller.js";

const router = express.Router();

router.post("/cht", sentMessage);
router.get("/msgs/:id", getMessages);

export default router;
