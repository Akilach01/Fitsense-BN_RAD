import { Router } from "express";
import {updateProfile, getAllUsers, askAI}from "../controllers/userController";
import {auth} from "../middleware/authMiddleware";


const router = Router();

router.get("/", auth, getAllUsers);
router.put("/update-profile", auth, updateProfile);
router.post("/ask-ai", auth, askAI);

export default router;