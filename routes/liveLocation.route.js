import express from "express";
import { realtimeLocation } from "../controllers/realtimeLocation.controller.js";

const router = express.Router();

/**
 * @openapi
 * /location/realtime-location:
 *   post:
 *     summary: Send mechanic’s real-time location
 *     tags:
 *       - Location
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mechanicId:
 *                 type: string
 *                 example: "64f7a1d3c5a0f4b1e3b2d9a7"
 *               latitude:
 *                 type: number
 *                 example: -1.2921
 *               longitude:
 *                 type: number
 *                 example: 36.8219
 *     responses:
 *       200:
 *         description: Location updated successfully
 *       400:
 *         description: Invalid data
 */
router.post("/realtime-location", realtimeLocation);

export default router;
