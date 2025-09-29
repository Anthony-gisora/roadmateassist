import express from "express";
import { Clerk } from "@clerk/clerk-sdk-node";

import {
  fetchAllRequests,
  submitRequest,
} from "../controllers/admin.controller.js";
import mechanicModel from "../models/mechanic.model.js";

const router = express.Router();
const clerk = new Clerk({ apiKey: process.env.CLERK_SECRET_KEY });

router.get("/mechanic-requests", fetchAllRequests);
router.post("/mechanic-requests", submitRequest);
router.get("/mechanics", async (req, res) => {
  try {
    const mechanics = await mechanicModel.find();
    res.json(mechanics);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Route to fetch ALL Clerk users (not just 50)
app.get("/api/users", async (req, res) => {
  try {
    let allUsers = [];
    let offset = 0;
    const limit = 100; // Clerk max limit per request

    while (true) {
      const usersResponse = await clerk.users.getUserList({
        limit,
        offset,
      });

      allUsers = [...allUsers, ...usersResponse.data];

      if (!usersResponse.hasMore) {
        break; // stop when there are no more users
      }

      offset += limit;
    }

    res.json(allUsers);
  } catch (error) {
    console.error("❌ Error fetching all users:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
