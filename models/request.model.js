import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
  {
    driverId: {
      type: String,
      required: true,
    },
    requestType: {
      type: String,
      enum: ["tow", "maintenance", "emergency"],
      required: true,
    },
    details: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "In Progress", "completed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Request", requestSchema);
