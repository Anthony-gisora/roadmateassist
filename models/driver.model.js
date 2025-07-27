import mongoose from "mongoose";

const driverSchema = new mongoose.Schema(
  {
    clerkUserId: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    licenseNumber: { type: String, required: true },
    phone: { type: String, required: true },
    vehicle: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Driver", driverSchema);
