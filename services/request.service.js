import { connectDB } from "../config/db.js";
import Request from "../models/request.model.js";

export const submitRequest = async ({
  driverId,
  requestType,
  details,
  location,
}) => {
  const existing = await Request.findOne({
    driverId,
    requestType,
    status: "pending",
    servicedBy: "not yet",
  });

  if (existing) {
    existing.details = details;
    existing.updatedAt = Date.now();
    await existing.save();
    return { type: "updated", request: existing };
  }

  const newReq = new Request({
    driverId,
    requestType,
    details,
    location,
    servicedBy,
  });
  await newReq.save();

  return { type: "created", request: newReq };
};
