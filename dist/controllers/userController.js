"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.askAI = exports.updateProfile = exports.getAllUsers = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const openai_1 = __importDefault(require("openai"));
const getAllUsers = async (req, res) => {
    try {
        const users = await User_1.default.find().select("-password");
        res.json({ users });
    }
    catch {
        res.status(500).json({ message: "server error" });
    }
};
exports.getAllUsers = getAllUsers;
const updateProfile = async (req, res) => {
    try {
        const { name, password } = req.body;
        const updateData = { name };
        if (password) {
            updateData.Password = await bcryptjs_1.default.hash(password, 10);
        }
        await User_1.default.findByIdAndUpdate(req.user.id, updateData);
        res.json({
            message: "updated profile successfuly"
        });
    }
    catch {
        res.status(500).json({ message: "server error" });
    }
};
exports.updateProfile = updateProfile;
const askAI = async (req, res) => {
    try {
        const { question } = req.body;
        if (!question) {
            return res.status(400).json({ message: "Question is required" });
        }
        const openai = new openai_1.default({
            apiKey: process.env.OPENAI_API_KEY,
        });
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "You are a helpful fitness assistant. Provide accurate, safe fitness advice. Always recommend consulting professionals for medical conditions."
                },
                {
                    role: "user",
                    content: question
                }
            ],
            max_tokens: 500,
        });
        const answer = response.choices[0]?.message?.content || "Sorry, I couldn't generate a response.";
        res.json({ answer });
    }
    catch (error) {
        console.error("AI query error:", error);
        res.status(500).json({ message: "Error processing AI request" });
    }
};
exports.askAI = askAI;
