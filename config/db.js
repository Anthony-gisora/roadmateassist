import mongoose from "mongoose";

export const connectDB = async () => {
  const db = process.env.MONGODB_URI;
  const dbStr = db.toString();
  try {
    await mongoose.connect(dbStr);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ DB connection error:", err.message);
    process.exit(1);
  }
};
