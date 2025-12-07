import { Response } from "express";
import Plan from "../models/Plan";
import { AuthRequest } from "../middleware/authMiddleware";


export const createPlan = async(req: AuthRequest, res: Response)=>{
  try {
    const{title,description,exercises} = req.body;

    const plan = new Plan({user:req.user.id,title,description,exercises});

    await plan.save();
    res.status(201).json({message:"created plan,pending approvel"})
    
  } catch {
    res.status(500).json({message:"server error occured"});
    
  }
};

export const getMyplans = async(req:AuthRequest,res:Response)=>{
    const plans = await Plan.find({user:req.user.id});
    res.json(plans);
};