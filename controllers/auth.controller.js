import mechanicModel from "../models/mechanic.model.js";
import { login, register } from "../services/auth.service.js";
import { clerkClient } from "@clerk/clerk-sdk-node";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";

let resetCodes = {};

export const registerMechanic = async (req, res) => {
  const {
    name,
    personalNumber,
    password,
    clerkUid,
    location,
    distance,
    phone,
  } = req.body;

  try {
    const newMechanic = await register({
      name,
      personalNumber,
      password,
      clerkUid,
      phone,
      location: {
        lat: location?.lat,
        lng: location?.lng,
      },
      distance,
    });

    res.status(201).json({
      message: "Registration successful",
      mechanic: {
        id: newMechanic._id,
        name: newMechanic.name,
        personalNumber: newMechanic.personalNumber,
        isOnline: newMechanic.isOnline,
        clerkUid: newMechanic.clerkUid,
        location: newMechanic.location,
        distance: newMechanic.distance,
      },
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const loginMechanic = async (req, res) => {
  const { personalNumber, password, mechCLkId } = req.body;
  try {
    const mechanic = await login(personalNumber, password, mechCLkId);
    res.status(200).json({
      message: "Login successful",
      mechanic: {
        id: mechanic._id,
        name: mechanic.name,
        isOnline: mechanic.isOnline,
        personalNumber: mechanic.personalNumber,
        clerkUid: mechanic.clerkUid,
      },
    });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

export const handleOnOff = async (req, res) => {
  try {
    const { id } = req.params;
    const { online } = req.body;

    const updated = await mechanicModel.findByIdAndUpdate(
      id,
      { isOnline: online },
      { new: true }
    );

    if (!updated)
      return res.status(404).json({ message: "Mechanic not found" });

    res.status(200).json(updated);
    res.status(200).json({ id, online });
    console.log(`${id} and ${online}`);
  } catch (err) {
    console.error("Update error:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const forgotPassword = async (req, res) => {
  const { identifier } = req.body;

  try {
    // Find the mechanic by personal number
    const mechanic = await mechanicModel.findOne({
      personalNumber: identifier,
    });
    if (!mechanic)
      return res.status(404).json({ message: "Mechanic not found" });

    // Fetch Clerk user using the stored Clerk ID
    const clerkUser = await clerkClient.users.getUser(mechanic.clerkUid);

    // Extract email from Clerk data
    const email = clerkUser.emailAddresses[0]?.emailAddress;

    const code = Math.floor(100000 + Math.random() * 900000).toString(); // 6 digit
    resetCodes[email] = code;

    // send email (adjust transporter for your credentials)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    await transporter.sendMail({
      from: `"RoadMate Assist" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Password Reset Code",
      text: `Your password reset code is: ${code}`,
    });

    return res.json({
      message: "Reset code sent successfully",
      email: mechanic.email,
    });
  } catch (err) {
    res.status(500).json({ message: "Error sending reset code" });
  }
};

export const verifyCode = async (req, res) => {
  try {
    const { code, personalNumber } = req.body;

    // Find the mechanic by personal number
    const mechanic = await mechanicModel.findOne({
      personalNumber: personalNumber,
    });

    if (!mechanic)
      return res.status(404).json({ message: "Mechanic not found" });

    // Fetch Clerk user using the stored Clerk ID
    const clerkUser = await clerkClient.users.getUser(mechanic.clerkUid);

    // Extract email from Clerk data
    const email = clerkUser.emailAddresses[0]?.emailAddress;

    if (!resetCodes[email])
      return res.status(400).json({ message: "No reset request found" });

    if (resetCodes[email] !== code)
      return res.status(400).json({ message: "Invalid or expired code" });

    // Optional: mark verified
    resetCodes[email] = "VERIFIED";

    return res.json({ message: "Code verified successfully" });
  } catch (err) {}
};

export const resetPass = async (req, res) => {
  const { personalNumber, newPassword } = req.body;

  console.log(newPassword);

  try {
    // Find the mechanic by personal number
    const mechanicEmail = await mechanicModel.findOne({
      personalNumber: personalNumber,
    });

    if (!mechanicEmail)
      return res.status(404).json({ message: "Mechanic not found" });

    // Fetch Clerk user using the stored Clerk ID
    const clerkUser = await clerkClient.users.getUser(mechanicEmail.clerkUid);

    // Extract email from Clerk data
    const email = clerkUser.emailAddresses[0]?.emailAddress;

    if (!resetCodes[email] || resetCodes[email] !== "VERIFIED") {
      return res.status(400).json({ message: "Code not verified or expired" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const mechanic = await mechanicModel.findOneAndUpdate(
      { personalNumber: personalNumber },
      {
        password: hashedPassword,
      },
      { new: true }
    );
    if (!mechanic)
      return res.status(404).json({ message: "Mechanic not updated" });

    delete resetCodes[email]; // clear after success

    return res.json({ message: "Password reset successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error resetting password" });
    console.log(err);
  }
};
