import { Request, Response } from "express";
import User from "../models/User";
import {AuthRequest} from "../middleware/authMiddleware";
import bcrypt from "bcryptjs";

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