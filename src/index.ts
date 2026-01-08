import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import adminRoutes from "./routes/adminRoutes";
import planRoutes from "./routes/planRoutes";
import userRoutes from "./routes/userRoutes";
import connectDB from "./config/db";


dotenv.config();

const app = express();
app.use(express.json());

app.use(cors({ origin: "*" }));

app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/plans", planRoutes);
app.use("/api/admin", adminRoutes)

connectDB();

app.listen(5000,()=>
console.log("server running")
);


