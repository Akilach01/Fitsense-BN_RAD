import user from "../models/user";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";




export const register = async(req:Request,res:Response)=>{
    try {
        const {name,email,password,role} =req.body;

        //check user

        const existingUser = await User.findOne({email});
        if(existingUser)
            return res.status(400).json({message:"already have an acount with this email"});

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({name,email,password:hashedPassword,
            role:role || "user",  //default normal user
        });

        return res.status(200).json({
            message:"user registered succesfully",
            user:{id:user._id, name:user.name, email:user.email,role:user.role }
        });

    } catch (error) {
        return res.status(500).json({message:"server error", error});
        }
};


export const login = async(req: Request, res: Response) => {
    try{
    const{email, password} =req.body;

    const user = await User.findOne({email});
    if(!user)
        return res.status(400).json({message:"invalid email or password"});

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
        return res.status(400).json({message:"invalid email or password"});
    
    const token = jwt.sign({
        id:user._id,
        role:user.role
    },
    process.env.JWT_SECRET!,
    {expiresIn: "7d"}
  );

    return res.status(200).json({message:"login success",token,user:{id: user._id,
        name: user.name,
        email: user.email,
        role: user.role}
    });

}catch(error){
    return res.status(500).json({message:"server error", error});

 }
};
