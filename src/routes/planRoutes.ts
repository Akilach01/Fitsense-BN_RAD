import { Router } from "express";
import { auth } from "../middleware/authMiddleware";
import { createPlan, getMyplans } from "../controllers/planController";


const router = Router();

router.post("/", auth, createPlan);
router.get("/me",auth,getMyplans);

export default router;