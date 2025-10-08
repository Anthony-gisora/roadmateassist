import verifyToken from "../middleware/verifyToken.js";
import MessageSchema from "../models/Message.model.js";
import express from "express";

const router = express.Router();

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
