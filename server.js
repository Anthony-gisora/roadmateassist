import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import requestRoutes from "./routes/request.routes.js";
import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";

dotenv.config();

const PORT = 5000;

const app = express();

app.use(
  cors({
    origin: [
      "https://localhost:5173",
      "https://roadmateassist.onrender.com/api/auth/login",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    // credentials: true,
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/request", requestRoutes);
app.use("/api/admin", adminRoutes);

app.listen(PORT, async (req, res) => {
  try {
    await connectDB();
    console.log(`server running on port ${PORT}`);
  } catch (error) {
    console.error("❌ Failed to connect to DB:", err.message);
    process.exit(1);
  }
});
