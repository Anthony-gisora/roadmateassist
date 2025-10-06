import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  receipt: {
    type: String,
  },
  status: {
    type: String,
    enum: ["pending", "completed", "failed"],
    default: "pending",
  },
  transactionDate: {
    type: Date,
    default: Date.now,
  },
});

const paymentModel = mongoose.model("Payment", paymentSchema);
export default paymentModel;
