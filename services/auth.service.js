// services/auth.service.js
import Mechanic from "../models/mechanic.model.js";
import bcrypt from "bcrypt";

export const login = async (personalNumber, password) => {
  const mechanic = await Mechanic.findOne({ personalNumber });
  // if (!mechanic) throw new Error("Mechanic not found");

  const isMatch = await bcrypt.compare(password, mechanic.password);
  // if (!isMatch) throw new Error("Invalid password");

  if (!mechanic & !isMatch)
    throw new Error("Invalid Personal Number or Password");

  return mechanic;
};

export const register = async ({ name, personalNumber, password }) => {
  const existing = await Mechanic.findOne({ personalNumber });
  if (existing) throw new Error("Personal number already in use");

  const mechanic = new Mechanic({ name, personalNumber, password });
  await mechanic.save();
  return mechanic;
};
