import verifyToken from "../middleware/verifyToken.js";
import Conversation from "../models/Conversation.model.js";
import express from "express";

const router = express.Router();

// create a conversation
router.post("/", verifyToken, async (req, res) => {
  try {
    const { receiverId } = req.body;
    const currentUserId = req.user.id;
    const isConvoAlreadyCreated = await Conversation.findOne({
      members: { $all: [receiverId, currentUserId] },
    });
    if (isConvoAlreadyCreated) {
      console.log(isConvoAlreadyCreated);
      return res
        .status(500)
        .json({ msg: "There is already such a conversation" });
    }
    await Conversation.create({ members: [currentUserId, receiverId] });
    return res.status(201).json({ msg: "Conversation successfully created" });
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

// get user conversations
router.get("/find/:userId", verifyToken, async (req, res) => {
  if (req.user.id === req.params.userId) {
    try {
      const userId = req.user.id;
      const conversations = await Conversation.find({
        members: { $in: [userId] },
      });
      return res.status(200).json(conversations);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  } else {
    return res
      .status(403)
      .json({ msg: "You can get only your own conversations" });
  }
});

// get a conversation
router.get("/:convoId", verifyToken, async (req, res) => {
  try {
    const conversation = await Conversation.findById(req.params.convoId);
    if (conversation.members.includes(req.user.id)) {
      return res.status(200).json(conversation);
    } else {
      return res
        .status(403)
        .json({ msg: "This conversation does not include you" });
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

export default router;
