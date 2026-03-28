"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middleware/authMiddleware");
const planController_1 = require("../controllers/planController");
const router = (0, express_1.Router)();
router.post("/", authMiddleware_1.auth, planController_1.createPlan);
router.get("/me", authMiddleware_1.auth, planController_1.getMyplans);
exports.default = router;
