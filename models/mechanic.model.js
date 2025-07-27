import mongoose from "mongoose";
import bcrypt from "bcrypt";

const mechanicSchema = new mongoose.Schema(
  {
    clerkUid: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    personalNumber: { type: String, unique: true, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

mechanicSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export default mongoose.model("Mechanic", mechanicSchema);
