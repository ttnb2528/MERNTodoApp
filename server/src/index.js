import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import apiRoute, { apiProtected } from "./routes/api.js";
import { DB_CONNECT } from "./utils/constants.js";
import AuthMiddleware from "./middlewares/AuthMiddleware.js";

const app = express();

const connectDB = async () => {
  try {
    await mongoose.connect(DB_CONNECT);
    console.log("MongoDB connected successfully");
  } catch (e) {
    console.error("MongoDB connection error:", e);
    process.exit(1); // stop application if connection error
  }
};

// Connect to MongoDB
connectDB();

const PORT = 8000;

app.use(cors());
app.use(express.json());
app.use("/api/", apiRoute);
app.use("/api/", AuthMiddleware, apiProtected);

app.listen(PORT, () => console.log("server listening on port " + PORT));
