"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.login = exports.register = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        //check user
        const exists = await User_1.default.findOne({ email });
        if (exists)
            return res.status(400).json({ message: "already have an acount with this email" });
        const hashed = await bcryptjs_1.default.hash(password, 10);
        const user = new User_1.default({ name, email, password: hashed,
            role: "user", //default normal user
        });
        await user.save();
        res.status(201).json({
            message: "user registered succesfully"
        });
    }
    catch (error) {
        return res.status(500).json({ message: "server error" });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User_1.default.findOne({ email });
        if (!user)
            return res.status(400).json({ message: "invalid email or password" });
        console.log("login attempt for:", email);
        console.log("stored password hash length:", user.password?.length);
        const match = await bcryptjs_1.default.compare(password, user.password);
        console.log("password match:", match);
        if (!match)
            return res.status(400).json({ message: "invalid email or password" });
        const token = jsonwebtoken_1.default.sign({
            id: user._id,
            role: user.role
        }, process.env.JWT_SECRET || process.env.jwt_secret, { expiresIn: "1d" });
        res.json({ message: "login success", token, user: { id: user._id,
                name: user.name,
                email: user.email,
                role: user.role }
        });
    }
    catch (error) {
        return res.status(500).json({ message: "server error" });
    }
};
exports.login = login;
const getMe = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId)
            return res.status(401).json({ message: "No token provided" });
        const user = await User_1.default.findById(userId);
        if (!user)
            return res.status(404).json({ message: "User not found" });
        res.json({
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    }
    catch (error) {
        return res.status(500).json({ message: "server error" });
    }
};
exports.getMe = getMe;
