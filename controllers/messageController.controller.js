import verifyToken from "../middleware/verifyToken.js";
import mechanicModel from "../models/mechanic.model.js";
import MessageSchema from "../models/Message.model.js";
import express from "express";

const router = express.Router();

// ✅ GET other user profile by ID
router.get("/userProf/:otherUserId", verifyToken, async (req, res) => {
  try {
    const { otherUserId } = req.params;

    // Fetch only the necessary user fields
    const user = await mechanicModel
      .findById(otherUserId)
      .select("personalNumber phone ");

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Send clean, minimal data to frontend
    res.status(200).json({
      _id: user._id,
      username: user.personalNumber,
      Phone: user.phone,
    });
  } catch (error) {
    console.error("Error fetching user profile:", error.message);
    res.status(500).json({ msg: "Server error fetching user profile" });
  }
});

// create(send) message
router.post("/", verifyToken, async (req, res) => {
  try {
    const { messageText, conversationId } = req.body;
    const newMessage = await MessageSchema.create({
      messageText,
      senderId: req.user.id,
      conversationId,
    });
    return res.status(201).json(newMessage);
  } catch (error) {
    console.error(error);
  }
});

// get all messages from conversation
router.get("/:convoId", verifyToken, async (req, res) => {
  try {
    const messages = await MessageSchema.find({
      conversationId: req.params.convoId,
    });
    console.log(messages);
    return res.status(200).json(messages);
  } catch (error) {
    console.error(error);
  }
});

export default router;
