import mongoose from "mongoose";
import bcrypt from "bcrypt";

const mechanicSchema = new mongoose.Schema({
  name: { type: String, required: true },
  personalNumber: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

mechanicSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const Mechanic = mongoose.model("Mechanic", mechanicSchema);
export default Mechanic;
