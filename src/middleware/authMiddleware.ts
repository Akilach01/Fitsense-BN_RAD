import { Request, Response,NextFunction } from "express";
import jwt from "jsonwebtoken";


export const auth =(req:Request, res:Response, next:NextFunction)=>{
  const token = req.headers.authorization?.split("")[1];

  if (!token)return res.status(401).json({message:"No token has provided"});
   
      try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET!);
        (req as any).user = decoded;
        next();
        
      } catch (error) {
        return res.status(401).json({message:"invalid token"});
        
      }
    };

    export const isAdmin = (req:Request, res:Response, next:NextFunction)=>{
        const user =(req as any).user;

        if (user?.role != "admin")
            return res.status(403).json({message:"Admin access required for this"}); 
           
        next();
        };
    
      
    
