import mongoose from "mongoose";

const NotificationsSchema = new mongoose.Schema({
  userID: { type: String, required: true },
  message: { type: String, required: true },
  isSeen: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now() },
});

const Notification = mongoose.model("Notification", NotificationsSchema);

export default Notification;
