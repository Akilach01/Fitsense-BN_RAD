"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewPlan = exports.getAllPlans = exports.deleteUser = exports.getAllUsers = void 0;
const User_1 = __importDefault(require("../models/User"));
const Plan_1 = __importDefault(require("../models/Plan"));
const getAllUsers = async (req, res) => {
    try {
        const users = await User_1.default.find().select("-password");
        res.json({ users });
    }
    catch (error) {
        res.status(500).json({ message: "server error" });
    }
};
exports.getAllUsers = getAllUsers;
const deleteUser = async (req, res) => {
    try {
        await User_1.default.findByIdAndDelete(req.params.id);
        res.json({ message: "user has been deleted" });
    }
    catch (error) {
        res.status(500).json({ message: "server error" });
    }
};
exports.deleteUser = deleteUser;
const getAllPlans = async (req, res) => {
    try {
        const plans = await Plan_1.default.find().populate("user", "-password").lean();
        console.log("Plans retrieved:", plans);
        res.json({ plans });
    }
    catch (error) {
        console.error("getAllPlans error:", error);
        res.status(500).json({ message: "server error", error: error instanceof Error ? error.message : "Unknown error" });
    }
};
exports.getAllPlans = getAllPlans;
const reviewPlan = async (req, res) => {
    try {
        const { status, feedback, title, description, exercises } = req.body;
        const validStatuses = ["APPROVED", "REJECTED", "NEEDS_UPDATE"];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }
        const plan = await Plan_1.default.findById(req.params.id);
        if (!plan) {
            return res.status(404).json({ message: "Plan not found" });
        }
        // ✅ Update status & feedback
        plan.status = status;
        if (feedback !== undefined)
            plan.feedback = feedback;
        // ✅ Optional edits by admin
        if (title)
            plan.title = title;
        if (description)
            plan.description = description;
        if (exercises)
            plan.exercises = exercises;
        await plan.save();
        res.json({
            message: `Plan ${status} successfully`,
            plan
        });
    }
    catch (error) {
        console.error("reviewPlan error:", error);
        res.status(500).json({ message: "server error" });
    }
};
exports.reviewPlan = reviewPlan;
