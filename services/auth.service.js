import Mechanic from "../models/mechanic.model.js";
import bcrypt from "bcrypt";

export const login = async (personalNumber, password) => {
  const mechanic = await Mechanic.findOne({ personalNumber });
  if (!mechanic) throw new Error("Invalid Personal Number or Password");

  const isMatch = await bcrypt.compare(password, mechanic.password);
  if (!isMatch) throw new Error("Invalid Personal Number or Password");

  if (!mechanic || !isMatch) {
    throw new Error("Invalid Personal Number or Password");
  }

  console.log("✅ Mechanic authenticated");

  return mechanic;
};

export const register = async ({
  name,
  personalNumber,
  password,
  clerkUid,
  phone,
  location,
  distance,
}) => {
  const existing = await Mechanic.findOne({ personalNumber });
  if (existing) throw new Error("Personal number already in use");

  const mechanic = new Mechanic({
    name,
    personalNumber,
    password,
    clerkUid,
    phone,
    location,
    distance,
  });
  await mechanic.save();
  return mechanic;
};
