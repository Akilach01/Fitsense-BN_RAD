import { Request, Response } from "express";
import User from "../models/User";
import {AuthRequest} from "../middleware/authMiddleware";
import bcrypt from "bcryptjs";
import OpenAI from "openai";

export const getAllUsers = async(req: AuthRequest, res: Response) =>{
    try {
        const users = await User.find().select("-password");
        res.json({users});
    } catch {
        res.status(500).json({message:"server error"});
    }
};

export const updateProfile = async(req: AuthRequest, res: Response)=>{
    try {
        const{name,password} = req.body;

        const updateData: any = {name};

    if(password){
        updateData.Password = await bcrypt.hash(password,10);
    }

     await User.findByIdAndUpdate(req.user.id, updateData);

    res.json({
        message:"updated profile successfuly"});
    } catch {
        res.status(500).json({message:"server error"});
        
    }
};

export const askAI = async (req: AuthRequest, res: Response) => {
    try {
        const { question } = req.body;

        if (!question) {
            return res.status(400).json({ message: "Question is required" });
        }

        const openai = new OpenAI({
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
    } catch (error) {
        console.error("AI query error:", error);
        res.status(500).json({ message: "Error processing AI request" });
    }
};