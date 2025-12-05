import { Request, Response } from "express"
import {User} from "../models/User"
import {AuthRequest} from "../middleware/authMiddleware"
import bcrypt from "bcryptjs"

export const updateProfile = async(req: AuthRequest, res: Response)=>{
    try {
        const userId =req.user.sub
        const{firstname,lastname,email,password} = req.body

        const updates:any = {}

        if(firstname)updates.firstname = firstname
        if(lastname)updates.lastname = lastname
        if(email)updates.email = email


    if(password){
        const hashedPassword = await bcrypt.hash(password,10)
        updates.password = hashedPassword
    }

    const updateUser = await User.findByIdAndUpdate(userId,updates,{new:true,}).select("-password")

    res.status(200).json({
        message:"updated profile successfuly",
        data:updateUser,
    })
    } catch (err:any) {
        res.status(500).json({message:err.message})
        
    }
}