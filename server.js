import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { createServer } from "http";
import { Server } from "socket.io";
import { connectDB } from "./config/db.js";
import { swaggerUi, swaggerSpec } from "./swagger.js";

import requestRoutes from "./routes/request.routes.js";
import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import notificationRoutes from "./routes/notification.routes.js";
import stkpush from "./routes/stkRoutes.routes.js";
import conversationControler from "./controllers/conversationController.js";
import mechanicModel from "./models/mechanic.model.js";
import messageController from "./controllers/messageController.controller.js";

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();
const httpServer = createServer(app);

export const io = new Server(httpServer, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://roadmateassist.netlify.app",
      "http://localhost:8081",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://roadmateassist.netlify.app",
      "http://localhost:8081",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/auth", authRoutes);
app.use("/api/req", requestRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/stk", stkpush);
app.use("/conversation", conversationControler);
app.use("/message", messageController);

// Socket.IO live updates
io.on("connection", (socket) => {
  // When mechanic logs in or connects, client should send their _id
  socket.on("registerMechanic", (mechanicId) => {
    socket.mechanicId = mechanicId;

    console.log(`Mechanic ${mechanicId} registered with socket ${socket.id}`);
  });
  console.log("🟢 A user connected:", socket.id);

  socket.on("disconnect", async () => {
    if (socket.mechanicId) {
      try {
        await mechanicModel.findByIdAndUpdate(
          socket.mechanicId,
          { isOnline: "offline" },
          { new: true }
        );
        console.log(`Mechanic ${socket.mechanicId} is now offline`);
      } catch (err) {
        console.error("Error updating mechanic on disconnect:", err);
      }
    }
    console.log("🔴 A user disconnected:", socket.id);
  });
});

// MongoDB change stream
const watchRequestChanges = async () => {
  const collection = mongoose.connection.collection("requests");
  const changeStream = collection.watch();

  changeStream.on("change", async (change) => {
    if (["insert", "update", "replace"].includes(change.operationType)) {
      const docId = change.documentKey._id;
      const requestData = await collection.findOne({ _id: docId });

      if (requestData?.requestType && requestData?.details) {
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
