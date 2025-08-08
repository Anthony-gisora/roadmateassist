import MechanicRequest from "../models/mechanicRequest.model.js";

export const getAllRequests = async () => {
  return await MechanicRequest.find().sort({ createdAt: -1 });
};

export const createRequest = async (data) => {
  return await MechanicRequest.create(data);
};

// ✅ New service to fetch mechanics
export const getAllMechanics = async () => {
  return await Mechanic.find().select("name distance");
};
