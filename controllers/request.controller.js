import requestModel from "../models/request.model.js";
import { submitRequest } from "../services/request.service.js";

export const handleDriverRequest = async (req, res) => {
  const { driverId, requestType, details, location } = req.body;
  try {
    const result = await submitRequest({
      driverId,
      requestType,
      details,
      location,
    });
    res.status(200).json({
      message: `Request successfully ${result.type}.`,
      data: result.request,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await requestModel.findByIdAndUpdate(
      id,
      { status: "InProgress" },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Request not found" });

    res.status(200).json(updated);
  } catch (err) {
    console.error("Update error:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateRequestComplete = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await requestModel.findByIdAndUpdate(
      id,
      { status: "completed" },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Request not found" });

    res.status(200).json(updated);
    console.log(updated);
  } catch (err) {
    console.error("Update error:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
