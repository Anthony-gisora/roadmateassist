import express from "express";
import { clerkClient } from "@clerk/clerk-sdk-node";

import {
  fetchAllRequests,
  submitRequest,
  fetchAllMechanics,
} from "../controllers/admin.controller.js";
import mechanicModel from "../models/mechanic.model.js";

const router = express.Router();

/**
 * @openapi
 * /admin/mechanic-requests:
 *   get:
 *     summary: Fetch all mechanic requests
 *     tags:
 *       - Admin
 *     responses:
 *       200:
 *         description: List of mechanic requests
 *   post:
 *     summary: Submit a new mechanic request
 *     tags:
 *       - Admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Mechanic request submitted successfully
 */
router.get("/mechanic-requests", fetchAllRequests);
router.post("/mechanic-requests", submitRequest);

/**
 * @openapi
 * /admin/mechanics:
 *   get:
 *     summary: Fetch all mechanics from database
 *     tags:
 *       - Admin
 *     responses:
 *       200:
 *         description: List of mechanics
 *       500:
 *         description: Server error
 */
router.get("/mechanics", async (req, res) => {
  try {
    const mechanics = await mechanicModel.find();
    res.json(mechanics);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * @openapi
 * /admin/clerkUsers:
 *   get:
 *     summary: Fetch all Clerk users
 *     tags:
 *       - Admin
 *     responses:
 *       200:
 *         description: List of all Clerk users
 *       500:
 *         description: Error fetching users
 */
router.get("/clerkUsers", async (req, res) => {
  try {
    let allUsers = [];
    let offset = 0;
    const limit = 100;

    while (true) {
      const usersResponse = await clerkClient.users.getUserList({
        limit,
        offset,
      });

      allUsers = [...allUsers, ...usersResponse];

      if (!usersResponse.hasMore) break;

      offset += limit;
    }

    res.json(allUsers);
  } catch (error) {
    console.error("Error fetching all users:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
