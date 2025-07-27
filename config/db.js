import mongoose from "mongoose";

export const connectDB = async () => {
  const dbUri = process.env.MONGODB_URI;
  try {
    await mongoose.connect(dbUri);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ DB connection error:", err.message);
    process.exit(1);
  }
};
