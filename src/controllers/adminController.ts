import { Request, Response } from "express";
import User from "../models/User";
import Plan from "../models/Plan";

export const getAllUsers = async(req: Request, res: Response) =>{
    const users = await User.find();
    res.json(users);
};

export const deleteUser = async(req: Request, res: Response) =>{
    await User.findByIdAndDelete(req.params.id);
    res.json({message:"user has been deleted"});
};

export const getAllPlans = async(req: Request, res: Response) =>{
    const plans = await Plan.find().populate("user","name","email");
    res.json(plans);
};

export const updatePlanStatus = async(req: Request, res: Response) =>{
    
};




