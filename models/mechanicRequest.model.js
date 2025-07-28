import mongoose from "mongoose";

const mechanicRequestSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    personalNumber: { type: String, required: true, unique: true },
    experience: { type: Number, default: 0 },
    skills: { type: [String], default: [] },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const MechanicRequest = mongoose.model(
  "MechanicRequest",
  mechanicRequestSchema
);
export default MechanicRequest;
