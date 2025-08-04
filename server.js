import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import requestRoutes from "./routes/request.routes.js";
import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

// CORS configuration
app.use(
  cors({
    origin: [
      "https://localhost:5173", // Local development frontend
      "https://roadmateassist.onrender.com", // Production frontend
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Allow credentials (cookies, headers)
  })
);

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/request", requestRoutes);
app.use("/api/admin", adminRoutes);

// Start the server
app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log(`Server running on port ${PORT}`);
  } catch (error) {
    console.error("❌ Failed to connect to DB:", error.message);
    process.exit(1);
  }
});
