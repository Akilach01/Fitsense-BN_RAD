import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import adminRoutes from "./routes/adminRoutes";
import planRoutes from "./routes/planRoutes";
import userRoutes from "./routes/userRoutes";


dotenv.config();

const app = express();
app.use(express.json());

app.use(cors({ origin: "*" }));

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/plans", planRoutes);
app.use("/api/admin", adminRoutes);

mongoose
.connect(process.env.MONGO_URI!)
.then(()=>console.log("DB connected"))
.catch((err)=>console.log("DB error:",err));

app.listen(process.env.PORT || 5000,()=>
console.log("server running")
);


