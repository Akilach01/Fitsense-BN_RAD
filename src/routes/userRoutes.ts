import { Router } from "express";
import {updateProfile}from "../controllers/userController"
import {authenticate} from "../middleware/authMiddleware"


const router = Router()

router.put("/update", authenticate, updateProfile)

export default router