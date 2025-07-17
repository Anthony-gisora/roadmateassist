import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://gesoranthony:kzSTxlL0rfuORPYa@roadmate.6sayypr.mongodb.net/?retryWrites=true&w=majority&appName=roadmate"
    );
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ DB connection error:", err.message);
    process.exit(1);
  }
};
