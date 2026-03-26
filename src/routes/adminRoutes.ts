import { Router } from "express";
import { auth, isAdmin } from "../middleware/authMiddleware";
import { deleteUser, getAllPlans, getAllUsers, reviewPlan } from "../controllers/adminController";



const router = Router();

router.get("/users", auth, isAdmin, getAllUsers);
router.delete("/users/:id", auth, isAdmin, deleteUser);

router.get("/plans", auth, isAdmin, getAllPlans);
router.put("/plans/:id", auth, isAdmin, reviewPlan);

export default router;