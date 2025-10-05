import express from "express";
import Request from "../models/request.model.js";

const router = express.Router();

/**
 * @openapi
 * /notifications/reqNotification:
 *   get:
 *     summary: Get all current request notifications
 *     tags:
 *       - Notifications
 *     responses:
 *       200:
 *         description: List of request notifications
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Failed to fetch notifications
 */
router.get("/reqNotification", async (req, res) => {
  try {
    const requests = await Request.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
});

export default router;
