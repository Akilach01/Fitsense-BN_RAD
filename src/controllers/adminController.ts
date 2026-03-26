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

export const reviewPlan = async (req: Request, res: Response) => {
    try {
        const { status, feedback, title, description, exercises } = req.body;

        const validStatuses = ["APPROVED", "REJECTED", "NEEDS_UPDATE"];

        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        const plan = await Plan.findById(req.params.id);

        if (!plan) {
            return res.status(404).json({ message: "Plan not found" });
        }

        // ✅ Update status & feedback
        plan.status = status;
        if (feedback !== undefined) plan.feedback = feedback;

        // ✅ Optional edits by admin
        if (title) plan.title = title;
        if (description) plan.description = description;
        if (exercises) plan.exercises = exercises;

        await plan.save();

        res.json({
            message: `Plan ${status} successfully`,
            plan
        });

    } catch (error) {
        console.error("reviewPlan error:", error);
        res.status(500).json({ message: "server error" });
    }
};






