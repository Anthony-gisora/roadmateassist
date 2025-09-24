import Mechanic from "../models/mechanic.model.js";
import bcrypt from "bcrypt";

export const login = async (personalNumber, password, mechCLkId) => {
  const mechanic = await Mechanic.findOne({ personalNumber });

  if (!mechanic) throw new Error("Invalid Personal Number or Password");

  const isMatch = await bcrypt.compare(password, mechanic.password);
  const ismechCLkId = mechanic.clerkUid == mechCLkId;

  if (!isMatch && !ismechCLkId)
    throw new Error(
      "Invalid Personal Number or Password or logged through different account"
    );

  if (!mechanic || !isMatch || !ismechCLkId) {
    throw new Error(
      "Invalid Personal Number or Password or logged through different account"
    );
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
