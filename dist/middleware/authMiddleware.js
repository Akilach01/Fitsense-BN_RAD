"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token)
        return res.status(401).json({ message: "No token has provided" });
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || process.env.jwt_secret);
        req.user = decoded;
        next();
    }
    catch {
        return res.status(401).json({ message: "invalid token" });
    }
};
exports.auth = auth;
const isAdmin = (req, res, next) => {
    const user = req.user;
    if (req.user?.role !== "admin")
        return res.status(403).json({ message: "Admin access required for this" });
    next();
};
exports.isAdmin = isAdmin;
