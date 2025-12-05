import user from "../models/user";
import { Request, Response } from "express";




export const register = async(req:Request,res:Response)=>{
    try {
        const {name,email,password,role} =req.body;

        const existingUser = await user.findOne({email});
        if(existingUser)
            return res.status(400).json({message:"already have an acount with this email"});

        const hashedPassword = await bcrypt.hash
        
    } catch (error) {
        
    }
}