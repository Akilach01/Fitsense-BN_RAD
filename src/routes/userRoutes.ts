import { Router } from "express";
import {updateProfile, getAllUsers}from "../controllers/userController";
import {auth} from "../middleware/authMiddleware";


const router = Router();

router.get("/", auth, getAllUsers);
router.put("/update-profile", auth, updateProfile);

export default router;