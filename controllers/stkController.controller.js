import axios from "axios";
import dotenv from "dotenv";
import paymentModel from "../models/payment.model.js";
dotenv.config();

const { CONSUMER_KEY, CONSUMER_SECRET, SHORTCODE, PASSKEY, CALLBACK_URL } =
  process.env;

// Generate Access Token
const getAccessToken = async () => {
  const auth = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString(
    "base64"
  );
  const res = await axios.get(
    "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
    { headers: { Authorization: `Basic ${auth}` } }
  );
  return res.data.access_token;
};

// Initiate STK Push
export const stkPush = async (req, res) => {
  try {
    const { phone, amount, requestId } = req.body;
    const token = await getAccessToken();

    const timestamp = new Date()
      .toISOString()
      .replace(/[-T:.Z]/g, "")
      .slice(0, 14);
    const password = Buffer.from(`${SHORTCODE}${PASSKEY}${timestamp}`).toString(
      "base64"
    );

    const stkReq = {
      BusinessShortCode: SHORTCODE,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: amount,
      PartyA: phone,
      PartyB: SHORTCODE,
      PhoneNumber: phone,
      CallBackURL: CALLBACK_URL,
      AccountReference: "RoadMateAssist",
      TransactionDesc: `Payment for request ${requestId}`,
    };

    const { data } = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      stkReq,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    res.status(200).json(data);
  } catch (error) {
    console.error("STK Push Error:", error.response?.data || error.message);
    res.status(500).json({ error: "STK push failed" });
  }
};

// Safaricom Callback
export const stkCallback = async (req, res) => {
  try {
    const callbackData = req.body;

    console.log("Callback Received:", callbackData);

    const result = callbackData?.Body?.stkCallback?.ResultCode;
    const amount =
      callbackData?.Body?.stkCallback?.CallbackMetadata?.Item?.find(
        (i) => i.Name === "Amount"
      )?.Value;
    const phone = callbackData?.Body?.stkCallback?.CallbackMetadata?.Item?.find(
      (i) => i.Name === "PhoneNumber"
    )?.Value;

    if (result === 0) {
      // Create a new payment record
      const payment = new paymentModel({
        phone,
        amount,
        receipt,
        status: "completed",
        transactionDate: new Date(),
      });

      await payment.save();
      console.log("Payment confirmed and request updated.");
    }

    res.status(200).json({ message: "Callback processed successfully" });
  } catch (err) {
    console.error("Callback Error:", err);
    res.status(500).json({ error: "Callback processing failed" });
  }
};
