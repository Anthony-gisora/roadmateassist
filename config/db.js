import mongoose from "mongoose";

export const connectDB = async () => {
  const db = process.env.MONGODB_URI;
  try {
    await mongoose.connect(db);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ DB connection error:", err.message);
    process.exit(1);
  }
};
