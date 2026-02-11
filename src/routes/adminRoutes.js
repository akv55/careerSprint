import express from "express";
import { stats, candidates, candidateDetail } from "../controllers/adminController.js";
import { authenticate, authorizeRole } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protected admin routes
router.get("/stats", authenticate, authorizeRole("admin"), stats);
router.get("/candidates", authenticate, authorizeRole("admin"), candidates);
router.get("/candidates/:id", authenticate, authorizeRole("admin"), candidateDetail);

export default router;
