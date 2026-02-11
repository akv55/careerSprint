import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import { pool } from "./config/db.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

import http from "http";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import { authenticate } from "./middleware/authMiddleware.js";

// create http server for socket.io
const server = http.createServer(app);

// socket.io setup
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_ORIGIN || "http://localhost:5174",
    methods: ["GET", "POST"],
  },
});

// namespace for risk monitoring
const riskNs = io.of("/risk");

// middleware to verify JWT on socket connection and enforce admin role
riskNs.use((socket, next) => {
  const token = socket.handshake.auth && socket.handshake.auth.token;
  if (!token) return next(new Error("Unauthorized: no token"));

  jwt.verify(token, process.env.JWT_SECRET || "changeme", (err, decoded) => {
    if (err) return next(new Error("Unauthorized: invalid token"));
    // attach decoded user to socket for handlers
    socket.data.user = decoded;
    // optional: enforce admin role for risk namespace
    if (decoded.role && decoded.role !== "admin") {
      return next(new Error("Forbidden: admin role required"));
    }
    return next();
  });
});

riskNs.on("connection", (socket) => {
  console.log("Risk monitor connected", socket.id, "user=", socket.data.user?.email || socket.data.user?.id || "unknown");

  // For demo, emit random risk updates every 7s
  const interval = setInterval(() => {
    const event = {
      candidateId: `cid-${Math.floor(Math.random() * 1000)}`,
      risk: ["Low", "Medium", "High"][Math.floor(Math.random() * 3)],
      timestamp: new Date().toISOString(),
    };
    socket.emit("risk:update", event);
  }, 7000);

  socket.on("disconnect", () => {
    clearInterval(interval);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, async () => {
  try {
    await pool.connect();
    console.log("Connected to Postgres");
  } catch (e) {
    console.error("Postgres connection error", e);
  }
  console.log(`Server & socket running on port ${PORT}`);
});
