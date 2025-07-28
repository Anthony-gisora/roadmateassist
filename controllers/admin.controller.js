import {
  getAllRequests,
  createRequest,
} from "../services/mechanicRequest.service.js";

export const fetchAllRequests = async (req, res) => {
  try {
    const requests = await getAllRequests();
    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch mechanic requests" });
  }
};

export const submitRequest = async (req, res) => {
  try {
    const newRequest = await createRequest(req.body);
    res.status(201).json({ message: "Request submitted", request: newRequest });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
