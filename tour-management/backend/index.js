import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import tourRoute from "./routes/tours.js";
import userRoute from "./routes/users.js";
import authRoute from "./routes/auth.js";
import reviewRoute from "./routes/reviews.js";
import bookingRoute from "./routes/bookings.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

const allowedOrigins = (
  process.env.CLIENT_URL || "http://localhost:3000,http://127.0.0.1:3000"
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const corsOptions = {
  origin(origin, callback) {
    // Allow non-browser tools (Postman, server-to-server) and listed frontends
    if (!origin || allowedOrigins.includes(origin) || allowedOrigins.includes("*")) {
      callback(null, true);
      return;
    }
    callback(null, false);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Cached Mongo connection for local + Vercel serverless
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

mongoose.set("strictQuery", false);

async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not set");
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 30000,
      connectTimeoutMS: 30000,
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
});

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Travel World API is running",
  });
});

app.get("/api/v1/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "ok",
  });
});

app.use("/api/v1/tours", tourRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/review", reviewRoute);
app.use("/api/v1/booking", bookingRoute);

// Local / traditional hosting
if (process.env.VERCEL !== "1") {
  app.listen(port, () => {
    console.log("server listening on port", port);
  });
}

// Vercel serverless entry
export default app;
