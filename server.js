import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { createServer } from "http";
import { Server } from "socket.io";
import { connectDB } from "./config/db.js";
import requestRoutes from "./routes/request.routes.js";
import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();
const httpServer = createServer(app);

// Initialize Socket.IO
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:5173", "https://roadmateassist.netlify.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});

// Middleware
app.use(
  cors({
    origin: ["http://localhost:5173", "https://roadmateassist.netlify.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/req", requestRoutes);
app.use("/api/admin", adminRoutes);

// Socket.IO event handlers
io.on("connection", (socket) => {
  console.log("🟢 Mechanic connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("🔴 Mechanic disconnected:", socket.id);
  });
});

// MongoDB change stream to watch request changes
const watchRequestChanges = async () => {
  const collection = mongoose.connection.collection("requests");
  const changeStream = collection.watch();

  changeStream.on("change", async (change) => {
    if (["insert", "update", "replace"].includes(change.operationType)) {
      const docId = change.documentKey._id;
      const requestData = await collection.findOne({ _id: docId });

      if (requestData && requestData.requestType && requestData.details) {
        io.emit("new-request", {
          message: "New request created or updated",
          requestType: requestData.requestType,
          details: requestData.details,
          id: requestData._id,
        });
      }
    }
  });
};

// Start server
httpServer.listen(PORT, async () => {
  try {
    await connectDB();
    await watchRequestChanges();
    console.log(`🚀 Server running on port ${PORT}`);
  } catch (error) {
    console.error("❌ Failed to connect to DB:", error.message);
    process.exit(1);
  }
});
