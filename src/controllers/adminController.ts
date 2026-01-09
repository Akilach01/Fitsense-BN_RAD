import { Request, Response } from "express";
import User from "../models/User";
import Plan from "../models/Plan";

export const getAllUsers = async(req: Request, res: Response) =>{
    try {
        const users = await User.find().select("-password");
        res.json({users});
    } catch (error) {
        res.status(500).json({message:"server error"});
    }
};

export const deleteUser = async(req: Request, res: Response) =>{
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({message:"user has been deleted"});
    } catch (error) {
        res.status(500).json({message:"server error"});
    }
};

export const getAllPlans = async(req: Request, res: Response) =>{
    try {
        const plans = await Plan.find().populate("user","-password").lean();
        console.log("Plans retrieved:", plans);
        res.json({plans});
    } catch (error) {
        console.error("getAllPlans error:", error);
        res.status(500).json({message:"server error", error: error instanceof Error ? error.message : "Unknown error"});
    }
};

export const updatePlanStatus = async(req: Request, res: Response) =>{
    try {
        const { status } = req.body; // "APPROVED" | "REJECTED"

        if (!["APPROVED", "REJECTED"].includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        await Plan.findByIdAndUpdate(req.params.id, { status });

        res.json({ message: `Plan ${status}` }); 
    } catch (error) {
        res.status(500).json({message:"server error"});
    }
};





