// import paymentModel from "../models/payment.model";

import paymentModel from "../models/payment.model.js";

export const updateComplete = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, servicedBy } = req.body;

    const updated = await paymentModel.findByIdAndUpdate(
      id,
      { status, servicedBy },
      { new: true }
    );

    if (!updated)
      return res.status(404).json({ message: "Paymentmodel not found" });

    res
      .status(200)
      .json({ message: "Paymentmodel updated successfully", updated });
  } catch (err) {
    res.status(500).json({ message: "Server error", err });
  }
};
