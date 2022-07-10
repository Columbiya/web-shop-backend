import { Router } from "express";
import ratingController from "../controllers/ratingController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router()

router.put('/', authMiddleware, ratingController.leaveRating)

export default router