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
        personalNumber: mechanic.personalNumber,
        clerkUid: mechanic.clerkUid,
      },
    });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};
