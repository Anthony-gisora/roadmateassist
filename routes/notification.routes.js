// routes/notification.routes.js
import express from "express";
import Request from "../models/request.model.js"; // adjust path if needed

const router = express.Router();

// GET all current requests
router.get("/reqNotification", async (req, res) => {
  try {
    const requests = await Request.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
});

export default router;
