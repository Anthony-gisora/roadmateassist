import express from "express";
import {
  fetchAllRequests,
  submitRequest,
  fetchAllMechanics,
} from "../controllers/admin.controller.js";
import mechanicModel from "../models/mechanic.model.js";

const router = express.Router();

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

export default router;
