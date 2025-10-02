import mechanicModel from "../models/mechanic.model.js";
import { login, register } from "../services/auth.service.js";

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
        isOnline: mechanic.isOnline
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
