import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import requestRoutes from "./routes/request.routes.js";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors);
app.use(express.json());

app.use("api/auth", authRoutes);
app.use("/api/request", requestRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(PORT, async (req, res) => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚗 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to connect to DB:", err.message);
    process.exit(1);
  }
});
