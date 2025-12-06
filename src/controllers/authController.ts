import User from "../models/User";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";




export const register = async(req:Request,res:Response)=>{
    try {
        const {name,email,password} =req.body;

        //check user

        const exists = await User.findOne({email});
        if(exists)
            return res.status(400).json({message:"already have an acount with this email"});

        const hashed = await bcrypt.hash(password, 10);

        const user = new User({name,email,password:hashed,
            role: "user",  //default normal user
        });

        await user.save();

        res.status(201).json({
            message:"user registered succesfully"});

    } catch (error) {
        return res.status(500).json({message:"server error"});
        }
};


export const login = async(req: Request, res: Response) => {
    try{
    const{email, password} =req.body;

    const user = await User.findOne({email});
    if(!user)
        return res.status(400).json({message:"invalid email or password"});

    const match = await bcrypt.compare(password, user.password);
    if (!match)
        return res.status(400).json({message:"invalid email or password"});
    
    const token = jwt.sign({
        id:user._id,
        role:user.role
    },
    process.env.JWT_SECRET!,
    {expiresIn: "1d"}
  );

     res.json({message:"login success",token,user:{id: user._id,
        name: user.name,
        email: user.email,
        role: user.role}
    });

}catch(error){
    return res.status(500).json({message:"server error"});

 }
};
