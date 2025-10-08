import Mechanic from "../models/mechanic.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const createToken = (user) => {
  const payload = {
    id: user._id.toString(),
    email: user.email,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  return token;
};

export const login = async (bodyData) => {
  const mechanic = await Mechanic.findOne({
    personalNumber: bodyData.personalNumber,
  });

  if (!mechanic) throw new Error("Invalid Personal Number or Password");

  const isMatch = await bcrypt.compare(bodyData.password, mechanic.password);
  const ismechCLkId = mechanic.clerkUid == bodyData.mechCLkId;

  if (!isMatch && !ismechCLkId)
    throw new Error(
      "Invalid Personal Number or Password or logged through different account"
    );

  if (!mechanic || !isMatch || !ismechCLkId) {
    throw new Error(
      "Invalid Personal Number or Password or logged through different account"
    );
  }

  const token = await createToken(mechanic);
  const { password, ...other } = mechanic._doc;

  console.log("✅ Mechanic authenticated");

  return { ...other, token };
};

export const register = async (
  //   {
  //   name,
  //   personalNumber,
  //   password,
  //   clerkUid,
  //   phone,
  //   location,
  //   distance,
  // }
  bodyData
) => {
  const existing = await Mechanic.findOne(bodyData.personalNumber);
  if (existing) throw new Error("Personal number already in use");

  const mechanic = new Mechanic({
    name: bodyData.name,
    personalNumber: bodyData.personalNumber,
    password: bodyData.password,
    clerkUid: bodyData.clerkUid,
    phone: bodyData.phone,
    location: bodyData.location,
    isOnline: "offline",
    distance: bodyData.distance,
  });
  await mechanic.save();

  const token = await createToken(mechanic);
  const { password, ...other } = mechanic._doc;

  return { ...other, token };
};
