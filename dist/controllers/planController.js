"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyplans = exports.createPlan = void 0;
const Plan_1 = __importDefault(require("../models/Plan"));
const createPlan = async (req, res) => {
    try {
        const { title, description, exercises } = req.body;
        const plan = new Plan_1.default({ user: req.user.id, title, description, exercises });
        await plan.save();
        res.status(201).json({ message: "created plan,pending approvel" });
    }
    catch {
        res.status(500).json({ message: "server error occured" });
    }
};
exports.createPlan = createPlan;
const getMyplans = async (req, res) => {
    try {
        const plans = await Plan_1.default.find({ user: req.user.id });
        res.json({ plans });
    }
    catch (error) {
        res.status(500).json({ message: "server error" });
    }
};
exports.getMyplans = getMyplans;
