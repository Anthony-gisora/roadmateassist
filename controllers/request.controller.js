import { submitRequest } from "../services/request.service.js";

export const handleDriverRequest = async (req, res) => {
  const { driverId, requestType, details } = req.body;
  try {
    const result = await submitRequest({ driverId, requestType, details });
    res.status(200).json({
      message: `Request successfully ${result.type}.`,
      data: result.request,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const updated = await Request.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update status" });
  }
};
