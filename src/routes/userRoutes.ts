import { Router } from "express";
import {updateProfile}from "../controllers/userController";
import {auth} from "../middleware/authMiddleware";


const router = Router();

router.put("/update-profile", auth, updateProfile);

export default router;