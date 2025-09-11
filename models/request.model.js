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
      enum: ["pending", "InProgress", "completed"],
      default: "pending",
    },
    location: [],
  },
  { timestamps: true }
);

export default mongoose.model("Request", requestSchema);
